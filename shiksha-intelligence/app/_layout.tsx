import '@/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { useAuthStore } from '@/store/authStore';
import { queryClient } from '@/lib/queryClient';
import AuthSplash from '@/components/AuthSplash';

SplashScreen.preventAutoHideAsync();

/**
 * _layout.tsx = App Bootstrap Layer
 *
 * Responsibilities (in order):
 *  1. Load custom fonts
 *  2. Hydrate auth store from SecureStore
 *  3. Hide native splash screen
 *  4. Show branded AuthSplash while bootstrapping
 *  5. Wrap everything in QueryClientProvider
 *  6. Mount the Stack navigator
 *
 * index.tsx ONLY routes — it never does setup.
 */
export default function RootLayout() {
  const { hydrate, isHydrated } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hydrate auth store, then hide the native splash
      hydrate().finally(() => SplashScreen.hideAsync());
    }
  }, [fontsLoaded]);

  // Show branded splash until fonts + auth store are both ready
  if (!fontsLoaded || !isHydrated) {
    return <AuthSplash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </QueryClientProvider>
  );
}