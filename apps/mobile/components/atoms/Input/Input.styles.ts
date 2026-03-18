import { type InputProps } from './Input.types';

type InputStyleParams = Pick<InputProps, 'style' | 'contentStyle' | 'outlineStyle' | 'styles'>;

export function getInputStyles({ style, contentStyle, outlineStyle, styles }: InputStyleParams) {
  return {
    container: [style, styles?.container],
    content: [contentStyle, styles?.content],
    outline: [outlineStyle, styles?.outline],
  };
}
