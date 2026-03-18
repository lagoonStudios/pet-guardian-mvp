import { TextInput as PaperTextInput } from 'react-native-paper';

import { getInputStyles } from './Input.styles';
import { type InputProps } from './Input.types';

export function Input({
  style,
  contentStyle,
  outlineStyle,
  underlineStyle,
  styles,
  mode = 'outlined',
  ...props
}: InputProps) {
  const componentStyles = getInputStyles({
    style,
    contentStyle,
    outlineStyle,
    underlineStyle,
    styles,
  });

  return (
    <PaperTextInput
      {...props}
      mode={mode}
      style={componentStyles.container}
      contentStyle={componentStyles.content}
      outlineStyle={mode === 'outlined' ? componentStyles.outline : undefined}
      underlineStyle={mode === 'flat' ? componentStyles.underline : undefined}
    />
  );
}
