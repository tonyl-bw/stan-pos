import { Stack as ExpoStack } from 'expo-router';

export default function Stack() {
  return (
    <ExpoStack
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExpoStack.Screen name="+not-found" />
    </ExpoStack>
  );
}
