import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { getPreciseDistance } from 'geolib';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, View } from 'native-base';

import Incident from '../interfaces/Incident';
import Victim from '../interfaces/Victim';
import { colors } from '../constants';
import { getIncident } from '../services/incident';
import { getVictim } from '../services/victim';
import { getUser, updateUserPoints, updateUserstatus } from '../services/user';
import { updateResponderStatus } from '../services/responder';
import { RootState } from '../redux/store';

import Alert from '../components/Alert';
import Confirm from '../components/Confirm';
import Loading from '../components/Loading';

const ResponderScreen: React.FC = () => {
  const { location, responder } = useSelector((state: RootState) => state);

  const [incident, setIncident] = useState<Incident | null>(null);
  const [victim, setVictim] = useState<Victim | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [pointUpdated, setPointUpdated] = useState(false);
  const [showDoneConfirmation, setShowDoneConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (responder?.incidentId) {
      handleGetIncident();
    }

    if (responder?.victimId) {
      const unsubscribe = getVictim(responder.victimId, snap => {
        const victim = { id: snap.id, ...snap.data() } as Victim;
        setVictim(victim);
      });
  
      return () => unsubscribe();
    }
  }, [responder?.incidentId, responder?.victimId]);

  useEffect(() => {
    const peer = incident?.coordinates || victim?.coordinates;

    if (peer) {
      const myCoordinates = { latitude: location.latitude, longitude: location.longitude }
      const peerCoordinates = { latitude: peer.latitude, longitude: peer.longitude }

      const distance = getPreciseDistance(myCoordinates, peerCoordinates);
      setDistance(distance / 1000);
    }
  }, [location, incident, victim]);

  useEffect(() => {
    handleUpdatePoint();
  }, [distance]);

  useEffect(() => {
    if (victim) {
      setShowAlert(victim.status === 'done' ? true : false);
    }
  }, [victim?.id]);

  const handleUpdatePoint = async () => {
    if (!responder || pointUpdated) return;
    if (distance && distance > 0.005) return;

    const user = await getUser(responder.responder.id);

    if (!user) return;

    updateUserPoints(user.id, user.points + 1);
    setPointUpdated(true);
  }

  const handleGetIncident = async () => {
    if (!responder?.incidentId) return;

    const incident = await getIncident(responder.incidentId);
    setIncident(incident);
  }

  const handleDone = async () => {
    setShowDoneConfirmation(false);
    updateUserstatus(responder?.id!, 'standby');
    updateResponderStatus(responder?.id!, 'done');
  }

  const handleCancel = () => {
    setShowCancelConfirmation(false);
    updateUserstatus(responder?.id!, 'standby');
    updateResponderStatus(responder?.id!, 'cancelled');
  }

  if (
    location.accuracy === null ||
    location.accuracy <= 0
  ) return <Loading />

  return (
    <View>
      <Alert
        description='Problem has been resolved. Thank you!'
        isOpen={showAlert}
        onPress={() => updateResponderStatus(responder?.id!, 'done')}
        title='Resolved'
      />

      <Confirm
        description='Are you sure?'
        isOpen={showDoneConfirmation}
        onClose={() => setShowDoneConfirmation(false)}
        onConfirm={handleDone}
        title='Done'
      />

      <Confirm
        description='Are you sure?'
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={handleCancel}
        title='Cancel'
      />

      <View style={styles.buttonsContainer}>
        <Button
          backgroundColor='blue.500'
          marginBottom={3}
          style={styles.button}
          onPress={() => setShowDoneConfirmation(true)}
        >
          DONE
        </Button>

        <Button
          backgroundColor='red.500'
          style={styles.button}
          onPress={() => setShowCancelConfirmation(true)}
        >
          CANCEL
        </Button>
      </View>

      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
        />

        {incident && (
          <Marker
            coordinate={{
              latitude: incident.coordinates.latitude,
              longitude: incident.coordinates.longitude
            }}
            pinColor={colors.primary}
          />
        )}

        {victim && (
          <Marker
            coordinate={{
              latitude: victim.coordinates.latitude,
              longitude: victim.coordinates.longitude
            }}
            pinColor={colors.primary}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
    top: Constants.statusBarHeight + 10,
    zIndex: 10
  },
  map: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  }
});

export default ResponderScreen;