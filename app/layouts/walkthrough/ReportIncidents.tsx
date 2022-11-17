import React from 'react';
import { Image, Text } from 'native-base';

const ReportIncidents: React.FC = () => (
  <>
    <Image
      alt='ask for help'
      source={require('../../assets/report-incidents.png')}
      size={250}
    />
    <Text
      fontSize={18}
      fontWeight='bold'
      marginY={5}
    >
      REPORT INCIDENTS
    </Text>
    <Text textAlign='center'>
      Incidents on sight? Report it on Emergency App. Simply click the "Report incident" button and fill the information needed. 
    </Text>
  </>
);

export default ReportIncidents;