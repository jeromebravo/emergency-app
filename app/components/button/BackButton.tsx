import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { colors } from '../../constants';
import { useAppNavigation } from '../../hooks';

interface BackButtonProps {
  style?: ViewStyle
}

const BackButton: React.FC<BackButtonProps> = ({ style }) => {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={style}
    >
      <MaterialCommunityIcons
        color={colors.black}
        name='keyboard-backspace'
        size={30}
      />
    </TouchableOpacity>
  );
}

export default BackButton;