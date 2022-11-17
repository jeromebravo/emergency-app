import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '../constants';

const Loading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size={50} color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default Loading;