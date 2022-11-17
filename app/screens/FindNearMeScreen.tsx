import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Center, FlatList, Text } from 'native-base';

import Entity from '../interfaces/Entity';
import { findNearbyEntities } from '../services/entity';
import { RootState } from '../redux/store';

import EntityItem from '../layouts/EntityItem';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import { BackButton } from '../components/button';

const FindNearMeScreen: React.FC = () => {
  const currentLocation = useSelector((state: RootState) => state.location);

  const [entities, setEntities] = useState<Entity[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const location = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude
    }

    findNearbyEntities(location, snap => {
      if (!isMounted) return;

      const entities = snap.docs.map(entity => (
        { id: entity.id, ...entity.data() } as Entity
      ));

      setEntities(entities);
      setLoading(false);
    });

    return () => { isMounted = false }
  }, [currentLocation]);

  if (loading) return <Loading />

  return (
    <Screen>
      <BackButton />

      {entities?.length ? (
        <FlatList
          data={entities}
          keyExtractor={entity => entity.id}
          renderItem={({ item }) => (
            <EntityItem entity={item} />
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

export default FindNearMeScreen;