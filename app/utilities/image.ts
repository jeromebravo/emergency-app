import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1
    });

    if (!result.cancelled) {
      return result.uri;
    }

  } catch (err) {
    console.log(err);
  }
}