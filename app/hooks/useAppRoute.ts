import { useRoute, RouteProp } from '@react-navigation/native';

import { Routes } from '../interfaces/Routes';

const useAppRoute = <T extends keyof Routes>(screenName: T) => {
  return useRoute<RouteProp<Routes, typeof screenName>>();
}

export default useAppRoute;