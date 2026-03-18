import { Button as PaperButton } from 'react-native-paper';

import { getButtonStyles } from './Button.styles';
import { type ButtonProps } from './Button.types';

export function Button({
  style,
  labelStyle,
  contentStyle,
  styles,
  mode = 'contained',
  ...props
}: ButtonProps) {
  const componentStyles = getButtonStyles({ style, labelStyle, contentStyle, styles });

  return (
    <PaperButton
      {...props}
      mode={mode}
      style={componentStyles.container}
      labelStyle={componentStyles.label}
      contentStyle={componentStyles.content}
    />
  );
}
