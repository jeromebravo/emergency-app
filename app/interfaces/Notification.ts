export default interface Notification {
  createdAt: number;
  id: string;
  incidentId: string | null;
  seen: boolean;
  sentTo: string;
  victimId: string | null;
}