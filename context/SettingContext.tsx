import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { THEME_STORAGE_KEY } from '@/constant/setting.constant';

// Theme types
type ThemeMode = 'light' | 'dark' | 'system';

// Settings context type definition
interface SettingsContextType {
  // Theme state
  themeMode: ThemeMode;
  isDarkMode: boolean;

  // Theme actions
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
}

// Create context with default values
const SettingsContext = createContext<SettingsContextType>({
  themeMode: 'system',
  isDarkMode: false,
  setThemeMode: () => {},
  toggleDarkMode: () => {},
});

// Provider component
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // Get device color scheme
  const deviceColorScheme = useColorScheme();

  // State
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Derived state - calculate if dark mode is active based on theme mode and system setting
  const isDarkMode =
    themeMode === 'system'
      ? deviceColorScheme === 'dark'
      : themeMode === 'dark';

  // Load saved theme settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedThemeMode) {
          setThemeModeState(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save theme settings when changed
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  }, []);

  // Toggle between light and dark mode (ignoring system)
  const toggleDarkMode = useCallback(() => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
  }, [isDarkMode, setThemeMode]);

  // Create context value
  const contextValue: SettingsContextType = {
    themeMode,
    isDarkMode,
    setThemeMode,
    toggleDarkMode,
  };

  // Don't render anything while loading settings
  if (isLoading) {
    return null;
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook for using the settings context
export const useSettings = () => useContext(SettingsContext);
