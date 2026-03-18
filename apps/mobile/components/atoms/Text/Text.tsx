import { Text as PaperText, useTheme } from 'react-native-paper';

import { textTypeStyles } from './Text.styles';
import { type TextProps } from './Text.types';

export function Text({ type = 'default', style, styles, ...props }: TextProps) {
  const theme = useTheme();

  return (
    <PaperText
      {...props}
      style={[
        textTypeStyles[type],
        type === 'link' ? { color: theme.colors.primary } : undefined,
        style,
        styles?.text,
      ]}
    />
  );
}
