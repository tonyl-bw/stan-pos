import { Stack as ExpoStack } from 'expo-router';

export default function Stack() {
  return (
    <ExpoStack
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExpoStack.Screen name="(tabs)" />
      <ExpoStack.Screen name="checkout" />
      <ExpoStack.Screen name="+not-found" />
    </ExpoStack>
  );
}
