import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { images } from '@/constants/images';
import { loginUser } from '@/services/auth';
import { useAuthStore } from '@/store/authStore';
import { AuthUser, UserRole } from '@/types/auth';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_WIDTH * 0.85;

export default function LoginScreen() {
  const { login } = useAuthStore();

  const [username,        setUsername]        = useState('');
  const [password,        setPassword]        = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState<string | null>(null);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await loginUser({ username: username.trim(), password });

      const dto = data.userDetailsDto;

      // Normalise roles — backend sends strings, we cast to UserRole[]
      const roles = (dto.roles ?? []).map((r: string) =>
        r.toUpperCase() as UserRole,
      );

      const user: AuthUser = {
        id:             dto.id,
        name:           dto.name,
        username:       dto.username,
        email:          dto.email,
        roles,
        // Store expiry as unix ms so we can check it later
        tokenExpiresAt: Date.now() + (data.expiresIn ?? 3600) * 1000,
      };

      await login(user, {
        accessToken:  data.accessToken,
        refreshToken: data.refreshToken,
      });

      // index.tsx handles role-based routing — just go to root
      router.replace('/');
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        {/* Hero illustration */}
        <Image
          source={images.onboardingIllustration}
          style={styles.hero}
          resizeMode="cover"
        />

        {/* Bottom sheet */}
        <View className="flex-1 bg-background-card rounded-t-3xl -mt-6 px-6 pt-8">
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <Text className="text-neutral-500 text-base">← Back</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-display text-center leading-tight mt-2">
            Sign In
          </Text>

          {/* Subtitle */}
          <Text className="text-body text-center text-neutral-500 mt-3 mb-6">
            Enter your credentials to access{'\n'}your school portal.
          </Text>

          {/* Error banner */}
          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️  {error}</Text>
            </View>
          )}

          {/* Username */}
          <View className="mb-4">
            <Text className="text-label text-neutral-500 mb-2 ml-1">
              Username / Employee ID
            </Text>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>👤</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-6">
            <Text className="text-label text-neutral-500 mb-2 ml-1">
              Password
            </Text>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>🔒</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                style={[styles.textInput, { flex: 1 }]}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible((v) => !v)}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text className="text-neutral-400">
                  {passwordVisible ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot password */}
          <TouchableOpacity activeOpacity={0.7} className="items-end -mt-4 mb-6">
            <Text className="text-secondary font-body-medium text-sm">
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View className="flex-1" />

          {/* Sign In button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.9}
            disabled={loading}
            style={[styles.signInBtn, loading && { opacity: 0.7 }]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-body-semibold text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  hero: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#0F172A',
    padding: 0,
    margin: 0,
  },
  signInBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 100,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 8,
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#DC2626',
  },
});
