import React, { useState } from 'react';
import { Center, Radio, Stack, Text } from 'native-base';

import { auth } from '../config/firebase';

import Loading from '../components/Loading';
import ScrollView from '../components/ScrollView';
import { Entity, Individual } from '../layouts/register';

const CompleteProfileScreen: React.FC = () => {
  const [type, setType] = useState<'Individual' | 'Entity'>('Individual');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged(user => {
    setId(user?.uid || '');
    setEmail(user?.email || '');
    setLoading(false);
  });

  if (loading) return <Loading />

  return (
    <ScrollView>
      <Center style={{ marginBottom: 40 }}>
        <Text fontSize={30}>Complete Profile</Text>
      </Center>

      <Radio.Group
        name='type'
        value={type} 
        onChange={value => setType(value as 'Individual' | 'Entity')}
      >
        <Stack direction={{ base: 'row' }} space={5}>
          <Radio value='Individual' size='sm'>
            Individual
          </Radio>
          <Radio value='Entity' size='sm'>
            Entity
          </Radio>
        </Stack>
      </Radio.Group>

      {type === 'Individual' && <Individual id={id} defaultEmail={email} />}
      {type === 'Entity' && <Entity id={id} defaultEmail={email} />}
    </ScrollView>
  );
}

export default CompleteProfileScreen;