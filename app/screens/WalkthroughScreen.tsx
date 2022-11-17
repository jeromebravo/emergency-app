import React, { useState } from 'react';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { Button, View, VStack } from 'native-base';

import { AuthRoutes } from '../interfaces/Routes';
import { useAppNavigation } from '../hooks';

import Screen from '../components/Screen';
import { AskForHelp, HelpPeople, ReportIncidents } from '../layouts/walkthrough';

const WalkthroughScreen: React.FC = () => {
  const navigation = useAppNavigation<AuthRoutes>();

  const [index, setIndex] = useState(0);

  return (
    <Screen style={styles.screen}>
      <View
        alignItems='center'
        flex='1'
        justifyContent='center'
      >
        {index === 0 && <AskForHelp />}
        {index === 1 && <ReportIncidents />}
        {index === 2 && <HelpPeople />}
      </View>

      {index < 2 ? (
        <VStack space={3}>
          <Button
            padding={4}
            onPress={() => setIndex(index + 1)}
          >
            Next
          </Button>

          <Button
            padding={4}
            variant='ghost'
            onPress={() => navigation.replace('UserRoutes', { screen: 'Home' })}
          >
            Skip
          </Button>
        </VStack>
      ) : (
        <Button
          padding={4}
          onPress={() => navigation.replace('UserRoutes', { screen: 'Home' })}
        >
          Get Started
        </Button>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: Constants.statusBarHeight
  }
});

export default WalkthroughScreen;