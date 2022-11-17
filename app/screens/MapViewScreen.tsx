import React from 'react';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, View } from 'native-base';

import { colors } from '../constants';
import { useAppNavigation, useAppRoute } from '../hooks';
import { RootState } from '../redux/store';
import { UserRoutes } from '../interfaces/Routes';

const MapViewScreen: React.FC = () => {
  const navigation = useAppNavigation<UserRoutes>();
  const { params: { coordinates } } = useAppRoute('MapView');

  const currentLocation = useSelector((state: RootState) => state.location);

  return (
    <View>
      <Button
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>

      <MapView
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
        />

        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }}
          pinColor={colors.primary}
        />
      </MapView>
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
  map: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  }
});

export default MapViewScreen;