import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type LazyScreenPropsType = NativeStackScreenProps<any, 'LazyScreen'> & {
  getComponent: () => Promise<any>;
  fallback?: any;
  renderScreenAfterInteraction?: boolean;
};
