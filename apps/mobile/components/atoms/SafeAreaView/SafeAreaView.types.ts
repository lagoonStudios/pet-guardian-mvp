import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SafeAreaViewProps as NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface SafeAreaViewProps
  extends Omit<NativeSafeAreaViewProps, 'style' | 'children'> {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: {
    container?: StyleProp<ViewStyle>;
  };
}
