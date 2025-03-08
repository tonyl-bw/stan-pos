import { useSettings } from '@/context/SettingContext';
import { Toggle } from '@ui-kitten/components';

export default function SettingDarkModeSwitch() {
  const { isDarkMode, toggleDarkMode } = useSettings();
  return <Toggle checked={isDarkMode} onChange={toggleDarkMode} />;
}
