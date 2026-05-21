import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { AuthUser, AuthTokens } from '@/types/auth';

const KEYS = {
  ACCESS_TOKEN:  'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER:          'user',
};

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isHydrated: boolean;

  /** Run once inside _layout.tsx — reads SecureStore and populates the store. */
  hydrate: () => Promise<void>;

  /** Called after a successful login API call. Persists to SecureStore + store. */
  login: (user: AuthUser, tokens: AuthTokens) => Promise<void>;

  /** Clears SecureStore + store, then redirects to welcome. */
  logout: () => Promise<void>;

  /** True when the stored token has passed its expiry timestamp. */
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isHydrated: false,

  hydrate: async () => {
    try {
      const [token, userJson] = await Promise.all([
        SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
        SecureStore.getItemAsync(KEYS.USER),
      ]);

      if (token && userJson) {
        const user: AuthUser = JSON.parse(userJson);

        // Token already expired — clear and stay logged out
        if (user.tokenExpiresAt && Date.now() > user.tokenExpiresAt) {
          await clearSecureStore();
          set({ user: null, accessToken: null, isHydrated: true });
          return;
        }

        set({ user, accessToken: token, isHydrated: true });
      } else {
        set({ user: null, accessToken: null, isHydrated: true });
      }
    } catch {
      // SecureStore failure — treat as logged out
      set({ user: null, accessToken: null, isHydrated: true });
    }
  },

  login: async (user: AuthUser, tokens: AuthTokens) => {
    await Promise.all([
      SecureStore.setItemAsync(KEYS.ACCESS_TOKEN,  tokens.accessToken),
      SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, tokens.refreshToken),
      SecureStore.setItemAsync(KEYS.USER,          JSON.stringify(user)),
    ]);
    set({ user, accessToken: tokens.accessToken });
  },

  logout: async () => {
    await clearSecureStore();
    set({ user: null, accessToken: null });
    router.replace('/(auth)/welcome');
  },

  isTokenExpired: () => {
    const { user } = get();
    if (!user?.tokenExpiresAt) return false;
    return Date.now() > user.tokenExpiresAt;
  },
}));

// ─── helpers ────────────────────────────────────────────────────────────────

async function clearSecureStore() {
  await Promise.all([
    SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
    SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
    SecureStore.deleteItemAsync(KEYS.USER),
  ]);
}
