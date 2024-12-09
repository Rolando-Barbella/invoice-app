import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InvoiceModals from '../InvoiceList/InvoiceModals';

describe('InvoiceModals', () => {
  const defaultProps = {
    menuVisible: false,
    showDeleteConfirm: false,
    menuPosition: { top: 100, right: 50 },
    selectedInvoice: { finalized: false },
    onCloseMenu: jest.fn(),
    onMenuOption: jest.fn(),
    onCloseDeleteConfirm: jest.fn(),
    onConfirmDelete: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render modals when both menuVisible and showDeleteConfirm are false', () => {
    const { queryByText } = render(<InvoiceModals {...defaultProps} />);
    expect(queryByText('Finalize')).toBeNull();
    expect(queryByText('Delete')).toBeNull();
    expect(queryByText('Delete Invoice')).toBeNull();
  });

  it('renders the menu modal when menuVisible is true', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} menuVisible={true} />);
    expect(getByText('Finalize')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('renders the delete confirmation modal when showDeleteConfirm is true', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} showDeleteConfirm={true} />);
    expect(getByText('Delete Invoice')).toBeTruthy();
    expect(getByText('Are you sure you want to delete this invoice?')).toBeTruthy();
  });

  it('disables menu options when the invoice is finalized', () => {
    const { getByText } = render(
      <InvoiceModals {...defaultProps} menuVisible={true} selectedInvoice={{ finalized: true }} />
    );
    const finalizeButton = getByText('Finalize');
    fireEvent.press(finalizeButton);

    expect(defaultProps.onMenuOption).toHaveBeenCalledTimes(0);

    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    expect(defaultProps.onMenuOption).toHaveBeenCalledTimes(0);
  });

  it('calls onMenuOption with "finalize" when Finalize is pressed', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} menuVisible={true} />);
    const finalizeButton = getByText('Finalize');
    fireEvent.press(finalizeButton);

    expect(defaultProps.onMenuOption).toHaveBeenCalledTimes(1);
    expect(defaultProps.onMenuOption).toHaveBeenCalledWith('finalize');
  });

  it('calls onMenuOption with "delete" when Delete is pressed', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} menuVisible={true} />);
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    expect(defaultProps.onMenuOption).toHaveBeenCalledTimes(1);
    expect(defaultProps.onMenuOption).toHaveBeenCalledWith('delete');
  });

  it('calls onCloseMenu when overlay is pressed', () => {
    const { getByTestId } = render(
      <InvoiceModals {...defaultProps} menuVisible={true} />
    );
    const overlay = getByTestId('modalOverlay');
    fireEvent.press(overlay);

    expect(defaultProps.onCloseMenu).toHaveBeenCalledTimes(1);
  });

  it('calls onCloseDeleteConfirm when Cancel is pressed in confirmation modal', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} showDeleteConfirm={true} />);
    const cancelButton = getByText('Cancel');
    fireEvent.press(cancelButton);

    expect(defaultProps.onCloseDeleteConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirmDelete when Delete is pressed in confirmation modal', () => {
    const { getByText } = render(<InvoiceModals {...defaultProps} showDeleteConfirm={true} />);
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    expect(defaultProps.onConfirmDelete).toHaveBeenCalledTimes(1);
  });
});
