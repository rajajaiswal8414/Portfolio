import { Stack } from 'expo-router';

/** Shared Stack navigator for all (protected) portals. */
export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#F8FAFC' },
      }}
    />
  );
}
