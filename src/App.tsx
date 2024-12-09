import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApiProvider, useCustomer } from './api'
import Config from 'react-native-config'
import InvoiceFetcher from './screens/InvoiceList';
import AddInvoice from './screens/AddInvoice';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const { customer_id } = useCustomer();
  return (
    <ApiProvider url={String(Config.API_URL)} token={String(Config.API_TOKEN)} customer_id={customer_id}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Invoices" component={InvoiceFetcher} options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('AddInvoice', { customer_id })}
                style={{ marginRight: 10 }}
              >
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            )
          })} />
          <Stack.Screen name="AddInvoice" component={AddInvoice} options={{ title: 'Add Invoice' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  )
}
const styles = StyleSheet.create({
  addText: {
    fontSize: 16, 
    color: '#0090ff'
  },
});
export default App
