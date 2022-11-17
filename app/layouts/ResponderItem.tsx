import React, { useEffect, useState } from 'react';
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Icon, Text, View } from 'native-base';

import Responder from '../interfaces/Responder';
import { RootState } from '../redux/store';

interface ResponderItemProps {
  responder: Responder;
}

const ResponderItem: React.FC<ResponderItemProps> = ({ responder }) => {
  const currentLocation = useSelector((state: RootState) => state.location);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const distance = getPreciseDistance(
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: responder.coordinates.latitude, longitude: responder.coordinates.longitude }
    );
    setDistance(distance / 1000);
  }, [currentLocation, responder]);

  return (
    <View style={styles.container}>
      <Icon
        as={FontAwesome}
        color='blue.500'
        name='user'
        size={10}
      />
  
      <View>
        <Text>Profession:</Text>
        <Text>{responder.responder.professionName}</Text>
      </View>
  
      <View>
        <Text>Distance:</Text>
        <Text>{distance === null ? 'loading...' : `${distance} KM`}</Text>
      </View>

      <View>
        <Text>Status:</Text>
        <Text>{responder.status}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15
  }
});

export default ResponderItem;