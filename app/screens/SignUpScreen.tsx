import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Center, Divider, Image, Text } from 'native-base';

import { useAppNavigation } from '../hooks';
import { AuthRoutes } from '../interfaces/Routes';

import Link from '../components/Link';
import Screen from '../components/Screen';
import { FacebookButton, GoogleButton } from '../components/button';

const SignUpScreen: React.FC = () => {
  const navigation = useAppNavigation<AuthRoutes>();

  return (
    <Screen style={styles.screen}>
      <Center>
        <Image
          alt='help image'
          size={200}
          source={require('../assets/collab.png')}
        />
        <Text fontSize={16}>Help and Be Rewarded</Text>
      </Center>

      <Center style={{ marginVertical: 40 }}>
        <Text fontSize={30}>Sign Up</Text>
        <View style={styles.row}>
          <Text style={{ marginRight: 3 }}>Already a member?</Text>
          <Link onPress={() => navigation.navigate('SignIn')}>Sign in</Link>
        </View>
      </Center>

      <Center>
        <FacebookButton text='up' />
        <GoogleButton text='up' />
      </Center>

      <Center style={styles.divider}>
        <Divider />
        <Text style={{ marginHorizontal: 10 }}>Or</Text>
        <Divider />
      </Center>

      <Center>
        <Button
          onPress={() => navigation.navigate('Register')}
          style={styles.signUp}
        >
          <Text>Sign up with email</Text>
        </Button>
      </Center>
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    marginVertical: 40,
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row'
  },
  screen: {
    paddingHorizontal: 50
  },
  signUp: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: '100%'
  }
});

export default SignUpScreen;