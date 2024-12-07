import { renderHook, act } from '@testing-library/react'
import { ApiProvider, useApi, useCustomer, useFinalizeInvoice, useDeleteInvoice } from './index'
import React from 'react'
import OpenAPIClientAxios from 'openapi-client-axios'

interface Client {
  put: (url: string, data?: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
  getInvoices: () => Promise<any>;
}

// Define mockClient first
const mockClient = {
  put: jest.fn().mockImplementation(),
  delete: jest.fn().mockImplementation(),
  getInvoices: jest.fn().mockImplementation(),
} as unknown as Client & {
  put: jest.MockedFunction<any>;
  delete: jest.MockedFunction<any>;
  getInvoices: jest.MockedFunction<any>;
}

// Mock OpenAPIClientAxios
jest.mock('openapi-client-axios', () => {
  return jest.fn().mockImplementation(() => ({
    initSync: jest.fn().mockReturnValue(mockClient)
  }))
})

// Mock the client module
jest.mock('./generated/client.d.ts', () => ({
  Client: jest.fn().mockImplementation(() => mockClient)
}))

describe('API Hooks', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ApiProvider url="test-url" token="test-token" customer_id="test-customer">
      {children}
    </ApiProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useCustomer', () => {
    it('should return customer_id and setCustomerId', () => {
      const { result } = renderHook(() => useCustomer(), { wrapper })
      
      expect(result.current.customer_id).toBe('test-customer')
      expect(typeof result.current.setCustomerId).toBe('function')
    })
  })

  describe('useFinalizeInvoice', () => {
    it('should finalize invoice successfully', async () => {
      const mockResponse = { data: { id: 1, finalized: true, paid: true } }
      mockClient.put.mockResolvedValueOnce(mockResponse)

      const { result } = renderHook(() => useFinalizeInvoice(), { wrapper })

      await act(async () => {
        const response = await result.current.finalizeInvoice(1)
        expect(response).toEqual(mockResponse.data)
      })
    })

    it('should handle finalize invoice error', async () => {
      mockClient.put.mockRejectedValueOnce(new Error('API Error'))

      const { result } = renderHook(() => useFinalizeInvoice(), { wrapper })

      await act(async () => {
        await expect(result.current.finalizeInvoice(1)).rejects.toThrow('Failed to finalize invoice')
      })
    })
  })

  describe('useDeleteInvoice', () => {
    it('should delete invoice successfully', async () => {
      mockClient.delete.mockResolvedValueOnce({ data: { success: true } });
      
      const { result } = renderHook(() => useDeleteInvoice(), { wrapper })

      await act(async () => {
        await result.current.deleteInvoice(123)
      })

      expect(mockClient.delete).toHaveBeenCalledWith('/invoices/123')
    })

    it('should handle delete invoice error', async () => {
      mockClient.delete.mockRejectedValueOnce(new Error('Delete failed'))

      const { result } = renderHook(() => useDeleteInvoice(), { wrapper })

      await expect(result.current.deleteInvoice(123)).rejects.toThrow('Failed to delete invoice: Error: Delete failed')
    })
  })
}) 