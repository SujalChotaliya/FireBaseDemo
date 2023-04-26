import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import HomeScreen from '../screens/HomeScreen';
import RealTimeDB from '../screens/RealTimeDB';
import Create from '../screens/Create';
import SignUp from '../screens/SignUp';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import SignUpWithGoogle from '../screens/SignInWithGoogle';

const Navigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'SignUpWithGoogle'}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RealTimeDB" component={RealTimeDB} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUpWithGoogle" component={SignUpWithGoogle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
