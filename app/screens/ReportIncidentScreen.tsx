import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  Input,
  Select,
  Text,
  TextArea,
  useToast,
  View,
  VStack
} from 'native-base';

import { errorToast, successToast } from '../constants';
import { useAppNavigation } from '../hooks';
import { createIncident } from '../services/incident';
import { createNotification } from '../services/notification';
import { getNearbyUsers } from '../services/user';
import { pickImage } from '../utilities/image';
import { sendPushNotification } from '../utilities/pushNotification';
import { UserRoutes } from '../interfaces/Routes';
import { ProfessionCategory } from '../interfaces/Profession';
import { RootState } from '../redux/store';

import PhotosContainer from '../components/PhotosContainer';
import ScrollView from '../components/ScrollView';
import { BackButton } from '../components/button';

const ReportIncidentScreen: React.FC = () => {
  const navigation = useAppNavigation<UserRoutes>();
  const toast = useToast();
  const { location, user: currentUser } = useSelector((state: RootState) => state);

  const [professionCategories, setProfessionCategories] = useState<ProfessionCategory[]>([]);
  const [formData, setFormData] = useState({
    typeOfIncident: '',
    numberOfVictims: '',
    numberOfSuspects: '',
    suspectArmed: '',
    vehicleType: '',
    vehicleColor: '',
    plateNumber: '',
    comment: ''
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!professionCategories.includes('Safety Related')) {
      setFormData({
        ...formData,
        numberOfSuspects: '',
        suspectArmed: '',
        vehicleType: '',
        vehicleColor: '',
        plateNumber: '',
      });
    }

    if (professionCategories.length === 1 && professionCategories[0] === 'Fire Safety Related') {
      setFormData({
        ...formData,
        typeOfIncident: ''
      });
    }

    if (professionCategories.length === 0) {
      setFormData({
        ...formData,
        typeOfIncident: '',
        numberOfVictims: '',
        numberOfSuspects: '',
        suspectArmed: '',
        vehicleType: '',
        vehicleColor: '',
        plateNumber: '',
      })
    }
  }, [professionCategories]);

  const handleSelect = (value: ProfessionCategory) => {
    if (professionCategories.includes(value)) {
      setProfessionCategories(professionCategories.filter(category => category !== value));
    } else {
      setProfessionCategories([value, ...professionCategories]);
    }
  }

  const handleAddPhoto = async () => {
    const photo = await pickImage();
    if (!photo) return;
    setPhotos([...photos, photo]);
  }

  const handleSubmit = async () => {
    if (!professionCategories.length) return;
    if (
      (professionCategories.includes('Safety Related') ||
      professionCategories.includes('Medical Related')) &&
      !formData.typeOfIncident.trim()
    ) {
      toast.show({ description: 'Type of incident is required', ...errorToast });
      return;
    }
    if (!photos.length) {
      toast.show({ description: 'Please add a photo', ...errorToast });
      return;
    }

    setLoading(true);

    const incidentId = await createIncident(
      {
        photos,
        professionCategories,
        reportedBy: currentUser.id,
        ...formData
      },
      { latitude: location.latitude, longitude: location.longitude }
    );

    toast.show({ description: 'Incident reported', ...successToast });
    navigation.goBack();

    if (!incidentId) return;

    const users = await getNearbyUsers(
      ['Others', ...professionCategories],
      { latitude: location.latitude, longitude: location.longitude }
    );

    if (!users) return;

    for (const user of users) {
      if (user.id === currentUser.id) continue;

      createNotification(user.id, { victimId: null, incidentId });
      sendPushNotification(
        'Emergency',
        'There is an accident near your location',
        user.expoPushToken
      );
    }
  }

  return (
    <ScrollView>
      <View
        alignItems='center'
        flexDirection='row'
        marginBottom={5}
      >
        <BackButton />
        <Text marginLeft={5}>REPORT INCIDENT</Text>
      </View>

      <View marginBottom={5}>
        <Text marginBottom={1}>Select Categories</Text>
        <VStack space={1}>
          <Checkbox
            value='Safety Related'
            onChange={() => handleSelect('Safety Related')}
          >
            Safety Related
          </Checkbox>
          <Checkbox
            value='Medical Related'
            onChange={() => handleSelect('Medical Related')}
          >
            Medical Related
          </Checkbox>
          <Checkbox
            value='Fire Safety Related'
            onChange={() => handleSelect('Fire Safety Related')}
          >
            Fire Safety Related
          </Checkbox>
        </VStack>
      </View>

      {!!professionCategories.length && (
        <VStack marginBottom={5} space={2}>
          {(professionCategories.length > 1 || !professionCategories.includes('Fire Safety Related'))&& (
            <View>
              <Text marginBottom={1}>Type of Incident</Text>
              <Input
                placeholder='Ex: Hit and run'
                onChangeText={text => setFormData({ ...formData, typeOfIncident: text })}
              />
            </View>
          )}

          <View>
            <Text marginBottom={1}>Estimated Number of Victims</Text>
            <Input
              keyboardType='numeric'
              onChangeText={text => setFormData({ ...formData, numberOfVictims: text })}
            />
          </View>

          {professionCategories.includes('Safety Related') && (
            <VStack space={2}>
              <View>
                <Text marginBottom={1}>Estimated Number of Suspects</Text>
                <Input
                  keyboardType='numeric'
                  onChangeText={text => setFormData({ ...formData, numberOfSuspects: text })}
                />
              </View>

              <View>
                <Text marginBottom={1}>Suspect Armed</Text>
                <Select
                  onValueChange={value => setFormData({ ...formData, suspectArmed: value })}
                >
                  <Select.Item
                    label='Yes'
                    value='Yes'
                  />
                  <Select.Item
                    label='No'
                    value='No'
                  />
                  <Select.Item
                    label='Not sure'
                    value='Not sure'
                  />
                </Select>
              </View>

              <View>
                <Text marginBottom={1}>Escape Vehicle Type</Text>
                <Input onChangeText={text => setFormData({ ...formData, vehicleType: text })} />
              </View>

              <View>
                <Text marginBottom={1}>Escape Vehicle Color</Text>
                <Input onChangeText={text => setFormData({ ...formData, vehicleColor: text })} />
              </View>

              <View>
                <Text marginBottom={1}>Plate Number</Text>
                <Input onChangeText={text => setFormData({ ...formData, plateNumber: text })} />
              </View>
            </VStack>
          )}
        </VStack>
      )}

      <View marginBottom={5}>
        <Text marginBottom={1}>Comment</Text>
        <TextArea
          autoCompleteType={false}
          alignItems='flex-start'
          onChangeText={text => setFormData({ ...formData, comment: text })}
        />
      </View>

      <PhotosContainer
        photos={photos}
        setPhotos={setPhotos}
        style={{ marginBottom: 15 }}
      />

      <VStack marginBottom={5} space={3}>
        <Button
          variant='outline'
          isDisabled={photos.length === 3}
          onPress={handleAddPhoto}
        >
            Add Photo
        </Button>
        <Button
          disabled={!professionCategories.length}
          onPress={handleSubmit}
          isLoading={loading}
        >
          Submit
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default ReportIncidentScreen;