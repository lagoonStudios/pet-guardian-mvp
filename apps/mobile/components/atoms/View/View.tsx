import { Surface } from 'react-native-paper';

import { getViewStyles } from './View.styles';
import { type ViewProps } from './View.types';

export function View({ children, style, styles, elevation = 0, ...props }: ViewProps) {
  const componentStyles = getViewStyles({ style, styles });

  return (
    <Surface {...props} elevation={elevation} style={componentStyles.container}>
      {children}
    </Surface>
  );
}
