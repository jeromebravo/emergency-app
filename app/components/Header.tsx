import React from 'react';
import { Center, Text } from 'native-base';

const Header: React.FC = () => (
  <Center style={{ marginBottom: 40 }}>
    <Text
      fontWeight='bold'
      style={{ marginBottom: 40 }}
    >
      EMERGENCY APP
    </Text>

    <Text>
      Hello, how can I help you today?
    </Text>
  </Center>
);

export default Header;