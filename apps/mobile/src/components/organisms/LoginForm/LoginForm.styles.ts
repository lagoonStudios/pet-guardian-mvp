import { StyleSheet } from 'react-native';

export const getLoginFormStyles = () => {
  return StyleSheet.create({
    container: {
      gap: 16,
    },
    formCard: {
      padding: 8,
      gap: 12,
      height: 200,
    },
  });
};