import { StyleSheet } from 'react-native';

import { Card, Text, View } from '@/components/atoms';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text type="title">Explore</Text>
      <Card title="Atoms in place" subtitle="Using React Native Paper">
        <Text>
          This screen now uses atoms and no longer depends on Expo starter scaffold components.
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});
