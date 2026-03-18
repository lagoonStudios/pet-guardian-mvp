import { TextInput as PaperTextInput } from 'react-native-paper';

import { type InputProps } from './Input.types';

export function Input({
  style,
  contentStyle,
  outlineStyle,
  styles,
  mode = 'outlined',
  ...props
}: InputProps) {
  return (
    <PaperTextInput
      {...props}
      mode={mode}
      style={[style, styles?.container]}
      contentStyle={[contentStyle, styles?.content]}
      outlineStyle={[outlineStyle, styles?.outline]}
    />
  );
}
