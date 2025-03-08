import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { ChevronRight, Store, Receipt, Bell, Moon } from 'lucide-react-native';
import { useSettings } from '@/context/SettingContext';
import SettingGroupWrapper from '@/components/molecules/SettingGroupWrapper';
import SettingDarkModeSwitch from '@/components/atoms/SettingDarkModeSwitch';

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode } = useSettings();
  const settingsGroups = [
    {
      title: 'Business Settings',
      items: [
        { icon: Store, label: 'Store Information', hasChevron: true },
        { icon: Receipt, label: 'Receipt Settings', hasChevron: true },
      ],
    },
    {
      title: 'App Settings',
      items: [{ icon: Bell, label: 'Notifications', hasSwitch: true }],
    },
  ];

  const renderSettingsGroup = (group: any, index: number) => (
    <View key={index} style={styles.settingsGroup}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <View style={styles.groupItems}>
        {group.items.map((item: any, itemIndex: number) => (
          <Pressable key={itemIndex} style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <item.icon size={24} color="#007AFF" />
              <Text style={styles.settingsItemLabel}>{item.label}</Text>
            </View>
            {item.hasChevron && <ChevronRight size={20} color="#8E8E93" />}
            {item.hasSwitch && (
              <Switch
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor="#FFFFFF"
              />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {settingsGroups.map((group, index) => renderSettingsGroup(group, index))}
      <SettingGroupWrapper
        group={{
          title: 'Settings',
          items: [
            {
              icon: Moon,
              label: 'Dark Mode',
              hasSwitch: true,
              switchComponent: <SettingDarkModeSwitch />,
            },
          ],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 16,
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 16,
  },
  groupItems: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsItemLabel: {
    fontSize: 16,
    color: '#000000',
  },
});
