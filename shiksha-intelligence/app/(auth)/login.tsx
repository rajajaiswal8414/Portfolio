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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { images } from "@/constants/images";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HERO_HEIGHT = SCREEN_WIDTH * 0.85;

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleLogin() {
    // TODO: connect to real auth
    console.log("Login with", { username, password });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        {/* ── Hero illustration (same as welcome) ── */}
        <Image
          source={images.onboardingIllustration}
          style={styles.hero}
          resizeMode="cover"
        />

        {/* ── Bottom sheet ── */}
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
            Enter your credentials to access{"\n"}your school portal.
          </Text>

          {/* ── Username field ── */}
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
                style={styles.textInput}
              />
            </View>
          </View>

          {/* ── Password field ── */}
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
                style={[styles.textInput, { flex: 1 }]}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible((v) => !v)}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text className="text-neutral-400">
                  {passwordVisible ? "🙈" : "👁️"}
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

          {/* Spacer */}
          <View className="flex-1" />

          {/* ── Sign In button ── */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.9}
            style={styles.signInBtn}
          >
            <Text className="text-base font-body-semibold text-white">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  hero: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#0F172A",
    padding: 0,
    margin: 0,
  },
  signInBtn: {
    backgroundColor: "#0F172A",
    borderRadius: 100,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 8,
  },
});
