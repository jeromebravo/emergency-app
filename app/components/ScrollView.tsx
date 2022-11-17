import React from 'react';
import Constants from 'expo-constants';
import {
  ScrollView as DefaultScrollView,
  StyleSheet,
  View, 
  ViewStyle
} from 'react-native';

import { colors } from '../constants';

interface ScrollViewProps {
  style?: ViewStyle;
  children?: React.ReactNode | React.ReactNode[];
}

const ScrollView: React.FC<ScrollViewProps> = ({ children, style }) => (
  <View style={[styles.container, style]}>
    <DefaultScrollView showsVerticalScrollIndicator={false}>
      {children}
    </DefaultScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
    paddingTop: Constants.statusBarHeight + 25,
    paddingHorizontal: 50
  }
});

export default ScrollView;