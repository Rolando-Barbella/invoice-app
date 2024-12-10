import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, GestureResponderEvent } from 'react-native';
import { useApi, useCustomer, useFinalizeInvoice, useDeleteInvoice } from '../../api';
import InvoiceCard from './InvoiceCard';
import InvoiceModals from './InvoiceModals';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export interface Invoice {
  id: number;
  customer_id: number | null;
  finalized: boolean;
  paid: boolean;
  date: string | null;
  deadline: string | null;
  total: string | null;
  tax: string | null;
  customer?: {
    first_name: string;
    last_name: string;
  };
}

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const apiClient = useApi();
  const { setCustomerId } = useCustomer();
  const { finalizeInvoice } = useFinalizeInvoice();
  const { deleteInvoice } = useDeleteInvoice();

  const fetchInvoices = useCallback(() => {
    setLoading(true);
    apiClient.getInvoices()
      .then(res => {
        setInvoices(res.data.invoices || []);
        if (res.data.invoices?.[0]?.customer_id) {
          setCustomerId(res.data.invoices[0].customer_id.toString());
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [apiClient, setCustomerId]);

  useFocusEffect(
    useCallback(() => {
      fetchInvoices();
    }, [fetchInvoices])
  );

  const openMenu = (invoice: Invoice, event: GestureResponderEvent) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ 
      top: pageY - 10,
      right: 20,
    });
    setSelectedInvoice(invoice);
    setMenuVisible(true);
  };

  const handleMenuOption = async (action: 'finalize' | 'delete') => {
    if (action === 'finalize') {
      try {
        if (selectedInvoice) {
          await finalizeInvoice(selectedInvoice.id);
          const res = await apiClient.getInvoices();
          setInvoices(res.data.invoices || []);
        }
      } catch (err: any) {
        setError(err.message);
      }
    } else if (action === 'delete') {
      setShowDeleteConfirm(true);
    }
    setMenuVisible(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      await deleteInvoice(selectedInvoice?.id as number);
      const res = await apiClient.getInvoices();
      setInvoices(res.data.invoices || []);
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      setError(err.message);
    }
    setShowDeleteConfirm(false);
    setSelectedInvoice(null);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error || ''}</Text>
      </View>
    );
  }

  if (!invoices.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.messageText}>No invoices available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: invoice }) => (
          <InvoiceCard 
            invoice={invoice}
            onMenuPress={openMenu}
          />
        )}
      />

      <InvoiceModals
        menuVisible={menuVisible}
        showDeleteConfirm={showDeleteConfirm}
        menuPosition={menuPosition}
        selectedInvoice={selectedInvoice}
        onCloseMenu={() => setMenuVisible(false)}
        onMenuOption={handleMenuOption}
        onCloseDeleteConfirm={() => setShowDeleteConfirm(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
  },
  messageText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
});

export default InvoiceList;
