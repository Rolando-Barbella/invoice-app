import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApiProvider, useCustomer } from './api'
import Config from 'react-native-config'
import InvoiceFetcher from './components/InvoiceFetcher';
import AddInvoice from './components/AddInvoice';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();


const App = () => {
  const { client, customer_id } = useCustomer();
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
                <Text>ADD - {customer_id}</Text>
              </TouchableOpacity>
            )
          })} />
          <Stack.Screen name="AddInvoice" component={AddInvoice} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  )
}

export default App
