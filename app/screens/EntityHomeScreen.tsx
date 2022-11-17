import React, { useState } from 'react';
import { Button, VStack } from 'native-base';

import { logout } from '../services/auth';
import { useAppNavigation } from '../hooks';
import { EntityRoutes } from '../interfaces/Routes';

import Confirm from '../components/Confirm';
import Screen from '../components/Screen';

const EntityHomeScreen: React.FC = () => {
  const navigation = useAppNavigation<EntityRoutes>();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(false);
    logout();
  }

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Confirm
        description='Are you sure?'
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title='Logout'
      />

      <VStack space={3}>
        <Button
          backgroundColor='blue.500'
          padding={7}
          onPress={() => navigation.navigate('CreateSubAccount')}
        >
          CREATE SUB ACCOUNT
        </Button>

        <Button
          backgroundColor='blue.500'
          padding={7}
          onPress={() => navigation.navigate('ViewSubAccounts')}
        >
          VIEW SUB ACCOUNTS
        </Button>
      </VStack>

      <Button
        backgroundColor='red.500'
        marginTop={10}
        padding={7}
        onPress={() => setShowModal(true)}
      >
        LOGOUT
      </Button>
    </Screen>
  );
}

export default EntityHomeScreen;