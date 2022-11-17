import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Icon, Text, View } from 'native-base';

import User from '../interfaces/User';

interface SubAccountProps {
  user: User;
}

const SubAccount: React.FC<SubAccountProps> = ({ user }) => {
  return (
    <View
      flexDirection='row'
      py={3}
    >
      <Icon
        as={FontAwesome}
        color='blue.500'
        name='user'
        size={10}
      />

      <View style={{ marginLeft: 5 }}>
        <Text>Name: {`${user.firstName} ${user.lastName}`}</Text>
        <Text>Identification {`${user.identification}`}</Text>
        <Text>Status: {`${user.status}`}</Text>
      </View>
    </View>
  );
}

export default SubAccount;