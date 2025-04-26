import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Text, useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
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

export const OptionSection: React.FC<OptionSectionProps> = ({ title, options, selectedOption, onOptionSelect }) => {
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
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, selectedOption === option.id && styles.optionSelected]}
              onPress={() => onOptionSelect(option.id)}
            >
              <IconComponent
                size={24}
                color={selectedOption === option.id ? theme['text-primary-color'] : theme['text-hint-color']}
              />
              <Text
                category="p1"
                style={[styles.optionText, selectedOption === option.id && styles.optionTextSelected]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  section: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: 'background-basic-color-1',
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'border-basic-color-5',
    backgroundColor: 'background-basic-color-1',
  },
  optionSelected: {
    borderColor: 'border-primary-color-1',
    backgroundColor: 'color-primary-100',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    color: 'text-hint-color',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: 'text-primary-color',
  },
});
