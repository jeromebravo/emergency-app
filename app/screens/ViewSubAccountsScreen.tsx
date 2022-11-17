import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Center, FlatList, Text } from 'native-base';

import User from '../interfaces/User';
import { getSubAccounts } from '../services/user';
import { RootState } from '../redux/store';

import Loading from '../components/Loading';
import Screen from '../components/Screen';
import SubAccount from '../layouts/SubAccount';
import { BackButton } from '../components/button';

const ViewSubAccountsScreen: React.FC = () => {
  const currentEntity = useSelector((state: RootState) => state.entity);

  const [subAccounts, setSubAccounts] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetSubAccounts();
  }, []);

  const handleGetSubAccounts = async () => {
    const subAccounts = await getSubAccounts(currentEntity.id);
    setSubAccounts(subAccounts);
    setLoading(false);
  }

  if (loading) return <Loading />

  return (
    <Screen>
      <BackButton />

      {subAccounts?.length ? (
        <FlatList
          data={subAccounts}
          keyExtractor={subAccount => subAccount.id}
          renderItem={({ item }) => (
            <SubAccount user={item} />
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

export default ViewSubAccountsScreen;