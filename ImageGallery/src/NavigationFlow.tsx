/**
 * This component is for navigation flow
 * our application entire navigation flow will be defined here
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SafeAreaProvider} from 'react-native-safe-area-context';

//bring home screen
import HomeScreen from './Screen/HomeScreen';

// type for auth stack
export type RootStackParamList = {
  Home: undefined;
};
//create stack navigation
const StackNav = createNativeStackNavigator<RootStackParamList>();

// Authentication stack navigation define here
const StackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Home" component={HomeScreen} />
    </StackNav.Navigator>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
