import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useCustomer } from '../api';

const AddInvoice = () => {

  const { customer_id } = useCustomer();

  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateInvoice = async () => {
    if (!date || !deadline || !productLabel || !quantity || !unit || !price || !tax) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);

    const invoiceData = {
      invoice: {
        customer_id: parseInt(customer_id, 10),
        finalized: false,
        paid: true,
        date,
        deadline,
        invoice_lines: [
          {
            product_id: 1, // Static for now, can add a dynamic input later
            quantity: parseInt(quantity, 10),
            label: productLabel,
            unit,
            vat_rate: "0", // Static for now
            price: parseFloat(price),
            tax: parseFloat(tax),
          },
        ],
      },
    };

    try {
      const response = await fetch('https://jean-test-api.herokuapp.com/invoices', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'X-SESSION': '7400dc30-7fe1-47c2-b2c0-7e2e64d4da8e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        console.log('SUCESS!');
      }

      if (!response.ok) {
        throw new Error(`Error creating invoice: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert('Success', 'Invoice created successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Deadline (YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Label"
        value={productLabel}
        onChangeText={setProductLabel}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        style={styles.input}
        placeholder="Unit (e.g., hour)"
        value={unit}
        onChangeText={setUnit}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Tax"
        keyboardType="numeric"
        value={tax}
        onChangeText={setTax}
      />

      <Button
        title={loading ? 'Creating...' : 'Create Invoice'}
        onPress={handleCreateInvoice}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddInvoice;
