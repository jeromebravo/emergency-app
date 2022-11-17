import React from 'react';
import * as Notifications from 'expo-notifications';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { requestForegroundPermissionsAsync } from 'expo-location';

import store from './app/redux/store';

import AuthNavigator from './app/navigations/AuthNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

requestForegroundPermissionsAsync();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;