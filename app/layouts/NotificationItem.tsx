import React, { useEffect, useState } from 'react';
import { getPreciseDistance } from 'geolib';
import { useSelector } from 'react-redux';
import { Button, Modal, Text } from 'native-base';

import Incident from '../interfaces/Incident';
import Notification from '../interfaces/Notification';
import Victim from '../interfaces/Victim';
import { possibleScenarios } from '../constants';
import { createResponder } from '../services/responder';
import { getVictim } from '../services/victim';
import { getIncident } from '../services/incident';
import { seenNotification } from '../services/notification';
import { updateUserstatus } from '../services/user';
import { RootState } from '../redux/store';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { location, user: currentUser } = useSelector((state: RootState) => state);

  const [incident, setIncident] = useState<Incident | null>(null);
  const [victim, setVictim] = useState<Victim | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notification.incidentId) {
      handleGetIncident();
    }

    if (notification.victimId) {
      const unsubscribe = getVictim(notification.victimId, snap => {
        const victim = { id: snap.id, ...snap.data() } as Victim;
        setVictim(victim);
      });
  
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const peer = incident?.coordinates || victim?.coordinates;

    const myCoordinates = { latitude: location.latitude, longitude: location.longitude }
    
    if (peer) {
      const peerCoordinates = { latitude: peer.latitude, longitude: peer.longitude }

      const distance = getPreciseDistance(myCoordinates, peerCoordinates);
      setDistance(distance / 1000);
    }
  }, [location, incident, victim]);

  const handleGetIncident = async () => {
    if (!notification.incidentId) return;

    const incident = await getIncident(notification.incidentId);
    setIncident(incident);
  }

  const handleClose = () => {
    setIsOpen(false);
    seenNotification(notification.id);
  }

  const handleRespond = () => {
    setLoading(true);
    seenNotification(notification.id);
    updateUserstatus(currentUser.id, 'responding');
    createResponder(
      { incidentId: notification.incidentId, victimId: notification.victimId },
      currentUser,
      { latitude: location.latitude, longitude: location.longitude }
    );
  }

  if (
    location.accuracy === null ||
    location.accuracy <= 0
  ) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content maxWidth='400px'>
        <Modal.CloseButton />
        <Modal.Header>
          {incident && 'Incident Nearby'}
          {victim && 'Victim Nearby'}
        </Modal.Header>
        <Modal.Body>
          <Text>Distance: {distance === null ? 'loading...' : `${distance} KM`}</Text>
          <Text>
            Categories:
            {incident && ` ${incident.professionCategories.join(', ')}`}
            {victim && ` ${victim.professionCategories.join(', ')}`}
          </Text>
          {incident && (
            <Text>
              Type of Incident: {incident.typeOfIncident}
            </Text>
          )}
          {victim && (
            <Text>
              Possible Scenario:
              {victim.professionCategories.includes('Fire Safety Related') ? ` ${possibleScenarios[1]}` : ` ${possibleScenarios[0]}`}
            </Text>
          )}
        </Modal.Body>
        {currentUser.professionCategory !== 'Others' && (
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={handleClose}
              >
                Skip
              </Button>
              <Button
                backgroundColor='green.500'
                isLoading={loading}
                onPress={handleRespond}
              >
                Respond
              </Button>
            </Button.Group>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default NotificationItem;