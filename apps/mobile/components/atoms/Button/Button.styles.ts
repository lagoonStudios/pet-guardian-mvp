import { type ButtonProps } from './Button.types';

type ButtonStyleParams = Pick<ButtonProps, 'style' | 'labelStyle' | 'contentStyle' | 'styles'>;

export function getButtonStyles({ style, labelStyle, contentStyle, styles }: ButtonStyleParams) {
  return {
    container: [style, styles?.container],
    label: [labelStyle, styles?.label],
    content: [contentStyle, styles?.content],
  };
}
