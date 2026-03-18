import { type ViewProps } from './View.types';

type ViewStyleParams = Pick<ViewProps, 'style' | 'styles'>;

export function getViewStyles({ style, styles }: ViewStyleParams) {
  return {
    container: [style, styles?.container],
  };
}
