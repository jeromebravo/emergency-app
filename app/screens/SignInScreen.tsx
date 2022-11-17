import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Center,
  Divider,
  Image,
  Input,
  Text,
  useToast,
  VStack
} from 'native-base';

import { errorToast } from '../constants';
import { useAppNavigation } from '../hooks';
import { loginWithEmailAndPassword } from '../services/auth';
import { AuthRoutes } from '../interfaces/Routes';

import Link from '../components/Link';
import ScrollView from '../components/ScrollView';
import { FacebookButton, GoogleButton } from '../components/button';

const SignInScreen: React.FC = () => {
  const navigation = useAppNavigation<AuthRoutes>();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.show({ description: 'Fill all the fields', ...errorToast });
      return;
    }

    setLoading(true);
    await loginWithEmailAndPassword(email, password, () => {
      toast.show({ description: 'Incorrect email or password', ...errorToast });
      setLoading(false);
    });
    setLoading(false);
  }

  return (
    <ScrollView style={styles.screen}>
      <Center>
        <Image
          alt='help image'
          size={200}
          source={require('../assets/collab.png')}
        />
        <Text fontSize={16}>Barangay Mulawin</Text>
        <Text fontSize={16}>Emergency App</Text>
      </Center>

      <Center style={{ marginVertical: 40 }}>
        <Text fontSize={30}>Sign In</Text>
        <View style={styles.row}>
          <Text style={{ marginRight: 3 }}>Not a member?</Text>
          <Link onPress={() => navigation.navigate('Register')}>Sign up</Link>
        </View>
      </Center>

      <VStack space={3}>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          secureTextEntry
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
        />
        <Button
          disabled={loading}
          onPress={handleLogin}
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </VStack>

      {/* <Center style={styles.divider}>
        <Divider />
        <Text style={{ marginHorizontal: 10 }}>Or</Text>
        <Divider />
      </Center>

      <Center marginBottom={5}>
        <FacebookButton text='in' />
        <GoogleButton text='in' />
      </Center> */}
    </ScrollView>
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

export default SignInScreen;