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
import { setCurrentEntity } from '../../redux/actions/entity';
import { getCurrentLocation, locationErrorMessage } from '../../utilities/location';
import { entityTypes } from '../../constants';
import { createEntity } from '../../services/entity';
import { AuthRoutes } from '../../interfaces/Routes';

import Link from '../../components/Link';

interface EntityProps {
  id: string;
  defaultEmail: string;
}

const Entity: React.FC<EntityProps> = ({ id, defaultEmail }) => {
  const navigation = useAppNavigation<AuthRoutes>();
  const toast = useToast();
  const dispatch = useDispatch();

  const [entityType, setEntityType] = useState('');
  const [entityName, setEntityName] = useState('');
  const [entityAddress, setEntityAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState(defaultEmail);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  const handleRegister = async () => {
    if (
      !entityType.trim() || !entityName.trim() ||
      !entityAddress.trim() || !contactPerson.trim() ||
      !contactNumber.trim() || !email.trim()
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

    const entity = await createEntity(
      id,
      { entityType, entityName, entityAddress, contactPerson, contactNumber, email },
      { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    );

    setCurrentEntity(entity!, dispatch);
    setLoading(false);

    navigation.replace('EntityRoutes', { screen: 'Home' });
  }

  const openPrivacyPolicy = () => {
    Linking.openURL('https://freeprivacypolicy.com/live/071508f3-3668-4d42-b061-b95e2830966a');
  }

  return (
    <VStack space={3} style={{ marginBottom: 40, marginTop: 10 }}>
      <Select
        selectedValue={entityType}
        placeholder='- Select Type -'
        onValueChange={setEntityType}
      >
        {entityTypes.map(type => (
          <Select.Item
            key={type}
            label={type}
            value={type}
          />
        ))}
      </Select>
      <Input
        placeholder='Entity Name (ex. Police Station Ermita)'
        value={entityName}
        onChangeText={setEntityName}
      />
      <Input
        placeholder='Entity Address'
        value={entityAddress}
        onChangeText={setEntityAddress}
      />
      <Input
        placeholder='Contact Person'
        value={contactPerson}
        onChangeText={setContactPerson}
      />
      <Input
        placeholder='Contact Number'
        keyboardType='number-pad'
        value={contactNumber}
        onChangeText={setContactNumber}
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

export default Entity;