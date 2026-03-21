import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

import { SafeAreaView, Text } from "@/src/components/atoms";

export default function ModalScreen() {
  const { t } = useTranslation(["common"]);

  return (
    <SafeAreaView style={styles.container}>
      <Text type="title">{t(($) => $.screens.modal.title)}</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text type="link">{t(($) => $.screens.modal.goHome)}</Text>
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
