import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../NavigationFlow';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// create props of navigation
//get props of auth root stack
type Props = NativeStackScreenProps<RootStackParamList, 'ImageView'>;

const ImageViewScreen = ({navigation, route}: Props) => {
  if (__DEV__) {
    console.log(route);
  }
  return (
    <View>
      <Text>ImageViewScreen</Text>
    </View>
  );
};

export default ImageViewScreen;

const styles = StyleSheet.create({});
