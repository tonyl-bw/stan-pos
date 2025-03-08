import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Toggle } from '@ui-kitten/components';

interface SettingGroupWrapperProps {
  group: {
    title: string;
    items: {
      icon: React.ElementType;
      label: string;
      hasChevron?: boolean;
      hasSwitch?: boolean;
      switchComponent?: React.ReactNode;
    }[];
  };
}

export default function SettingGroupWrapper(props: SettingGroupWrapperProps) {
  const { group } = props;
  return (
    <View style={styles.settingsGroup}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <View style={styles.groupItems}>
        {group.items.map((item, index) => (
          <Pressable style={styles.settingsItem} key={index}>
            <View style={styles.settingsItemLeft}>
              <item.icon size={24} color="#007AFF" />
              <Text style={styles.settingsItemLabel}>{item.label}</Text>
            </View>
            {item.hasChevron && <ChevronRight size={20} color="#8E8E93" />}
            {item.hasSwitch ? (
              item.switchComponent ? (
                item.switchComponent
              ) : (
                <Toggle />
              )
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
