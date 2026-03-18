import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { SafeAreaView, Text } from "@/components/atoms";

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text type="title">This is a modal</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text type="link">Go to home screen</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
