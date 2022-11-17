import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Icon, Text, View } from 'native-base';

import Victim from '../interfaces/Victim';
import { RootState } from '../redux/store';
import { possibleScenarios } from '../constants';

interface VictimItemProps {
  onRespond: (id: string) => void;
  victim: Victim
}

const VictimItem: React.FC<VictimItemProps> = ({ onRespond, victim }) => {
  const currentLocation = useSelector((state: RootState) => state.location);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const distance = getPreciseDistance(
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: victim.coordinates.latitude, longitude: victim.coordinates.longitude }
    );
    setDistance(distance / 1000);
  }, [currentLocation, victim]);

  return (
    <View
      flexDirection='row'
      py={3}
    >
      <Icon
        as={FontAwesome}
        color='blue.500'
        name='user'
        size={10}
      />

      <View style={{ marginLeft: 5 }}>
        <Text>Date & Time: {dayjs(victim.createdAt).format('MMM D, YYYY h:mm a')}</Text>
        <Text>Distance: {distance === null ? 'loading...' : `${distance} KM`}</Text>
        <Text
          style={{ paddingRight: 35 }}
        >
          Categories: {`${victim.professionCategories.join(', ')}`}
        </Text>
        <Text
          style={{ paddingRight: 35 }}
        >
          Possible Scenario:
          {victim.professionCategories.includes('Fire Safety Related') ? ` ${possibleScenarios[1]}` : ` ${possibleScenarios[0]}`}
        </Text>
        <Button
          background='green.500'
          style={{ marginTop: 5, width: 100 }}
          onPress={() => onRespond(victim.id)}
        >
          Respond
        </Button>
      </View>
    </View>
  );
}

export default VictimItem;