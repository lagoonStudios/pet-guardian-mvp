import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SurfaceProps } from 'react-native-paper';

export interface ViewProps extends Omit<SurfaceProps, 'style' | 'children'> {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: {
    container?: StyleProp<ViewStyle>;
  };
}
