import { Stack as ExpoStack } from 'expo-router';

export default function Stack() {
  return (
    <ExpoStack
      initialRouteName="sell"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExpoStack.Screen name="sell" />
      {/* <ExpoStack.Screen name="(tabs)" /> */}
      <ExpoStack.Screen name="checkout" />
      <ExpoStack.Screen name="+not-found" />
    </ExpoStack>
  );
}
