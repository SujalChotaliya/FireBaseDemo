import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RealTimeDB from '../screens/RealTimeDB';
import Create from '../screens/Create';

const Navigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Create">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RealTimeDB" component={RealTimeDB} />
        <Stack.Screen name="Create" component={Create} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
