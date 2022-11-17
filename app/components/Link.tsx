import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from 'native-base';

import { colors } from '../constants';

interface LinkProps {
  onPress: () => void;
  style?: ViewStyle;
  children?: React.ReactNode | React.ReactNode[];
}

const Link: React.FC<LinkProps> = ({ children, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text
      color={colors.primary}
      underline
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export default Link;