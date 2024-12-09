import React, { ReactNode, createContext, useContext, useRef, useState } from 'react'
import OpenAPIClientAxios from 'openapi-client-axios'
import { Client } from './generated/client'
import definition from './generated/schema.json'

interface ApiContextState {
  client: Client | undefined
  customer_id: string | undefined
  setCustomerId: (id: string) => void
}

export const ApiContext = createContext<ApiContextState>({
  client: undefined,
  customer_id: undefined,
  setCustomerId: () => {},
})

interface ApiProviderProps {
  url: string
  token: string
  customer_id: string | undefined
  children?: ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({
  url,
  token,
  customer_id: initialCustomerId,
  children,
}) => {
  const [customer_id, setCustomerId] = useState(initialCustomerId);
  const apiRef = useRef(
    new OpenAPIClientAxios({
      /* @ts-ignore */
      definition,
      withServer: { url },
      axiosConfigDefaults: {
        headers: {
          'X-SESSION': token,
        },
      },
    }),
  )
  const clientRef = useRef(apiRef.current.initSync<Client>())

  return (
    <ApiContext.Provider value={{ 
      client: clientRef.current, 
      customer_id,
      setCustomerId 
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  const { client } = useContext(ApiContext)

  if (!client) {
    throw new Error('A client API must be defined')
  }

  return client
}

export const useCustomer = () => {
  const { customer_id, setCustomerId } = useContext(ApiContext)
  return { customer_id, setCustomerId }
}

export const useFinalizeInvoice = () => {
  const client = useApi()

  const finalizeInvoice = async (invoiceId: number) => {
    try {
      const response = await client.put(`/invoices/${invoiceId}`, {
        invoice: {
          id: invoiceId,
          finalized: true,
          paid: true
        }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to finalize invoice: ${error}`)
    }
  }

  return { finalizeInvoice }
}

export const useDeleteInvoice = () => {
  const client = useApi();

  const deleteInvoice = async (invoiceId: number) => {
    try {
      const response = await client.delete(`/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete invoice: ${error}`);
    }
  };

  return { deleteInvoice };
};

export const useCreateInvoice = () => {
  const client = useApi();

  const createInvoice = async (invoiceData: any) => {
    try {
      const response = await client.post('/invoices', invoiceData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create invoice: ${error}`);
    }
  };

  return { createInvoice };
};
