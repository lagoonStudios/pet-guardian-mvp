import { StyleSheet } from 'react-native';

import { Card, SafeAreaView, Text } from "@/components/atoms";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text type="title">Explore</Text>
      <Card title="Atoms in place" subtitle="Using React Native Paper">
        <Text>
          This screen now uses atoms and no longer depends on Expo starter scaffold components.
        </Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});
