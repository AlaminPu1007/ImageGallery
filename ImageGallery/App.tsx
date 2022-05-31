/**
 * This is the initial page of our application
 * we wrap our whole component with redux
 * to manage data globally
 */
import React from 'react';
import NavigationFlow from './src/NavigationFlow';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationFlow />
    </GestureHandlerRootView>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
