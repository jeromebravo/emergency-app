export default interface RedeemRequest {
  createdAt: number;
  id: string;
  gcashName: string;
  gcashNumber: string;
  pointsToConvert: number;
  requestedBy: string;
  status: 'pending' | 'sent';
  toReceive: number;
}