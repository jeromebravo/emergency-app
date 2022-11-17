import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../constants';

interface ScreenProps {
  style?: ViewStyle;
  children?: React.ReactNode | React.ReactNode[];
}

const Screen: React.FC<ScreenProps> = ({ children, style }) => (
  <View style={[styles.screen, style]}>
    {<>{children}</>}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: Constants.statusBarHeight + 25,
    paddingHorizontal: 50
  }
});

export default Screen;