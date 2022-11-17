import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Accuracy, watchPositionAsync } from 'expo-location';

import Responder from '../interfaces/Responder';
import Victim from '../interfaces/Victim';
import { updateUserLocation } from '../services/user';
import { setCurrentLocation } from '../redux/actions/location';
import { setCurrentResponder } from '../redux/actions/responder';
import { setCurrentVictim } from '../redux/actions/victim';
import { findVictim, updateVictimLocation } from '../services/victim';
import { findResponder, updateResponderLocation } from '../services/responder';
import { UserRoutes } from '../interfaces/Routes';
import { RootState } from '../redux/store';

import FindNearMeScreen from '../screens/FindNearMeScreen';
import HelpPeopleScreen from '../screens/HelpPeopleScreen';
import IncidentsNearbyScreen from '../screens/IncidentsNearbyScreen';
import Loading from '../components/Loading';
import MapViewScreen from '../screens/MapViewScreen';
import NeedHelpScreen from '../screens/NeedHelpScreen';
import RedeemPointsScreen from '../screens/RedeemPointsScreen';
import ReportIncidentScreen from '../screens/ReportIncidentScreen';
import ResponderScreen from '../screens/ResponderScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import VictimScreen from '../screens/VictimScreen';

const Stack = createStackNavigator<UserRoutes>();

const UserNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);

  const [responder, setResponder] = useState<Responder | null>(null);
  const [victim, setVictim] = useState<Victim | null>(null);
  const [loading, setLoading] = useState({
    responder: true,
    victim: true
  });

  useEffect(() => {
    const responderUnsubscribe = findResponder(currentUser.id, snap => {
      if (snap.size > 0) {
        const responder = {
          id: snap.docs[0].id,
          ...snap.docs[0].data()
        } as Responder;
        setResponder(responder);
        setCurrentResponder(responder, dispatch);
      } else {
        setResponder(null);
        setCurrentResponder(null, dispatch);
      }

      setLoading(prev => ({ ...prev, responder: false }));
    });

    const victimUnsubscribe = findVictim(currentUser.id, snap => {
      if (snap.size > 0) {
        const victim = {
          id: snap.docs[0].id,
          ...snap.docs[0].data()
        } as Victim;
        setVictim(victim);
        setCurrentVictim(victim, dispatch);
      } else {
        setVictim(null);
        setCurrentVictim(null, dispatch);
      }

      setLoading(prev => ({ ...prev, victim: false }));
    });

    return () => {
      responderUnsubscribe();
      victimUnsubscribe();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    watchPositionAsync({ accuracy: Accuracy.BestForNavigation }, location => {
      if (!isMounted) return;

      setCurrentLocation(location.coords, dispatch);
      updateUserLocation(currentUser.id, location.coords);
      if (responder) updateResponderLocation(responder.id, location.coords);
      if (victim) updateVictimLocation(victim.id, location.coords);
    });

    return () => { isMounted = false }
  }, [responder, victim]);

  if (loading.responder || loading.victim) return <Loading />

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!responder && !victim && (
        <Stack.Group>
          <Stack.Screen name='Home' component={UserHomeScreen} />
          <Stack.Screen name='NeedHelp' component={NeedHelpScreen} />
          <Stack.Screen name='HelpPeople' component={HelpPeopleScreen} />
          <Stack.Screen name='ReportIncident' component={ReportIncidentScreen} />
          <Stack.Screen name='IncidentsNearby' component={IncidentsNearbyScreen} />
          <Stack.Screen name='FindNearMe' component={FindNearMeScreen} />
          <Stack.Screen name='MapView' component={MapViewScreen} />
          <Stack.Screen name='RedeemPoints' component={RedeemPointsScreen} />
        </Stack.Group>
      )}

      {responder && (
        <Stack.Screen name='Responder' component={ResponderScreen} />
      )}

      {victim && (
        <Stack.Screen name='Victim' component={VictimScreen} />
      )}
    </Stack.Navigator>
  );
}

export default UserNavigator;