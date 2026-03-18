import { SafeAreaView as NativeSafeAreaView } from 'react-native-safe-area-context';

import { getSafeAreaViewStyles } from './SafeAreaView.styles';
import { type SafeAreaViewProps } from './SafeAreaView.types';

export function SafeAreaView({ children, style, styles, ...props }: SafeAreaViewProps) {
  const componentStyles = getSafeAreaViewStyles({ style, styles });

  return (
    <NativeSafeAreaView {...props} style={componentStyles.container}>
      {children}
    </NativeSafeAreaView>
  );
}
