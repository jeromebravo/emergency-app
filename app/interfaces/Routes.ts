import { NavigatorScreenParams } from '@react-navigation/native';
import { GeoPoint } from 'firebase/firestore';

export type AuthRoutes = {
  CompleteProfile: undefined;
  EntityRoutes: NavigatorScreenParams<EntityRoutes>;
  Register: undefined;
  SignIn: undefined;
  SignUp: undefined;
  UserRoutes: NavigatorScreenParams<UserRoutes>;
  Walkthrough: undefined;
}

export type EntityRoutes = {
  CreateSubAccount: undefined;
  Home: undefined;
  ViewSubAccounts: undefined;
}

export type UserRoutes = {
  FindNearMe: undefined;
  HelpPeople: undefined;
  IncidentsNearby: undefined;
  Home: undefined;
  MapView: {
    coordinates: GeoPoint;
  };
  NeedHelp: undefined;
  RedeemPoints: undefined;
  ReportIncident: undefined;
  Responder: undefined;
  Victim: undefined;
}

export type Routes = AuthRoutes & EntityRoutes & UserRoutes;