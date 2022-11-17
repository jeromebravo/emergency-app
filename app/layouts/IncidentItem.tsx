import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getPreciseDistance } from 'geolib';
import { Button, Text, View } from 'native-base';

import Incident from '../interfaces/Incident';
import { RootState } from '../redux/store';

import PhotosContainer from '../components/PhotosContainer';

interface IncidentItemProps {
  onRespond: (id: string) => void;
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ onRespond, incident }) => {
  const currentLocation = useSelector((state: RootState) => state.location);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const distance = getPreciseDistance(
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: incident.coordinates.latitude, longitude: incident.coordinates.longitude }
    );
    setDistance(distance / 1000);
  }, [currentLocation]);

  return (
    <View py={3}>
      <Text>Date & Time: {dayjs(incident.createdAt).format('MMM D, YYYY h:mm a')}</Text>
      <Text>Distance: {distance === null ? 'loading...' : `${distance} KM`}</Text>
      <Text
        style={{ paddingRight: 35 }}
      >
        Categories: {`${incident.professionCategories.join(', ')}`}
      </Text>
      <Text>Type of Incident: {`${incident.typeOfIncident}`}</Text>

      {!!incident.numberOfVictims.trim().length && (
        <Text>Estimated Number of Victims: {incident.numberOfVictims}</Text>
      )}

      {!!incident.numberOfSuspects.trim().length && (
        <Text>Estimated Number of Suspects: {incident.numberOfSuspects}</Text>
      )}

      {!!incident.suspectArmed.trim().length && (
        <Text>Suspect Armed: {incident.suspectArmed}</Text>
      )}

      {!!incident.vehicleType.trim().length && (
        <Text>Escape Vehicle Type: {incident.vehicleType}</Text>
      )}

      {!!incident.vehicleColor.trim().length && (
        <Text>Escape Vehicle Color: {incident.vehicleColor}</Text>
      )}

      {!!incident.plateNumber.trim().length && (
        <Text>Plate Number: {incident.plateNumber}</Text>
      )}

      {!!incident.comment.trim().length && (
        <Text>Comment: {incident.comment}</Text>
      )}

      <PhotosContainer
        photos={incident.photos}
        style={{ marginVertical: 5 }}
      />

      <Button
        background='green.500'
        style={{ width: 100 }}
        onPress={() => onRespond(incident.id)}
      >
        Respond
      </Button>
    </View>
  );
}

export default IncidentItem;