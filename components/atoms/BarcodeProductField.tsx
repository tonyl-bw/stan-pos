import { Input, useTheme } from '@ui-kitten/components';
import { Barcode } from 'lucide-react-native';
import { useState } from 'react';

export default function BarcodeProductField() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [_isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <Input
      placeholder="Scan product"
      value={searchText}
      onChangeText={setSearchText}
      onFocus={() => setIsSearchFocused(true)}
      onBlur={() => setIsSearchFocused(false)}
      status="primary"
      accessoryLeft={() => <Barcode size={20} color={theme['color-basic-600']} />}
      style={{
        flex: 1,
      }}
    />
  );
}
