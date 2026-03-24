import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SurfaceProps } from 'react-native-paper';

export interface ViewProps extends Omit<SurfaceProps, 'style' | 'children'> {
  /**
   * Child content to render inside the view.
   */
  children?: ReactNode;
  /**
   * Style for the view container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for view components.
   */
  styles?: {
    /**
     * Container style override.
     */
    container?: StyleProp<ViewStyle>;
  };
}
