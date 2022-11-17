import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Input,
  Select,
  useToast,
  View,
  VStack
} from 'native-base';

import {
  errorToast,
  successToast,
  professionCategories,
  safetyRelatedProfessions,
  fireSafetyRelatedProfessions,
  medicalRelatedProfessions
} from '../constants';
import { createUser } from '../services/user';
import { registerWithEmailAndPassword } from '../services/auth';
import { pickImage } from '../utilities/image';
import { useAppNavigation } from '../hooks';
import { RootState } from '../redux/store';
import { UserEntryFields } from '../interfaces/User';
import { EntityRoutes } from '../interfaces/Routes';
import { ProfessionCategory } from '../interfaces/Profession';

import PhotoPreview from '../components/PhotoPreview';
import ScrollView from '../components/ScrollView';
import { BackButton } from '../components/button';

const CreateSubAccountScreen: React.FC = () => {
  const toast = useToast();
  const navigation = useAppNavigation<EntityRoutes>();
  const currentEntity = useSelector((state: RootState) => state.entity);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [professionCategory, setProfessionCategory] = useState('');
  const [professionName, setProfessionName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cellPhoneNumber, setCellPhoneNumber] = useState('');
  const [identification, setIdentification] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (
      !email.trim() || !password.trim() ||
      !professionCategory.trim() || !professionName.trim() ||
      !firstName.trim() || !lastName.trim() ||
      !cellPhoneNumber.trim() || !identification.trim()
    ) {
      toast.show({ description: 'Fill all the fields', ...errorToast });
      return;
    }

    if (password.length < 6) {
      toast.show({ description: 'Password must be at least 6 characters long', ...errorToast });
      return;
    }

    if (!profilePicture.trim()) {
      toast.show({ description: 'Please add a profile picture', ...errorToast });
      return;
    }

    setLoading(true);

    const user = await registerWithEmailAndPassword(email, password, () => {
      toast.show({ description: 'Email already exists', ...errorToast });
      setLoading(false);
    });

    if (!user) return;

    const userObj: UserEntryFields = {
      cellPhoneNumber,
      email,
      entityId: currentEntity.id,
      expoPushToken: '',
      firstName,
      identification,
      lastName,
      professionCategory: professionCategory as ProfessionCategory,
      professionName,
      profilePicture
    }

    const locationObj = {
      latitude: 0,
      longitude: 0
    }

    createUser(user.uid, userObj, locationObj);

    toast.show({ description: 'Successfuly created', ...successToast });
    navigation.goBack();
  }

  const handlePickImage = async () => {
    const profilePicture = await pickImage();
    if (!profilePicture) return;
    setProfilePicture(profilePicture);
  }

  return (
    <ScrollView>
      <BackButton />
      
      <VStack
        space={3}
        style={{ marginVertical: 30 }}
      >
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

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
          placeholder='Identification'
          value={identification}
          onChangeText={setIdentification}
        />

        <Button
          variant='outline'
          onPress={handlePickImage}
        >
          Add Profile Picture
        </Button>

        {!!profilePicture.length && (
          <View style={{ alignItems: 'center' }}>
            <PhotoPreview
              uri={profilePicture}
              onRemove={() => setProfilePicture('')}
            />
          </View>
        )}

        <Button
          disabled={loading}
          onPress={handleCreate}
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default CreateSubAccountScreen;