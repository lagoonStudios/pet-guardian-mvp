import { type InputProps } from './Input.types';

type InputStyleParams = Pick<
  InputProps,
  'style' | 'contentStyle' | 'outlineStyle' | 'underlineStyle' | 'styles'
>;

export function getInputStyles({
  style,
  contentStyle,
  outlineStyle,
  underlineStyle,
  styles,
}: InputStyleParams) {
  return {
    container: [style, styles?.container],
    content: [contentStyle, styles?.content],
    outline: [outlineStyle, styles?.outline],
    underline: [underlineStyle, styles?.underline],
  };
}
