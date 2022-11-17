import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Center, FlatList, Text } from 'native-base';

import Victim from '../interfaces/Victim';
import { createResponder } from '../services/responder';
import { findNearbyVictims } from '../services/victim';
import { updateUserstatus } from '../services/user';
import { RootState } from '../redux/store';

import Confirm from '../components/Confirm';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import VictimItem from '../layouts/VictimItem';
import { BackButton } from '../components/button';

const HelpPeopleScreen: React.FC = () => {
  const { location, user: currentUser } = useSelector((state: RootState) => state);

  const [victims, setVictims] = useState<Victim[] | null>(null);
  const [victimId, setVictimId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    findNearbyVictims(currentUser.professionCategory, {
      latitude: location.latitude,
      longitude: location.longitude
    }, snap => {
      if (!isMounted) return;

      const victims = snap.docs.map(victim => {
        return { id: victim.id, ...victim.data() } as Victim;
      });

      setVictims(victims);
      setLoading(false);
    });

    return () => { isMounted = false }
  }, [location]);

  const handleConfirm = () => {
    setLoading(true);
    updateUserstatus(currentUser.id, 'responding');
    createResponder(
      { victimId, incidentId: null },
      currentUser,
      { latitude: location.latitude, longitude: location.longitude }
    );
    setShowConfirm(false);
  }

  const handleRespond = (id: string) => {
    setVictimId(id);
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

      {victims?.length ? (
        <FlatList
          data={victims}
          keyExtractor={victim => victim.id}
          renderItem={({ item }) => (
            <VictimItem onRespond={handleRespond} victim={item} />
          )}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Center
          flex={1}
          style={{ marginTop: -80 }}
        >
          <Text>No victims around your area</Text>
        </Center>
      )}
    </Screen>
  );
}

export default HelpPeopleScreen;