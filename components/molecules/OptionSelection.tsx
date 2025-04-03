import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  useTheme,
  useStyleSheet,
  StyleService,
} from '@ui-kitten/components';
import { LucideIcon } from 'lucide-react-native';

interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OptionSectionProps {
  title: string;
  options: Option[];
  selectedOption: string;
  onOptionSelect: (optionId: string) => void;
}

export const OptionSection: React.FC<OptionSectionProps> = ({
  title,
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <View style={styles.section}>
      <Text category="h6" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <Card
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.optionSelected,
              ]}
              onPress={() => onOptionSelect(option.id)}
            >
              <View
                style={{
                  alignSelf: 'center',
                }}
              >
                <IconComponent
                  size={24}
                  color={
                    selectedOption === option.id
                      ? theme['text-primary-color']
                      : theme['text-hint-color']
                  }
                />
              </View>
              <Text
                category="s1"
                style={[
                  styles.optionText,
                  selectedOption === option.id && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Card>
          );
        })}
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
  },
  optionSelected: {
    borderColor: 'border-basic-color-4',
    backgroundColor: 'background-basic-color-1',
  },
  optionText: {
    color: 'text-hint-color',
    marginTop: 8,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#007AFF',
  },
});
