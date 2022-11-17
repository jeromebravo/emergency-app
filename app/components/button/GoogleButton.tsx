import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { AntDesign } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';

import { signInWithGoogle } from '../../services/auth';

interface GoogleButtonProps {
  text: 'in' | 'up'
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ text }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId: '564540489400-79pbt6lmo3bnkrlocliq111dn5382eb9.apps.googleusercontent.com',
      expoClientId: '564540489400-9t1n0uhjv3t7mfgqcloj8njmlkfk3sct.apps.googleusercontent.com',
      iosClientId: '564540489400-244p6kn3htdqfsvsj2nbaomjv1varo14.apps.googleusercontent.com',
      webClientId: '564540489400-jdjgffojn56896em8bu7tdbvfajln1lb.apps.googleusercontent.com'
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      signInWithGoogle(id_token);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      onPress={() => promptAsync()}
      startIcon={<Icon as={AntDesign} name='google' size='md' />}
      style={{ backgroundColor: '#5584F0', width: '100%' }}
    >
      {`Sign ${text} with Google`}
    </Button>
  );
}

export default GoogleButton;