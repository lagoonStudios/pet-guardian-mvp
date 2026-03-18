import { TextInput as PaperTextInput } from 'react-native-paper';

import { getTextareaStyles } from './Textarea.styles';
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
  const componentStyles = getTextareaStyles({ style, contentStyle, outlineStyle, styles });

  return (
    <PaperTextInput
      {...props}
      multiline
      mode={mode}
      numberOfLines={numberOfLines}
      style={componentStyles.container}
      contentStyle={componentStyles.content}
      outlineStyle={componentStyles.outline}
    />
  );
}
