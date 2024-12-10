import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import {Invoice} from '../InvoiceList'

interface InvoiceCardProps {
  invoice: Invoice;
  onMenuPress: (invoice: Invoice, event: GestureResponderEvent) => void;
}

const InvoiceCard = ({ invoice, onMenuPress }: InvoiceCardProps) => {
  return (
    <View style={styles.invoiceCard}>
      <View style={styles.invoiceHeader}>
        <Text style={styles.invoiceTitle}>Invoice #{invoice.id}</Text>
        <TouchableOpacity 
          onPress={(event) => onMenuPress(invoice, event)}
          style={styles.menuButton}
        >
          <Text style={styles.menuDots}>⋮</Text>
        </TouchableOpacity>
      </View>
      <Text>Customer: {invoice.customer?.first_name} {invoice.customer?.last_name}</Text>
      <Text>Finalized: {invoice.finalized ? 'Yes' : 'No'}</Text>
      <Text>Paid: {invoice.paid ? 'Yes' : 'No'}</Text>
      <Text>Date: {invoice.date}</Text>
      <Text>Deadline: {invoice.deadline}</Text>
      <Text>Total: ${invoice.total}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuButton: {
    padding: 8,
  },
  menuDots: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default InvoiceCard; 