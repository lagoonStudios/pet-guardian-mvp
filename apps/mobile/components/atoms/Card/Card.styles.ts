import { type CardProps } from './Card.types';

type CardStyleParams = Pick<CardProps, 'style' | 'contentStyle' | 'styles'>;

export function getCardStyles({ style, contentStyle, styles }: CardStyleParams) {
  return {
    container: [style, styles?.container],
    content: [contentStyle, styles?.content],
  };
}
