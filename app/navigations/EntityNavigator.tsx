import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { EntityRoutes } from '../interfaces/Routes';

import CreateSubAccountScreen from '../screens/CreateSubAccountScreen';
import EntityHomeScreen from '../screens/EntityHomeScreen';
import ViewSubAccountsScreen from '../screens/ViewSubAccountsScreen';

const Stack = createStackNavigator<EntityRoutes>();

const EntityNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Home' component={EntityHomeScreen} />
    <Stack.Screen name='CreateSubAccount' component={CreateSubAccountScreen} />
    <Stack.Screen name='ViewSubAccounts' component={ViewSubAccountsScreen} />
  </Stack.Navigator>
);

export default EntityNavigator;