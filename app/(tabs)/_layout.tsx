import { Tabs } from 'expo-router';
import { LayoutGrid, Settings } from 'lucide-react-native';
import { useTheme } from '@ui-kitten/components';
export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme['text-primary-color'],
        tabBarInactiveTintColor: theme['text-hint-color'],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme['border-basic-color-4'],
          backgroundColor: theme['background-basic-color-1'],
        },
        headerStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sell',
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
