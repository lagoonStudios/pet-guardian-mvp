import { type ComponentProps, type ReactNode } from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { type StyleProp, type ViewStyle } from 'react-native';

type PaperCardTitleProps = ComponentProps<typeof PaperCard.Title>;

export interface CardProps {
  mode?: 'contained' | 'outlined' | 'elevated';
  title?: PaperCardTitleProps['title'];
  subtitle?: PaperCardTitleProps['subtitle'];
  left?: PaperCardTitleProps['left'];
  right?: PaperCardTitleProps['right'];
  children?: ReactNode;
  onPress?: () => void;
  testID?: string;
  accessible?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  styles?: {
    container?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
  };
}
