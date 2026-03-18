import { TextInput as PaperTextInput } from 'react-native-paper';

import { type TextareaProps } from './Textarea.types';

export function Textarea({
  style,
  contentStyle,
  outlineStyle,
  styles,
  mode = 'outlined',
  numberOfLines = 4,
  ...props
}: TextareaProps) {
  return (
    <PaperTextInput
      {...props}
      multiline
      mode={mode}
      numberOfLines={numberOfLines}
      style={[style, styles?.container]}
      contentStyle={[contentStyle, styles?.content]}
      outlineStyle={[outlineStyle, styles?.outline]}
    />
  );
}
