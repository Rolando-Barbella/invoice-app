import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InvoiceCard from '../InvoiceFetcher./InvoiceCard';

describe('InvoiceCard', () => {
  const mockInvoice = {
    id: 1,
    customer: {
      first_name: 'John',
      last_name: 'Doe',
    },
    finalized: true,
    paid: false,
    date: '2023-12-01',
    deadline: '2023-12-10',
    total: '123.45',
    customer_id: 2, 
    tax: '0.05'
  };

  const mockOnMenuPress = jest.fn();

  it('calls onMenuPress with correct arguments when menu button is pressed', () => {
    const { getByText } = render(<InvoiceCard invoice={mockInvoice} onMenuPress={mockOnMenuPress} />);

    const menuButton = getByText('⋮');
    fireEvent.press(menuButton);

    expect(mockOnMenuPress).toHaveBeenCalledTimes(1);
    expect(mockOnMenuPress).toHaveBeenCalledWith(mockInvoice, undefined); // Event is undefined in this context
  });
});
