import { type TextInputProps as PaperTextInputProps } from 'react-native-paper';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export interface TextareaProps
  extends Omit<PaperTextInputProps, 'style' | 'contentStyle' | 'outlineStyle' | 'multiline'> {
  style?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  styles?: {
    container?: StyleProp<TextStyle>;
    content?: StyleProp<TextStyle>;
    outline?: StyleProp<ViewStyle>;
  };
}
