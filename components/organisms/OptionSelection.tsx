import React from 'react';
import { View, Platform } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';
import OptionSelectionItem, { Option } from '../molecules/OptionSelectionItem';

interface OptionSectionProps {
  title: string;
  options: Option[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export const OptionSection: React.FC<OptionSectionProps> = ({ title, options, selectedOption, onOptionSelect }) => {
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <View style={styles.section}>
      <Text category="h6" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <OptionSelectionItem
            key={option.id}
            option={option}
            selectedOption={selectedOption}
            onOptionSelect={onOptionSelect}
          />
        ))}
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
});
