import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Button, VStack } from 'native-base';

import Notification from '../interfaces/Notification';
import { logout } from '../services/auth';
import { getNotifications } from '../services/notification';
import { useAppNavigation } from '../hooks';
import { UserRoutes } from '../interfaces/Routes';
import { RootState } from '../redux/store';

import Confirm from '../components/Confirm';
import Header from '../components/Header';
import NotificationItem from '../layouts/NotificationItem';
import ScrollView from '../components/ScrollView';

const UserHomeScreen: React.FC = () => {
  const navigation = useAppNavigation<UserRoutes>();
  const currentUser = useSelector((state: RootState) => state.user);

  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getNotifications(currentUser.id, snap => {
        const notifications = snap.docs.map(doc => (
          { id: doc.id, ...doc.data() } as Notification
        ));
  
        setNotifications(notifications);
      });
  
      return () => {
        setNotifications(null);
        unsubscribe();
      }
    }, [])
  );

  const handleLogout = () => {
    setShowModal(false);
    logout();
  }

  return (
    <ScrollView>
      <Confirm
        description='Are you sure?'
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title='Logout'
      />

      {notifications?.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}

      <Header />
      <VStack space={3}>
        <Button
          backgroundColor='blue.500'
          padding={7}
          onPress={() => navigation.navigate('NeedHelp')}
        >
          I NEED HELP
        </Button>
        <Button
          backgroundColor='blue.500'
          padding={7}
          onPress={() => navigation.navigate('ReportIncident')}
        >
          REPORT INCIDENT
        </Button>
        <Button
          backgroundColor='blue.500'
          padding={7}
          onPress={() => navigation.navigate('FindNearMe')}
        >
          FIND NEAR ME
        </Button>
      </VStack>

      {currentUser.professionCategory !== 'Others' && (
        <VStack
          marginTop={10}
          space={3}
        >
          <Button
            backgroundColor='green.500'
            padding={7}
            onPress={() => navigation.navigate('HelpPeople')}
          >
            HELP PEOPLE
          </Button>

          <Button
            backgroundColor='green.500'
            padding={7}
            onPress={() => navigation.navigate('IncidentsNearby')}
          >
            INCIDENTS NEARBY
          </Button>
        </VStack>
      )}

      <VStack
        space={3}
        marginBottom={5}
        marginTop={10}
      >
        {/* <Button
          backgroundColor='yellow.500'
          padding={7}
          onPress={() => navigation.navigate('RedeemPoints')}
        >
          REDEEM POINTS
        </Button> */}

        <Button
          backgroundColor='red.500'
          padding={7}
          onPress={() => setShowModal(true)}
        >
          LOGOUT
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default UserHomeScreen;