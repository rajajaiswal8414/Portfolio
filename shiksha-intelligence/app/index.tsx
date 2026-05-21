import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { getPrimaryRole, UserRole } from '@/types/auth';
import type { Href } from 'expo-router';

/**
 * index.tsx — Pure routing. Zero setup logic.
 *
 * All bootstrapping (fonts, hydration, splash) is done in _layout.tsx.
 * By the time this renders, isHydrated is always true.
 */
export default function Index() {
  const { user, logout, isTokenExpired } = useAuthStore();

  // Not logged in
  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Token expired — logout and go to welcome
  if (isTokenExpired()) {
    logout();
    return <Redirect href="/(auth)/welcome" />;
  }

  const roleRoutes: Record<UserRole, Href> = {
    GUARDIAN:  '/(protected)/guardian',
    STUDENT:   '/(protected)/student/home',
    TEACHER:   '/(protected)/teacher/dashboard',
    ADMIN:     '/(protected)/admin',
    PRINCIPAL: '/(protected)/principal',
    GUARD:     '/(protected)/guard',
  };

  const primaryRole = getPrimaryRole(user);
  const destination = roleRoutes[primaryRole] ?? '/home';

  return <Redirect href={destination} />;
}