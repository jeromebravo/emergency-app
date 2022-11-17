import React from 'react';
import dayjs from 'dayjs';
import { Text, View } from 'native-base';

import RedeemRequest from '../interfaces/RedeemRequest';

interface RedeemRequestItemProps {
  redeemRequest: RedeemRequest;
}

const RedeemRequestItem: React.FC<RedeemRequestItemProps> = ({ redeemRequest }) => (
  <View marginBottom={5}>
    <Text>Request On: {dayjs(redeemRequest.createdAt).format('MMMM, D YYYY')}</Text>
    <Text>GCash Name: {redeemRequest.gcashName}</Text>
    <Text>GCash Number: {redeemRequest.gcashNumber}</Text>
    <Text>Points To Convert: {redeemRequest.pointsToConvert}</Text>
    <Text>To Receive: {redeemRequest.toReceive}</Text>
    <Text>Status: {redeemRequest.status === 'pending' ? 'Pending' : 'Sent'}</Text>
  </View>
);

export default RedeemRequestItem;