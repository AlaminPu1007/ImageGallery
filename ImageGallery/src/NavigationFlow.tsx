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
// bring image click to full screen view able screen\
import ImageViewScreen from './Screen/ImageViewScreen';

// type for auth stack
export type RootStackParamList = {
  Home: undefined;
  ImageView: undefined;
};
//create stack navigation
const StackNav = createNativeStackNavigator<RootStackParamList>();

// Authentication stack navigation define here
const StackNavigation = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Home" component={HomeScreen} />
      <StackNav.Screen name="ImageView" component={ImageViewScreen} />
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
