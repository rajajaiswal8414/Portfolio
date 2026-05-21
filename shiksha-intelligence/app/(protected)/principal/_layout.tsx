import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { canAccess } from '@/utils/roleGuard';

export default function PrincipalLayout() {
  const { user } = useAuthStore();

  if (!user || !canAccess(user.roles, ['PRINCIPAL'])) {
    return <Redirect href="/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
