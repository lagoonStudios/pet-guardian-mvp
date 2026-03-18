import {
  Card as PaperCard,
} from 'react-native-paper';

import { getCardStyles } from './Card.styles';
import { type CardProps } from './Card.types';

export function Card({
  title,
  subtitle,
  left,
  right,
  children,
  mode = 'elevated',
  onPress,
  testID,
  accessible,
  style,
  contentStyle,
  styles,
}: CardProps) {
  const componentStyles = getCardStyles({ style, contentStyle, styles });

  return (
    <PaperCard
      mode={mode}
      onPress={onPress}
      testID={testID}
      accessible={accessible}
      style={componentStyles.container}>
      {(title || subtitle || left || right) && (
        <PaperCard.Title title={title} subtitle={subtitle} left={left} right={right} />
      )}
      <PaperCard.Content style={componentStyles.content}>{children}</PaperCard.Content>
    </PaperCard>
  );
}
