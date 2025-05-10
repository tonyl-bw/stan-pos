import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { LucideIcon } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export interface Option {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OptionSelectionItemProps {
  option: Option;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export default function OptionSelectionItem({ option, selectedOption, onOptionSelect }: OptionSelectionItemProps) {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  const IconComponent = option.icon;
  return (
    <TouchableOpacity
      style={[styles.optionCard, selectedOption === option.id && styles.optionSelected]}
      onPress={() => onOptionSelect(option.id)}
    >
      <IconComponent
        size={24}
        color={selectedOption === option.id ? theme['text-primary-color'] : theme['text-hint-color']}
      />
      <Text category="p1" style={[styles.optionText, selectedOption === option.id && styles.optionTextSelected]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
}

const themedStyles = StyleService.create({
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
