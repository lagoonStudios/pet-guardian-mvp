import { Button as PaperButton } from 'react-native-paper';

import { type ButtonProps } from './Button.types';

export function Button({
  style,
  labelStyle,
  contentStyle,
  styles,
  mode = 'contained',
  ...props
}: ButtonProps) {
  return (
    <PaperButton
      {...props}
      mode={mode}
      style={[style, styles?.container]}
      labelStyle={[labelStyle, styles?.label]}
      contentStyle={[contentStyle, styles?.content]}
    />
  );
}
