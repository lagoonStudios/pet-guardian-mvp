import { StyleSheet, type TextStyle } from 'react-native';
import { type TextType } from './Text.types';

export const textTypeStyles = StyleSheet.create<Record<TextType, TextStyle>>({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
  },
});
