import { type SafeAreaViewProps } from './SafeAreaView.types';

type SafeAreaViewStyleParams = Pick<SafeAreaViewProps, 'style' | 'styles'>;

export function getSafeAreaViewStyles({ style, styles }: SafeAreaViewStyleParams) {
  return {
    container: [style, styles?.container],
  };
}
