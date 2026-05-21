import { Stack } from 'expo-router';

/** Layout for the generic fallback (app) group. */
export default function AppLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
