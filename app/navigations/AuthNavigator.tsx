import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { auth } from '../config/firebase';
import { logout } from '../services/auth';
import { getUser } from '../services/user';
import { getEntity } from '../services/entity';
import { setCurrentUser, clearCurrentUser } from '../redux/actions/user';
import { setCurrentEntity, clearCurrentEntity } from '../redux/actions/entity';
import { AuthRoutes } from '../interfaces/Routes';

import EntityNavigator from './EntityNavigator';
import UserNavigator from './UserNavigator';

import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import Loading from '../components/Loading';
import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WalkthroughScreen from '../screens/WalkthroughScreen';

const Stack = createStackNavigator<AuthRoutes>();

const AuthNavigator: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [authType, setAuthType] = useState<'user' | 'entity' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  auth.onAuthStateChanged(async user => {
    if (user) {
      const currentUser = await getUser(user.uid);

      if (currentUser?.banned) {
        logout();
        clear();
        return;
      }

      if (currentUser && Object.keys(currentUser).length > 1) {
        setAuthType('user');
        setCurrentUser(currentUser, dispatch);
      } else {
        const currentEntity = await getEntity(user.uid);

        if (currentEntity && Object.keys(currentEntity).length > 1) {
          setAuthType('entity');
          setCurrentEntity(currentEntity, dispatch);
        } else {
          setAuthType(null);
        }
      }

      setIsAuthenticated(true);
      
    } else {
      clear();
    }

    setLoading(false);
  });

  const clear = () => {
    clearCurrentUser(dispatch);
    clearCurrentEntity(dispatch);
    setAuthType(null);
    setIsAuthenticated(false);
  }

  if (loading) return <Loading />

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated && (
        <>
          <Stack.Screen name='SignIn' component={SignInScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </>
      )}

      {isAuthenticated && authType === 'user' && (
        <Stack.Screen name='UserRoutes' component={UserNavigator} />
      )}

      {isAuthenticated && authType === 'entity' && (
        <Stack.Screen name='EntityRoutes' component={EntityNavigator} />
      )}

      {isAuthenticated && !authType && (
        <>
          <Stack.Screen name='CompleteProfile' component={CompleteProfileScreen} />
          <Stack.Screen name='Walkthrough' component={WalkthroughScreen} />
          <Stack.Screen name='UserRoutes' component={UserNavigator} />
          <Stack.Screen name='EntityRoutes' component={EntityNavigator} />
        </>
      )}

    </Stack.Navigator>
  );
}

export default AuthNavigator;