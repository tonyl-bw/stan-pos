import { X } from 'lucide-react-native';

import {
  Input,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { Barcode } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

export default function BarcodeProductField() {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const handleClearSearch = () => {
    setSearchText('');
  };
  return (
    <Input
      placeholder="Scan product"
      value={searchText}
      onChangeText={setSearchText}
      onFocus={() => setIsSearchFocused(true)}
      onBlur={() => setIsSearchFocused(false)}
      status='primary'
      accessoryLeft={() => (
        <Barcode size={20} color={theme['color-basic-600']} />
      )}
      style={{
        flex: 1,
      }}
    />
  );
}

const themedStyles = StyleService.create({
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'text-basic-color',
    outlineStyle: 'none',
  },
});
