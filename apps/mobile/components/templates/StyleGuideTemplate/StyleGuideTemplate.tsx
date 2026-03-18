import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Button, Card, Input, SafeAreaView, Text, Textarea, View } from "@/components/atoms";
import { styles } from './StyleGuideTemplate.styles';

export function StyleGuideTemplate() {
  const theme = useTheme();
  const [petName, setPetName] = useState('Milo');
  const [notes, setNotes] = useState('Friendly with kids. Needs medication reminders at 8 PM.');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text type="title">Style Guide</Text>
        <Text>
          Atom showcase built with React Native Paper. Use this screen to validate light and dark
          theme behavior while the design system evolves.
        </Text>

        <Card title="Text" subtitle="Typography variants">
          <View style={styles.section}>
            <Text type="title">Title text</Text>
            <Text type="subtitle">Subtitle text</Text>
            <Text>Default body text for longer content blocks.</Text>
            <Text type="defaultSemiBold">Semi-bold helper text</Text>
            <Text type="link">Link-styled text</Text>
          </View>
        </Card>

        <Card title="Buttons" subtitle="Available action variants">
          <View style={styles.section}>
            <Button mode="contained">Contained</Button>
            <Button mode="elevated">Elevated</Button>
            <Button mode="contained-tonal">Contained tonal</Button>
            <Button mode="outlined">Outlined</Button>
            <Button mode="text">Text</Button>
          </View>
        </Card>

        <Card title="Inputs" subtitle="Single-line field states">
          <View style={styles.section}>
            <Input label="Pet name" value={petName} onChangeText={setPetName} />
            <Input mode="flat" label="Flat input" placeholder="Flat variant" />
            <Input label="Error state" value="Missing vaccine date" error />
            <Input label="Disabled input" value="Read only" disabled />
          </View>
        </Card>

        <Card title="Textarea" subtitle="Multi-line field variants">
          <View style={styles.section}>
            <Textarea
              label="Care notes"
              value={notes}
              onChangeText={setNotes}
              numberOfLines={5}
            />
            <Textarea
              mode="flat"
              label="Flat textarea"
              placeholder="Add additional observations"
              numberOfLines={4}
            />
          </View>
        </Card>

        <Card title="Cards" subtitle="Surface and emphasis variants">
          <View style={styles.section}>
            <Card mode="contained" title="Contained card">
              <Text>Low-emphasis content section.</Text>
            </Card>
            <Card mode="outlined" title="Outlined card">
              <Text>Clear boundary for grouped information.</Text>
            </Card>
            <Card
              mode="elevated"
              title="Elevated card"
              subtitle="Default emphasis"
              left={() => (
                <MaterialDesignIcons
                  name="paw"
                  size={20}
                  color={theme.colors.primary}
                  style={styles.cardIcon}
                />
              )}>
              <Text>Useful for featured content or summaries.</Text>
            </Card>
          </View>
        </Card>

        <Card title="View" subtitle="Base surface atom">
          <View style={styles.section}>
            <View style={[styles.surfaceSample, { backgroundColor: theme.colors.surfaceVariant }]}>
              <Text type="defaultSemiBold">Surface sample</Text>
              <Text>Use `View` for themed content blocks and layouts.</Text>
            </View>
          </View>
        </Card>

        <Card title="SafeAreaView" subtitle="Inset-aware layout wrapper">
          <View style={styles.section}>
            <Text>
              This screen itself is wrapped in the `SafeAreaView` atom, so top insets are already
              applied through the shared atom API.
            </Text>
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  );
}
