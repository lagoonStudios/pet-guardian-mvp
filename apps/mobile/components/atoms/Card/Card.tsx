import {
  Card as PaperCard,
} from 'react-native-paper';

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
  return (
    <PaperCard
      mode={mode}
      onPress={onPress}
      testID={testID}
      accessible={accessible}
      style={[style, styles?.container]}>
      {(title || subtitle || left || right) && (
        <PaperCard.Title title={title} subtitle={subtitle} left={left} right={right} />
      )}
      <PaperCard.Content style={[contentStyle, styles?.content]}>{children}</PaperCard.Content>
    </PaperCard>
  );
}
