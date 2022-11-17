import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';

const useAppNavigation = <T extends ParamListBase>() => {
  return useNavigation<StackNavigationProp<T>>();
}

export default useAppNavigation;