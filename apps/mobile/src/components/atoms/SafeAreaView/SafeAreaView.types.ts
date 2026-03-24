import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SafeAreaViewProps as NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface SafeAreaViewProps
  extends Omit<NativeSafeAreaViewProps, 'style' | 'children'> {
  /**
   * Child content inside the safe area.
   */
  children?: ReactNode;
  /**
   * Style for the safe area container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for safe area subparts.
   */
  styles?: {
    /**
     * Container style override.
     */
    container?: StyleProp<ViewStyle>;
  };
}
