/*
* @jest-environment node
*/
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddInvoice from '../AddInvoice';
import { useCustomer, useCreateInvoice } from '../../api';
import { act } from 'react-test-renderer';

jest.mock('../../api', () => ({
  useCustomer: jest.fn(),
  useCreateInvoice: jest.fn(),
}));

describe('AddInvoice', () => {
  // Setup common mocks
  const mockCreateInvoice = jest.fn();
  const mockCustomerId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useCustomer as jest.Mock).mockReturnValue({ customer_id: mockCustomerId });
    (useCreateInvoice as jest.Mock).mockReturnValue({ createInvoice: mockCreateInvoice });
  });

  it('renders all input fields', () => {
    const { getByPlaceholderText } = render(<AddInvoice />);

    expect(getByPlaceholderText('Date (YYYY-MM-DD)')).toBeTruthy();
    expect(getByPlaceholderText('Deadline (YYYY-MM-DD)')).toBeTruthy();
    expect(getByPlaceholderText('Product Label')).toBeTruthy();
    expect(getByPlaceholderText('Quantity')).toBeTruthy();
    expect(getByPlaceholderText('Unit (e.g., hour)')).toBeTruthy();
    expect(getByPlaceholderText('Price')).toBeTruthy();
    expect(getByPlaceholderText('Tax')).toBeTruthy();
  });

  it('shows validation errors for empty fields', () => {
    const { getByText } = render(<AddInvoice />);
    
    fireEvent.press(getByText('Create Invoice'));

    expect(getByText('Date is required')).toBeTruthy();
    expect(getByText('Deadline is required')).toBeTruthy();
    expect(getByText('Quantity is required')).toBeTruthy();
    expect(getByText('Unit is required')).toBeTruthy();
    expect(getByText('Price is required')).toBeTruthy();
    expect(getByText('Tax is required')).toBeTruthy();
  });

  it('validates date format', () => {
    const { getByText, getByPlaceholderText } = render(<AddInvoice />);
    
    fireEvent.changeText(getByPlaceholderText('Date (YYYY-MM-DD)'), 'invalid-date');
    fireEvent.press(getByText('Create Invoice'));

    expect(getByText('Invalid date format. Use YYYY-MM-DD')).toBeTruthy();
  });

  it('successfully creates an invoice with valid data', async () => {
    const { getByText, getByPlaceholderText, } = render(<AddInvoice />);

    fireEvent.changeText(getByPlaceholderText('Date (YYYY-MM-DD)'), '2024-03-20');
    fireEvent.changeText(getByPlaceholderText('Deadline (YYYY-MM-DD)'), '2024-04-20');
    fireEvent.changeText(getByPlaceholderText('Product Label'), 'Test Product');
    fireEvent.changeText(getByPlaceholderText('Quantity'), '1');
    fireEvent.changeText(getByPlaceholderText('Unit (e.g., hour)'), 'hour');
    fireEvent.changeText(getByPlaceholderText('Price'), '100');
    fireEvent.changeText(getByPlaceholderText('Tax'), '20');

    const btn = getByText('Create Invoice')

    await fireEvent.press(btn);

    await waitFor(() => {
      expect(mockCreateInvoice).toHaveBeenCalledWith({
        invoice: {
          customer_id: 123,
          finalized: false,
          paid: false,
          date: '2024-03-20',
          deadline: '2024-04-20',
          invoice_lines: [
            {
              quantity: 1,
              label: 'Test Product',
              unit: 'hour',
              vat_rate: "0",
              price: 100,
              tax: 20,
            },
          ],
        },
      });
    });
  });

  it('handles API errors', async () => {
    const errorMessage = 'API Error';
    mockCreateInvoice.mockRejectedValueOnce(new Error(errorMessage));

    const { getByText, getByPlaceholderText } = render(<AddInvoice />);

    // Fill in all required fields
    fireEvent.changeText(getByPlaceholderText('Date (YYYY-MM-DD)'), '2024-03-20');
    fireEvent.changeText(getByPlaceholderText('Deadline (YYYY-MM-DD)'), '2024-04-20');
    fireEvent.changeText(getByPlaceholderText('Product Label'), 'Test Product');
    fireEvent.changeText(getByPlaceholderText('Quantity'), '1');
    fireEvent.changeText(getByPlaceholderText('Unit (e.g., hour)'), 'hour');
    fireEvent.changeText(getByPlaceholderText('Price'), '100');
    fireEvent.changeText(getByPlaceholderText('Tax'), '20');

    fireEvent.press(getByText('Create Invoice'));

    await act(() => {
      expect(mockCreateInvoice).toHaveBeenCalled();
    });
  });
}); 