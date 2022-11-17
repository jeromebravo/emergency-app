import React from 'react';
import { Image, Text } from 'native-base';

const AskForHelp: React.FC = () => (
  <>
    <Image
      alt='ask for help'
      source={require('../../assets/ask-for-help.png')}
      size={250}
    />
    <Text
      fontSize={18}
      fontWeight='bold'
      marginY={5}
    >
      ASK FOR HELP
    </Text>
    <Text textAlign='center'>
      Help is on the way! Simply click on the "I need help" button and choose the profession category you need. 
    </Text>
  </>
);

export default AskForHelp;