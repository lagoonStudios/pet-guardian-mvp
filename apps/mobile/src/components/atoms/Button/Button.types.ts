import { type ButtonProps as PaperButtonProps } from 'react-native-paper';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export interface ButtonProps
  extends Omit<PaperButtonProps, 'style' | 'labelStyle' | 'contentStyle'> {
  /**
   * Style for the button container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the button label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style for the button content wrapper.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Object containing optional style overrides for individual parts.
   */
  styles?: {
    /**
     * Container style override.
     */
    container?: StyleProp<ViewStyle>;
    /**
     * Label text style override.
     */
    label?: StyleProp<TextStyle>;
    /**
     * Content wrapper style override.
     */
    content?: StyleProp<ViewStyle>;
  };
}
