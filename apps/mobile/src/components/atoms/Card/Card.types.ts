import { type ComponentProps, type ReactNode } from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { type StyleProp, type ViewStyle } from 'react-native';

type PaperCardTitleProps = ComponentProps<typeof PaperCard.Title>;

export interface CardProps {
  /**
   * The display mode for the card component.
   */
  mode?: 'contained' | 'outlined' | 'elevated';
  /**
   * Optional title text for the card.
   */
  title?: PaperCardTitleProps['title'];
  /**
   * Optional subtitle text for the card.
   */
  subtitle?: PaperCardTitleProps['subtitle'];
  /**
   * Optional left element renderer for the card header.
   */
  left?: PaperCardTitleProps['left'];
  /**
   * Optional right element renderer for the card header.
   */
  right?: PaperCardTitleProps['right'];
  /**
   * Content rendered inside the card.
   */
  children?: ReactNode;
  /**
   * Press handler for the card.
   */
  onPress?: () => void;
  /**
   * Test identifier for testing tools.
   */
  testID?: string;
  /**
   * Accessibility flag to denote a touch target.
   */
  accessible?: boolean;
  /**
   * Style for the card container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the card content wrapper.
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Optional style overrides for card subparts.
   */
  styles?: {
    /**
     * Styles container override.
     */
    container?: StyleProp<ViewStyle>;
    /**
     * Styles content override.
     */
    content?: StyleProp<ViewStyle>;
  };
}
