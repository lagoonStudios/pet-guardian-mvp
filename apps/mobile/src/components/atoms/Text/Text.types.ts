import { type StyleProp, type TextStyle } from 'react-native';
import { type TextProps as PaperTextProps } from 'react-native-paper';

export type TextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

export interface TextProps extends Omit<PaperTextProps<never>, 'style'> {
  /**
   * Text style variant.
   */
  type?: TextType;
  /**
   * Text style overrides.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Optional style overrides for text element subparts.
   */
  styles?: {
    /**
     * Style override for the text element.
     */
    text?: StyleProp<TextStyle>;
  };
}
