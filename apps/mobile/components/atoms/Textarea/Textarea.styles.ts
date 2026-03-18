import { type TextareaProps } from './Textarea.types';

type TextareaStyleParams = Pick<
  TextareaProps,
  'style' | 'contentStyle' | 'outlineStyle' | 'underlineStyle' | 'styles'
>;

export function getTextareaStyles({
  style,
  contentStyle,
  outlineStyle,
  underlineStyle,
  styles,
}: TextareaStyleParams) {
  return {
    container: [style, styles?.container],
    content: [contentStyle, styles?.content],
    outline: [outlineStyle, styles?.outline],
    underline: [underlineStyle, styles?.underline],
  };
}
