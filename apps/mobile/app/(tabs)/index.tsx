import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from "react-i18next";

import { Button, SafeAreaView, Text, View } from "@/src/components/atoms";

export default function HomeScreen() {
  const { t } = useTranslation(["common"]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text type="title">{t(($) => $.screens.home.heading)}</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text type="subtitle">{t(($) => $.screens.home.sectionTitle)}</Text>
        <Text>{t(($) => $.screens.home.description)}</Text>
      </View>
      <View style={styles.stepContainer}>
        <Link href="/modal">
          <Text type="link">{t(($) => $.screens.home.openModal)}</Text>
        </Link>
        <Link href="/style-guide" asChild>
          <Button mode="contained-tonal">{t(($) => $.screens.home.openStyleGuide)}</Button>
        </Link>
        <Link href="/login" asChild>
          <Button mode="outlined">{t(($) => $.screens.home.openLogin)}</Button>
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
