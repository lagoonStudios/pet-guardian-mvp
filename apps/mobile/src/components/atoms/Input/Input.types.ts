import { type TextInputProps as PaperTextInputProps } from 'react-native-paper';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export interface InputProps
  extends Omit<PaperTextInputProps, 'style' | 'contentStyle' | 'outlineStyle'> {
  /**
   * Style for the input text.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style for the input content wrapper.
   */
  contentStyle?: StyleProp<TextStyle>;
  /**
   * Style for the input outline.
   */
  outlineStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the input underline.
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for input subparts.
   */
  styles?: {
    /**
     * Container style override.
     */
    container?: StyleProp<TextStyle>;
    /**
     * Content style override.
     */
    content?: StyleProp<TextStyle>;
    /**
     * Outline style override.
     */
    outline?: StyleProp<ViewStyle>;
    /**
     * Underline style override.
     */
    underline?: StyleProp<ViewStyle>;
  };
}
