import React, { useState } from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Button, Center, Icon, Text, VStack } from 'native-base';

import { createVictim } from '../services/victim';
import { createNotification } from '../services/notification';
import { getNearbyUsers, updateUserstatus } from '../services/user';
import { sendPushNotification } from '../utilities/pushNotification';
import { ProfessionCategory } from '../interfaces/Profession';
import { RootState } from '../redux/store';

import ScrollView from '../components/ScrollView';
import { BackButton } from '../components/button';

const NeedHelpScreen: React.FC = () => {
  const { user: currentUser, location } = useSelector((state: RootState) => state);

  const [professionCategories, setProfessionCategories] = useState<ProfessionCategory[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePress = (professionCategory: ProfessionCategory) => {
    if (professionCategories.includes(professionCategory)) {
      setProfessionCategories(professionCategories.filter(value => value !== professionCategory));
    } else {
      setProfessionCategories([professionCategory, ...professionCategories]);
    }
  }

  const handleSelectAll = () => {
    if (professionCategories.length === 3) {
      setProfessionCategories([]);
    } else {
      setProfessionCategories(['Safety Related', 'Medical Related', 'Fire Safety Related']);
    }
  }

  const handleSubmit = async () => {
    setLoading(true);

    updateUserstatus(currentUser.id, 'need help');

    const victimId = await createVictim(
      currentUser,
      professionCategories,
      { latitude: location.latitude, longitude: location.longitude }
    );

    if (!victimId) return;

    const users = await getNearbyUsers(
      professionCategories,
      { latitude: location.latitude, longitude: location.longitude }
    );

    if (!users) return;

    for (const user of users) {
      if (user.id === currentUser.id) continue;

      createNotification(user.id, { victimId, incidentId: null });
      sendPushNotification(
        'Emergency',
        'Someone near your location is seeking for help',
        user.expoPushToken
      );
    }
  }

  return (
    <ScrollView>
      <BackButton style={{ marginBottom: 20 }} />

      <Center marginBottom={10}>
        <Text fontSize={18}>Select The Categories You Need</Text>
      </Center>

      <VStack space={3}>
        <Button
          backgroundColor={professionCategories.includes('Safety Related') ? 'blue.500' : 'white'}
          borderColor='blue.500'
          padding={5}
          startIcon={<Icon
            as={MaterialCommunityIcons}
            color={professionCategories.includes('Safety Related') ? 'white' : 'blue.500'}
            name='police-badge'
            size={7}
          />}
          variant='outline'
          onPress={() => handlePress('Safety Related')}
        >
          <Text
            color={professionCategories.includes('Safety Related') ? 'white' : 'blue.500'}
          >
            SAFETY RELATED HELP
          </Text>
        </Button>

        <Button
          backgroundColor={professionCategories.includes('Medical Related') ? 'blue.500' : 'white'}
          borderColor='blue.500'
          padding={5}
          startIcon={<Icon
            as={MaterialCommunityIcons}
            color={professionCategories.includes('Medical Related') ? 'white' : 'blue.500'}
            name='ambulance'
            size={7}
          />}
          variant='outline'
          onPress={() => handlePress('Medical Related')}
        >
          <Text
            color={professionCategories.includes('Medical Related') ? 'white' : 'blue.500'}
          >
            MEDICAL RELATED HELP
          </Text>
        </Button>

        <Button
          backgroundColor={professionCategories.includes('Fire Safety Related') ? 'blue.500' : 'white'}
          borderColor='blue.500'
          padding={5}
          startIcon={<Icon
            as={MaterialCommunityIcons}
            color={professionCategories.includes('Fire Safety Related') ? 'white' : 'blue.500'}
            name='fire-truck'
            size={7}
          />}
          variant='outline'
          onPress={() => handlePress('Fire Safety Related')}
        >
          <Text
            color={professionCategories.includes('Fire Safety Related') ? 'white' : 'blue.500'}
          >
            FIRE RELATED HELP
          </Text>
        </Button>

        <Button
          backgroundColor={professionCategories.length === 3 ? 'blue.500' : 'white'}
          borderColor='blue.500'
          padding={5}
          startIcon={<Icon
            as={FontAwesome}
            color={professionCategories.length === 3 ? 'white' : 'blue.500'}
            name='users'
            size={7}
          />}
          variant='outline'
          onPress={handleSelectAll}
        >
          <Text
            color={professionCategories.length === 3 ? 'white' : 'blue.500'}
          >
            SELECT ALL
          </Text>
        </Button>
      </VStack>

      <Button
        backgroundColor='green.500'
        marginBottom={5}
        marginTop={10}
        padding={5}
        isDisabled={!professionCategories.length}
        isLoading={loading}
        onPress={handleSubmit}
      >
        SUBMIT
      </Button>
    </ScrollView>
  );
}

export default NeedHelpScreen;