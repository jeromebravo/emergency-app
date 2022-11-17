import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Linking } from 'react-native';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Text,
  useToast,
  VStack
} from 'native-base';

import { errorToast } from '../../constants';
import { useAppNavigation } from '../../hooks';
import { setCurrentUser } from '../../redux/actions/user';
import { getCurrentLocation, locationErrorMessage } from '../../utilities/location';
import { createUser } from '../../services/user';
import { registerForPushNotificationAsync } from '../../utilities/pushNotification';
import {
  professionCategories,
  fireSafetyRelatedProfessions,
  medicalRelatedProfessions,
  safetyRelatedProfessions
} from '../../constants';
import { AuthRoutes } from '../../interfaces/Routes';
import { ProfessionCategory } from '../../interfaces/Profession';
import { UserEntryFields } from '../../interfaces/User';

import Link from '../../components/Link';

interface IndividualProps {
  id: string;
  defaultEmail: string;
}

const Individual: React.FC<IndividualProps> = ({ id, defaultEmail }) => {
  const navigation = useAppNavigation<AuthRoutes>();
  const toast = useToast();
  const dispatch = useDispatch();

  const [professionCategory, setProfessionCategory] = useState('');
  const [professionName, setProfessionName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellPhoneNumber, setCellPhoneNumber] = useState('');
  const [email, setEmail] = useState(defaultEmail);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  const handleRegister = async () => {
    if (
      !professionCategory.trim() || !professionName.trim() ||
      !firstName.trim() || !lastName.trim() ||
      !cellPhoneNumber.trim() || !email.trim()
    ) {
      toast.show({ description: 'Fill all the fields', ...errorToast });
      return;
    }

    if (!acceptPrivacyPolicy) {
      toast.show({ description: 'Please accept privacy policy', ...errorToast });
      return;
    }

    setLoading(true);
    const currentLocation = await getCurrentLocation();

    if (!currentLocation) {
      toast.show({ description: locationErrorMessage, ...errorToast });
      setLoading(false);
      return;
    }

    const expoPushToken = await registerForPushNotificationAsync();

    if (!expoPushToken) {
      toast.show({ description: 'Please turn on notification', ...errorToast });
      setLoading(false);
      return;
    }

    const userObj: UserEntryFields = {
      cellPhoneNumber,
      email,
      entityId: null,
      expoPushToken,
      firstName,
      identification: null,
      lastName,
      professionCategory: professionCategory as ProfessionCategory,
      professionName,
      profilePicture: null
    }

    const locationObj = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    }

    const user = await createUser(id, userObj, locationObj);
    
    setCurrentUser(user!, dispatch);
    setLoading(false);

    navigation.replace('Walkthrough');
  }

  const openPrivacyPolicy = () => {
    Linking.openURL('https://freeprivacypolicy.com/live/071508f3-3668-4d42-b061-b95e2830966a');
  }

  return (
    <VStack space={3} style={{ marginBottom: 40, marginTop: 10 }}>
      <Select
        selectedValue={professionCategory}
        placeholder='- Select Profession Category -'
        onValueChange={value => {
          setProfessionCategory(value);
          setProfessionName('');
        }}
      >
        {professionCategories.map(category => (
          <Select.Item
            key={category}
            label={category}
            value={category}
          />
        ))}
      </Select>

      {professionCategory === '' && (
        <Select
          placeholder='- Please select profession category -'
          isDisabled
        />
      )}
      
      {professionCategory === 'Safety Related' && (
        <Select
          selectedValue={professionName}
          placeholder='- Select Profession -'
          onValueChange={setProfessionName}
        >
          {safetyRelatedProfessions.map(profession => (
            <Select.Item
              key={profession}
              label={profession}
              value={profession}
            />
          ))}
        </Select>
      )}
      
      {professionCategory === 'Fire Safety Related' && (
        <Select
          selectedValue={professionName}
          placeholder='- Select Profession -'
          onValueChange={setProfessionName}
        >

          {fireSafetyRelatedProfessions.map(profession => (
            <Select.Item
              key={profession}
              label={profession}
              value={profession}
            />
          ))}
        </Select>
      )}

      {professionCategory === 'Medical Related' && (
        <Select
          selectedValue={professionName}
          placeholder='- Select Profession -'
          onValueChange={setProfessionName}
        >

          {medicalRelatedProfessions.map(profession => (
            <Select.Item
              key={profession}
              label={profession}
              value={profession}
            />
          ))}
        </Select>
      )}

      {professionCategory === 'Others' && (
        <Input
          placeholder='Please specify'
          value={professionName}
          onChangeText={setProfessionName}
        />
      )}

      <Input
        placeholder='First Name'
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        placeholder='Last Name'
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        placeholder='Cellphone Number'
        keyboardType='number-pad'
        value={cellPhoneNumber}
        onChangeText={setCellPhoneNumber}
      />
      <Input
        isDisabled={!!defaultEmail}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />

      <Checkbox value='test' onChange={() => setAcceptPrivacyPolicy(!acceptPrivacyPolicy)}>
        <Text>
          I accept
        </Text>
        <Link onPress={openPrivacyPolicy}>
          Privacy Policy
        </Link>
      </Checkbox>

      <Button
        disabled={loading}
        onPress={handleRegister}
      >
        {loading ? 'Loading...' : 'Submit'}
      </Button>
    </VStack>
  );
}

export default Individual;