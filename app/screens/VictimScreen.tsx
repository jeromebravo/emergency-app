import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, Center, FlatList, Text, View } from 'native-base';

import Responder from '../interfaces/Responder';
import { colors } from '../constants';
import { findVictimResponders, updateResponderStatus } from '../services/responder';
import { updateVictimStatus } from '../services/victim';
import { updateUserstatus } from '../services/user';
import { RootState } from '../redux/store';

import Loading from '../components/Loading';
import ResponderItem from '../layouts/ResponderItem';
import Confirm from '../components/Confirm';

const VictimScreen: React.FC = () => {
  const { location, victim } = useSelector((state: RootState) => state);

  const [responders, setResponders] = useState<Responder[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDoneConfirm, setShowDoneConfirm] = useState(false);

  useEffect(() => {
    if (victim) {
      const unsubscribe = findVictimResponders(victim.id, snap => {
        const responders = snap.docs.map(doc => (
          { id: doc.id, ...doc.data() } as Responder
        ));
        setResponders(responders);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [victim?.id]);

  const handleDone = () => {
    setShowDoneConfirm(false);
    updateVictimStatus(victim?.id!);

    if (!responders) return;

    for (const responder of responders) {
      if (responder.status === 'acknowledged') {
        updateResponderStatus(responder.id, 'done');
        updateUserstatus(responder.id, 'standby');
      }
    }
  }

  if (location.accuracy === null || location.accuracy <= 0) return <Loading />
  
  return (
    <View style={styles.container}>
      <Confirm
        description='Are you sure?'
        isOpen={showDoneConfirm}
        onClose={() => setShowDoneConfirm(false)}
        onConfirm={handleDone}
        title='Done'
      />

      <View>
        <Button
          style={styles.button}
          onPress={() => setShowDoneConfirm(true)}
        >
          DONE
        </Button>

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

          {responders?.map(responder => responder.status === 'acknowledged' && (
            <Marker
              key={responder.id}
              coordinate={{
                latitude: responder.coordinates.latitude,
                longitude: responder.coordinates.longitude
              }}
              pinColor={colors.primary}
            />
          ))}
        </MapView>
      </View>
      
      {loading && (
        <Center
          flex={1}
        >
          <Text>Loading...</Text>
        </Center>
      )}

      {!responders?.length && !loading ? (
        <Center
          flex={1}
        >
          <Text>No responders yet</Text>
        </Center>
      ) : (
        <FlatList
          data={responders}
          keyExtractor={responder => responder.id}
          renderItem={({ item }) => (
            <ResponderItem responder={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    top: Constants.statusBarHeight + 10,
    width: 100,
    zIndex: 10
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  map: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width
  }
});

export default VictimScreen;