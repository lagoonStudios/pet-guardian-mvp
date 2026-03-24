import { type TextInputProps as PaperTextInputProps } from 'react-native-paper';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export interface TextareaProps
  extends Omit<PaperTextInputProps, 'style' | 'contentStyle' | 'outlineStyle' | 'multiline'> {
  /**
   * Style applied to textarea text.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style applied to textarea content wrapper.
   */
  contentStyle?: StyleProp<TextStyle>;
  /**
   * Style applied to textarea outline.
   */
  outlineStyle?: StyleProp<ViewStyle>;
  /**
   * Style applied to textarea underline.
   */
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for textarea subparts.
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
