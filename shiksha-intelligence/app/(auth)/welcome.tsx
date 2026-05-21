import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { setAudioModeAsync } from "expo-audio";
import { router } from "expo-router";
import { VolumeOff, Volume2 } from "lucide-react-native";
import { loginUser } from "@/services/auth"
import { useAuthStore } from "@/store/authStore";
import { AuthUser, UserRole, normalizeRole, extractRoles } from "@/types/auth";

import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";


const SCHOOLS = [
  "St. Xavier's International",
  "Delhi Public School",
  "Kendriya Vidyalaya",
  "Ryan International",
  "The Heritage School",
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HERO_HEIGHT = SCREEN_WIDTH * 0.85;

export default function WelcomeScreen() {
  const { login } = useAuthStore();

  const [selectedSchool, setSelectedSchool] = useState(SCHOOLS[0]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const translateY = useSharedValue(0);

  const player = useVideoPlayer(
    require("@/assets/clips/login-hero.mp4"),
    (player) => {
      player.loop = true;

      player.play();

      player.muted = isMuted;
    }
  );

  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });
    }

    setupAudio();
  }, []);

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted]);

  function handleContinue() {
    setShowLogin(true);

    translateY.value = withTiming(-40, {
      duration: 500,
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  async function handleLogin() {
    try {
      setLoading(true);

      setError("");

      const data = await loginUser({
        username,
        password,
      });

      const dto = data.userDetailsDto;

      // dto.roles is clean (only role strings like ["ROLE_SCHOOL_ADMIN"]).
      // top-level data.roles is MIXED with permissions — do NOT use it directly.
      const roles = extractRoles(dto.roles ?? []);

      const user: AuthUser = {
        id:             dto.userId,                                   // backend: userId
        name:           [dto.firstName, dto.lastName].filter(Boolean).join(' ') || dto.username,
        username:       dto.username,
        email:          dto.email,
        roles,
        // JWT expiry — default 1 hour if backend doesn’t send expiresIn
        tokenExpiresAt: Date.now() + 60 * 60 * 1000,
      };

      await login(user, {
        accessToken:  data.accessToken,
        refreshToken: data.refreshToken,
      });

      // index.tsx handles role-based routing — redirect to root index
      router.replace("/");
    } catch (err: any) {
      console.log("=================================");
      console.log("FULL LOGIN ERROR");
      console.log(err);
      console.log("ERROR MESSAGE:", err?.message);
      console.log("=================================");

      setError(
        err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={["bottom"]}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* VIDEO HERO */}
          <VideoView
            player={player}
            style={styles.hero}
            contentFit="cover"
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            nativeControls={false}
          />

          {/* MUTE BUTTON */}
          <TouchableOpacity
            className={`absolute ${Platform.OS === "ios"
              ? "top-15 right-5"
              : "top-15 right-8"
              } z-50`}
            onPress={() =>
              setIsMuted((prev) => !prev)
            }
          >
            <View className="bg-white/15 rounded-full p-3">
              {isMuted ? (
                <VolumeOff color="white" />
              ) : (
                <Volume2 color="white" />
              )}
            </View>
          </TouchableOpacity>

          {/* BOTTOM SHEET */}
          <Animated.View
            style={[
              styles.bottomSheet,
              animatedStyle,
            ]}
          >
            {!showLogin ? (
              <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(200)}
                style={{ flex: 1 }}
              >
                {/* TITLE */}
                <Text className="text-4xl font-bold text-center text-primary leading-tight">
                  Welcome to Shiksha{"\n"}
                  Intelligence
                </Text>

                {/* SUBTITLE */}
                <Text className="text-base text-center text-neutral-500 mt-3 mb-6">
                  Empowering education through{"\n"}
                  intelligent insights.
                </Text>

                {/* SELECTOR */}
                <View className="relative">
                  <TouchableOpacity
                    onPress={() =>
                      setDropdownOpen((o) => !o)
                    }
                    activeOpacity={0.85}
                    style={styles.selector}
                  >
                    <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
                      <Text style={{ fontSize: 16 }}>
                        🎓
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-xs text-neutral-400 uppercase tracking-widest mb-0.5">
                        Select your school
                      </Text>

                      <Text className="text-base font-semibold text-primary">
                        {selectedSchool}
                      </Text>
                    </View>

                    <Text className="text-neutral-400 text-lg">
                      {dropdownOpen ? "▲" : "▾"}
                    </Text>
                  </TouchableOpacity>

                  {/* DROPDOWN */}
                  {dropdownOpen && (
                    <View style={styles.dropdown}>
                      {SCHOOLS.map((school) => (
                        <TouchableOpacity
                          key={school}
                          onPress={() => {
                            setSelectedSchool(
                              school
                            );

                            setDropdownOpen(
                              false
                            );
                          }}
                          style={
                            styles.dropdownItem
                          }
                        >
                          <Text>
                            {school}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={{ flex: 1 }} />

                {/* CONTINUE BUTTON */}
                <TouchableOpacity
                  onPress={handleContinue}
                  style={styles.continueBtn}
                  className="rounded-3xl!"
                >
                  <Text style={styles.buttonText}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View
                entering={SlideInDown.duration(
                  500
                )}
                style={{ flex: 1 }}
              >
                {/* BACK */}
                <TouchableOpacity
                  onPress={() => {
                    setShowLogin(false);

                    translateY.value =
                      withTiming(0, {
                        duration: 500,
                      });
                  }}
                >
                  <Text className="text-neutral-500 text-base mb-4">
                    ← Back
                  </Text>
                </TouchableOpacity>

                {/* TITLE */}
                <Text className="text-4xl font-bold text-center text-primary">
                  Sign In
                </Text>

                {/* SUBTITLE */}
                <Text className="text-base text-center text-neutral-500 mt-3 mb-6">
                  Enter your credentials
                </Text>

                {/* USERNAME */}
                <View style={styles.inputContainer}>
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    placeholderTextColor="#64748B"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>

                {/* PASSWORD */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      marginTop: 16,
                    },
                  ]}
                >
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#64748B"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.textInput}
                  />
                </View>

                {/* FORGOT PASSWORD */}
                <TouchableOpacity className="mt-2 flex w-full items-end px-2">
                  <Text className="text-blue-400">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                {/* ERROR */}
                {error ? (
                  <Text className="text-red-500 text-center mb-4">
                    {error}
                  </Text>
                ) : null}

                {/* LOGIN BUTTON */}
                <TouchableOpacity
                  style={styles.continueBtn}
                  className="rounded-3xl!"
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading
                      ? "Signing In..."
                      : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  hero: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },

  bottomSheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  dropdown: {
    position: "absolute",
    top: "110%",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    zIndex: 50,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 30,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical:
      Platform.OS === "ios" ? 16 : 1,
  },

  textInput: {
    fontSize: 15,
  },

  continueBtn: {
    backgroundColor: "#0F172A",
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});