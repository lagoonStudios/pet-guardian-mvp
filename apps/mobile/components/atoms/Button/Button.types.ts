import { type ButtonProps as PaperButtonProps } from 'react-native-paper';
import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

export interface ButtonProps
  extends Omit<PaperButtonProps, 'style' | 'labelStyle' | 'contentStyle'> {
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  styles?: {
    container?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    content?: StyleProp<ViewStyle>;
  };
}
