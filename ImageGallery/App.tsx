/**
 * This is the initial page of our application
 * we wrap our whole component with redux
 * to manage data globally
 */
import React from 'react';
import NavigationFlow from './src/NavigationFlow';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return <NavigationFlow />;
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
