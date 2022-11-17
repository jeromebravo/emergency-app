import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { View } from 'native-base';

import PhotoModal from './PhotoModal';
import PhotoPreview from './PhotoPreview';

interface PhotosContainerProps {
  photos: string[];
  setPhotos?: React.Dispatch<React.SetStateAction<string[]>>;
  style?: ViewStyle | ViewStyle[];
}

const PhotosContainer: React.FC<PhotosContainerProps> = ({ photos, setPhotos, style }) => {
  const [photo, setPhoto] = useState('');

  if (photos.length === 0) return null;

  const handleRemove = (uri: string) => {
    if (!setPhotos) return;
    setPhotos(photos.filter(photo => photo !== uri))
  }

  return (
    <View
      flexDirection='row'
      justifyContent={photos.length === 3 ? 'space-around' : 'flex-start'}
      style={style}
    >
      <PhotoModal
        uri={photo}
        onClose={() => setPhoto('')}
      />
      {photos.map((uri, index) => (
        <PhotoPreview
          key={index}
          onPress={() => setPhoto(uri)}
          onRemove={setPhotos ? () => handleRemove(uri) : undefined}
          style={{
            marginBottom: 5,
            marginLeft: index === 1 && photos.length < 3 ? 5 : 0
          }}
          uri={uri}
        />
      ))}
    </View>
  );
}

export default PhotosContainer;