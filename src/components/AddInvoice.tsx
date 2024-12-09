import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useCustomer, useCreateInvoice } from '../api';

const AddInvoice = () => {

  const { customer_id } = useCustomer();
  const { createInvoice } = useCreateInvoice();

  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [loading, setLoading] = useState(false);

  const [dateError, setDateError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const [productLabelError, setProductLabelError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [unitError, setUnitError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [taxError, setTaxError] = useState('');

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  const handleDateChange = (value: string) => {
    setDate(value);
    if (dateRegex.test(value)) {
      setDateError('');
    }
  };

  const handleDeadlineChange = (value: string) => {
    setDeadline(value);
    if (dateRegex.test(value)) {
      setDeadlineError('');
    }
  };

  const handleProductLabelChange = (value: string) => {
    setProductLabel(value);
    if (value.trim().length >= 3) {
      setProductLabelError('');
    }
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    if (!isNaN(Number(value)) && Number(value) > 0) {
      setQuantityError('');
    }
  };

  const handleUnitChange = (value: string) => {
    setUnit(value);
    if (value.trim()) {
      setUnitError('');
    }
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setPriceError('');
    }
  };

  const handleTaxChange = (value: string) => {
    setTax(value);
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setTaxError('');
    }
  };

  const validateInputs = () => {
    let isValid = true;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date) {
      setDateError('Date is required');
      isValid = false;
    } else if (!dateRegex.test(date)) {
      setDateError('Invalid date format. Use YYYY-MM-DD');
      isValid = false;
    } else {
      setDateError('');
    }

    if (!deadline) {
      setDeadlineError('Deadline is required');
      isValid = false;
    } else if (!dateRegex.test(deadline)) {
      setDeadlineError('Invalid deadline format. Use YYYY-MM-DD');
      isValid = false;
    } else {
      setDeadlineError('');
    }

    if (!productLabel.trim()) {
      setProductLabelError('Product label is required');
      isValid = false;
    } else if (productLabel.length < 3) {
      setProductLabelError('Product label must be at least 3 characters');
      isValid = false;
    } else {
      setProductLabelError('');
    }

    if (!quantity) {
      setQuantityError('Quantity is required');
      isValid = false;
    } else if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setQuantityError('Quantity must be a positive number');
      isValid = false;
    } else {
      setQuantityError('');
    }

    if (!unit.trim()) {
      setUnitError('Unit is required');
      isValid = false;
    } else {
      setUnitError('');
    }

    if (!price) {
      setPriceError('Price is required');
      isValid = false;
    } else if (isNaN(Number(price)) || Number(price) < 0) {
      setPriceError('Price must be a valid number');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!tax) {
      setTaxError('Tax is required');
      isValid = false;
    } else if (isNaN(Number(tax)) || Number(tax) < 0) {
      setTaxError('Tax must be a valid number');
      isValid = false;
    } else {
      setTaxError('');
    }

    return isValid;
  };

  const handleCreateInvoice = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    const invoiceData = {
      invoice: {
        customer_id: customer_id ? parseInt(customer_id, 10) : 0,
        finalized: false,
        paid: false,
        date,
        deadline,
        invoice_lines: [
          {
            quantity: parseInt(quantity, 10),
            label: productLabel,
            unit,
            vat_rate: "0",
            price: parseFloat(price),
            tax: parseFloat(tax),
          },
        ],
      },
    };

    try {
      await createInvoice(invoiceData);
      setDate('');
      setDeadline('');
      setProductLabel('');
      setQuantity('');
      setUnit('');
      setPrice('');
      setTax('');
      setDateError('');
      setDeadlineError('');
      setProductLabelError('');
      setQuantityError('');
      setUnitError('');
      setPriceError('');
      setTaxError('');
      Alert.alert('Success', 'Invoice created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={[styles.input, dateError ? styles.inputError : null]}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={handleDateChange}
        />
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

        <TextInput
          style={[styles.input, deadlineError ? styles.inputError : null]}
          placeholder="Deadline (YYYY-MM-DD)"
          value={deadline}
          onChangeText={handleDeadlineChange}
        />
        {deadlineError ? <Text style={styles.errorText}>{deadlineError}</Text> : null}

        <TextInput
          style={[styles.input, productLabelError ? styles.inputError : null]}
          placeholder="Product Label"
          value={productLabel}
          onChangeText={handleProductLabelChange}
        />
        {productLabelError ? <Text style={styles.errorText}>{productLabelError}</Text> : null}

        <TextInput
          style={[styles.input, quantityError ? styles.inputError : null]}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={handleQuantityChange}
        />
        {quantityError ? <Text style={styles.errorText}>{quantityError}</Text> : null}

        <TextInput
          style={[styles.input, unitError ? styles.inputError : null]}
          placeholder="Unit (e.g., hour)"
          value={unit}
          onChangeText={handleUnitChange}
        />
        {unitError ? <Text style={styles.errorText}>{unitError}</Text> : null}

        <TextInput
          style={[styles.input, priceError ? styles.inputError : null]}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={handlePriceChange}
        />
        {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}

        <TextInput
          style={[styles.input, taxError ? styles.inputError : null]}
          placeholder="Tax"
          keyboardType="numeric"
          value={tax}
          onChangeText={handleTaxChange}
        />
        {taxError ? <Text style={styles.errorText}>{taxError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading ? styles.buttonDisabled : null]}
          onPress={handleCreateInvoice}
          disabled={loading}
          accessibilityState={{ disabled: loading }}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Invoice'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default AddInvoice;
