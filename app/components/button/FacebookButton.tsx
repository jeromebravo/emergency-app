import React, { useEffect } from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';

import { signInWithFacebook } from '../../services/auth';

interface GoogleButtonProps {
  text: 'in' | 'up'
}

const FacebookButton: React.FC<GoogleButtonProps> = ({ text }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    androidClientId: '461840789026119',
    expoClientId: '461840789026119',
    iosClientId: '461840789026119',
    webClientId: '461840789026119'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      signInWithFacebook(access_token);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => promptAsync()}
      startIcon={<Icon as={AntDesign} name='facebook-square' size='md' />}
      style={{ backgroundColor: '#425796', marginBottom: 10, width: '100%' }}
    >
      {`Sign ${text} with Facebook`}
    </Button>
  );
}

export default FacebookButton;