import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, GestureResponderEvent } from 'react-native';
// ... existing imports ...

interface Invoice {
  id: number;
  customer_id: number;
  // Add other invoice properties as needed
}

const InvoiceFetcher: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  // ... existing code ...

  const openMenu = (invoice: Invoice, event: GestureResponderEvent) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ 
      top: pageY - 10, // Adjust these offsets as needed
      right: 20,
    });
    setSelectedInvoice(invoice);
    setMenuVisible(true);
  };

  // ... existing code ...
};

export default InvoiceFetcher; 