import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Center, FlatList, Text } from 'native-base';

import Incident from '../interfaces/Incident';
import { findNearbyIncidents } from '../services/incident';
import { createResponder } from '../services/responder';
import { updateUserstatus } from '../services/user';
import { RootState } from '../redux/store';

import Confirm from '../components/Confirm';
import IncidentItem from '../layouts/IncidentItem';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import { BackButton } from '../components/button';

const IncidentsNearbyScreen: React.FC = () => {
  const { location, user: currentUser } = useSelector((state: RootState) => state);

  const [incidents, setIncidents] = useState<Incident[] | null>(null);
  const [incidentId, setIncidentId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    findNearbyIncidents(currentUser.professionCategory, {
      latitude: location.latitude,
      longitude: location.longitude
    }, snap => {
      if (!isMounted) return;

      const incidents = snap.docs.map(incident => (
        { id: incident.id, ...incident.data() } as Incident
      ));

      setIncidents(incidents);
      setLoading(false);
    });

    return () => { isMounted = false }

  }, [location]);

  const handleConfirm = () => {
    setLoading(true);
    updateUserstatus(currentUser.id, 'responding');
    createResponder(
      { victimId: null, incidentId },
      currentUser,
      { latitude: location.latitude, longitude: location.longitude }
    );
    setShowConfirm(false);
  }

  const handleRespond = (id: string) => {
    setIncidentId(id);
    setShowConfirm(true);
  }

  if (loading) return <Loading />

  return (
    <Screen>
      <Confirm
        description='Are you sure?'
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title='Respond'
      />

      <BackButton />

      {incidents?.length ? (
        <FlatList
          data={incidents}
          keyExtractor={incident => incident.id}
          renderItem={({ item }) => (
            <IncidentItem onRespond={handleRespond} incident={item} />
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Center
          flex={1}
          style={{ marginTop: -80 }}
        >
          <Text>No incidents around your area</Text>
        </Center>
      )}
    </Screen>
  );
}

export default IncidentsNearbyScreen;