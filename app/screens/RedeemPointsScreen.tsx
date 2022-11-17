import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Center,
  FlatList,
  Input,
  Text,
  useToast,
  VStack
} from 'native-base';

import RedeemSettings from '../interfaces/RedeemSettings';
import RedeemRequest from '../interfaces/RedeemRequest';
import User from '../interfaces/User';
import { errorToast, successToast } from '../constants';
import { getUser, updateUserPoints } from '../services/user';
import { getRedeemSettings } from '../services/redeemSettings';
import { createRedeemRequest, getRedeemRequests } from '../services/redeemRequest';
import { RootState } from '../redux/store';

import Confirm from '../components/Confirm';
import Loading from '../components/Loading';
import RedeemRequestItem from '../layouts/RedeemRequestItem';
import Screen from '../components/Screen';
import { BackButton } from '../components/button';

const RedeemPointsScreen: React.FC = () => {
  const id = useSelector((state: RootState) => state.user.id);
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [redeemSettings, setRedeemSettings] = useState<RedeemSettings | null>(null);
  const [redeemRequests, setRedeemRequests] = useState<RedeemRequest[] | null>(null);
  const [gcashName, setGcashName] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');
  const [pointsToConvert, setPointsToConvert] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onMount();

    const unsubscribe = getRedeemRequests(id, snap => {
      const redeemRequests = snap.docs.map(redeemRequest => (
        { id: redeemRequest.id, ...redeemRequest.data() } as RedeemRequest
      ));

      setRedeemRequests(redeemRequests);
    });

    return () => unsubscribe();
  }, []);

  const onMount = async () => {
    const user = await getUser(id);
    setUser(user);

    const redeemSettings = await getRedeemSettings();
    setRedeemSettings(redeemSettings);

    setLoading(false);
  }

  const handleConfirm = () => {
    const newPoints = user?.points! - Number(pointsToConvert);

    createRedeemRequest(
      id,
      gcashName,
      gcashNumber,
      Number(pointsToConvert),
      (Number(pointsToConvert) * redeemSettings?.conversion!)
    );
    updateUserPoints(id, user?.points! - Number(pointsToConvert));
    setUser({ ...user!, points: newPoints });
    setGcashName('');
    setGcashNumber('');
    setPointsToConvert('');
    setShowConfirm(false);
    toast.show({
      description: 'Admin is processing your request',
      ...successToast
    });
  }

  const handleSubmit = () => {
    if (Number(pointsToConvert) < redeemSettings?.minimum!) {
      toast.show({
        description: `Redeem points must be at least ${redeemSettings?.minimum!}`,
        ...errorToast
      });
      return;
    }

    if (Number(pointsToConvert) > user?.points!) {
      toast.show({ description: 'Insufficient points', ...errorToast });
      return;
    }

    setShowConfirm(true);
  }

  if (loading) return <Loading />

  return (
    <Screen>
      <BackButton />

      <Confirm
        description='Are you sure that the details you input are correct? You cannot change it later.'
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title='Confirm'
      />

      <Center marginY={5}>
        <Text>Available Points: {user?.points}</Text>
        <Text>Conversion: 1 Point = {redeemSettings?.conversion} Peso</Text>
        <Text>Minimum Redeem: {redeemSettings?.minimum}</Text>
      </Center>

      <VStack
        marginBottom={10}
        space={3}
      >
        <Input
          placeholder='GCash Name'
          value={gcashName}
          onChangeText={setGcashName}
        />
        <Input
          keyboardType='number-pad'
          placeholder='GCash Number'
          value={gcashNumber}
          onChangeText={setGcashNumber}
        />
        <Input
          keyboardType='number-pad'
          placeholder='Points'
          value={pointsToConvert}
          onChangeText={setPointsToConvert}
        />
        <Button
          isDisabled={!gcashName || !gcashNumber || !pointsToConvert}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </VStack>

      <Text
        fontWeight='bold'
      >
        Request History
      </Text>

      <FlatList
        data={redeemRequests}
        keyExtractor={redeemRequest => redeemRequest.id}
        renderItem={({ item }) => (
          <RedeemRequestItem redeemRequest={item} />
        )}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      />
    </Screen>
  );
}

export default RedeemPointsScreen;