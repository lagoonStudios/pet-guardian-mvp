import { type StyleProp, type TextStyle } from 'react-native';
import { type TextProps as PaperTextProps } from 'react-native-paper';

export type TextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

export interface TextProps extends Omit<PaperTextProps<never>, 'style'> {
  type?: TextType;
  style?: StyleProp<TextStyle>;
  styles?: {
    text?: StyleProp<TextStyle>;
  };
}
