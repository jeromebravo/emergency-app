import React from 'react';
import { Image, Text } from 'native-base';

const HelpPeople: React.FC = () => (
  <>
    <Image
      alt='ask for help'
      source={require('../../assets/help-people.png')}
      size={250}
    />
    <Text
      fontSize={18}
      fontWeight='bold'
      marginY={5}
    >
      HELP PEOPLE
    </Text>
    <Text textAlign='center'>
      Get notified when people within your reach need a help.
    </Text>
  </>
);

export default HelpPeople;