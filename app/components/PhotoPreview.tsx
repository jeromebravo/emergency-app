import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ImageStyle, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Icon, IconButton, Image, View } from 'native-base';

interface PhotoPreviewProps {
  onPress?: () => void;
  onRemove?: () => void;
  style?: ImageStyle;
  uri: string;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  onPress,
  onRemove,
  style,
  uri
}) => (
  <View>
    {onRemove && (
      <IconButton
        backgroundColor='red.500'
        icon={<Icon
          as={AntDesign}
          color='white'
          name='closecircleo' />
        }
        onPress={onRemove}
        style={styles.button}
      />
    )}
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        alt='photo'
        size={100}
        source={{ uri }}
        style={style}
      />
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    top: 3,
    right: 3,
    width: 30,
    zIndex: 1
  }
});

export default PhotoPreview;