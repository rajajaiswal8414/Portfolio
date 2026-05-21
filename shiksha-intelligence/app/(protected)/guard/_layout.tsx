import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { canAccess } from '@/utils/roleGuard';

export default function GuardLayout() {
  const { user } = useAuthStore();

  if (!user || !canAccess(user.roles, ['GUARD'])) {
    return <Redirect href="/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
