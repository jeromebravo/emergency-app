import React, { useState } from 'react';
import Constants from 'expo-constants';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  Center,
  Input,
  Text,
  useToast,
  VStack
} from 'native-base';

import { useAppNavigation } from '../hooks';
import { AuthRoutes } from '../interfaces/Routes';
import { errorToast } from '../constants';
import { registerWithEmailAndPassword } from '../services/auth';

import Link from '../components/Link';
import { BackButton } from '../components/button';

const RegisterScreen: React.FC = () => {
  const navigation = useAppNavigation<AuthRoutes>();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.show({ description: 'Fill all the fields', ...errorToast });
      return;
    }

    if (password.length < 6) {
      toast.show({ description: 'Password must be at least 6 characters long', ...errorToast });
      return;
    }

    if (password !== confirmPassword) {
      toast.show({ description: 'Password does not match', ...errorToast });
      return;
    }

    setLoading(true);
    await registerWithEmailAndPassword(email, password, () => {
      toast.show({ description: 'Email already exists', ...errorToast });
      setLoading(false);
    });
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <BackButton />        

      <Center style={styles.marginVertical}>
        <Text fontSize={30}>Sign Up</Text>
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
        <Input
          secureTextEntry
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          disabled={loading}
          onPress={handleRegister}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>
      </VStack>

      <Center style={styles.marginVertical}>
        <Text>Have an account?</Text>
        <Link onPress={() => navigation.navigate('SignIn')}>
          Sign in here
        </Link>
      </Center>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 40
  },
  scrollView: {
    marginTop: Constants.statusBarHeight + 25,
    paddingHorizontal: 50
  }
});

export default RegisterScreen;