import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { Button, SafeAreaView, Text, View } from "@/components/atoms";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text type="title">Pet Guardian</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text type="subtitle">Home</Text>
        <Text>Starter scaffold removed. This screen now uses reusable Paper-based atoms.</Text>
      </View>
      <View style={styles.stepContainer}>
        <Link href="/modal">
          <Text type="link">Open modal</Text>
        </Link>
        <Link href="/style-guide" asChild>
          <Button mode="contained-tonal">Open style guide</Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  titleContainer: {
    gap: 6,
  },
  stepContainer: {
    gap: 8,
  },
});
