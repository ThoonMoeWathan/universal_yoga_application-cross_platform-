import { View, Text, SafeAreaView, Button, Alert, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import BookingList from "./components/BookingList.js";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CartProvider } from './components/CartContext.js';
import ShowCartList from './components/ShowCartList.js';

const Tab = createMaterialBottomTabNavigator()

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Warning: A props object containing a "key" prop is being spread into JSX',
]);

const App = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        inactiveColor="gray"
        activeColor='purple'
          barStyle={{ backgroundColor: '#d7b0e2' }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: (({ color }) => (<Entypo name="home" size={24} color={color} />))
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: (({ color }) => (<FontAwesome name="search" size={24} color={color} />))
          }}
        />

        <Tab.Screen
          name="ShowCartList"
          component={ShowCartList}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: (({ color }) => (<FontAwesome name="shopping-cart" size={24} color={color} />))
          }}
          />
          
        <Tab.Screen
          name="BookingList"
          component={BookingList}
          options={{
            tabBarLabel: 'Booking',
            tabBarIcon: (({ color }) => (<Entypo name="list" size={24} color={color} />))
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
      </CartProvider >
);
}

export default App;