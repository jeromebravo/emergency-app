import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { Button, Icon, Text, View } from 'native-base';

import Entity from '../interfaces/Entity';
import { useAppNavigation } from '../hooks';
import { UserRoutes } from '../interfaces/Routes';
import { RootState } from '../redux/store';

interface EntityItemProps {
  entity: Entity;
}

const EntityItem: React.FC<EntityItemProps> = ({ entity }) => {
  const navigation = useAppNavigation<UserRoutes>();

  const currentLocation = useSelector((state: RootState) => state.location);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const distance = getPreciseDistance(
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude }
    );
    setDistance(distance / 1000);
  }, [currentLocation]);

  return (
    <View
      flexDirection='row'
      py={3}
    >
      <Icon
        as={FontAwesome}
        color='blue.500'
        name='building-o'
        size={10}
      />

      <View style={{ marginLeft: 5 }}>
        <Text>Entity Type: {entity.entityType}</Text>
        <Text>Entity Name: {entity.entityName}</Text>
        <Text>Entity Address: {entity.entityAddress}</Text>
        <Text>Contact Person: {entity.contactPerson}</Text>
        <Text>Contact Number: {entity.contactNumber}</Text>
        <Text>Email: {entity.email}</Text>
        <Text>Distance: {distance === null ? 'loading...' : `${distance} KM`}</Text>
        <Button
          style={{ marginTop: 5 }}
          width={100}
          onPress={() => navigation.navigate('MapView', { coordinates: entity.coordinates })}
        >
          View
        </Button>
      </View>
    </View>
  );
}

export default EntityItem;