import { type TextareaProps } from './Textarea.types';

type TextareaStyleParams = Pick<TextareaProps, 'style' | 'contentStyle' | 'outlineStyle' | 'styles'>;

export function getTextareaStyles({ style, contentStyle, outlineStyle, styles }: TextareaStyleParams) {
  return {
    container: [style, styles?.container],
    content: [contentStyle, styles?.content],
    outline: [outlineStyle, styles?.outline],
  };
}
