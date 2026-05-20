import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { setAudioModeAsync } from "expo-audio";

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
  const [selectedSchool, setSelectedSchool] = useState(SCHOOLS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const translateY = useSharedValue(0);

  const player = useVideoPlayer(
    require("@/assets/clips/login-hero.mp4"),
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  function handleContinue() {
    setShowLogin(true);

    translateY.value = withTiming(-40, {
      duration: 500,
    });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });
    }

    setupAudio();
  }, []);



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        {/* Fixed Hero */}
        <VideoView
          player={player}
          style={styles.hero}
          contentFit="cover"
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          nativeControls={false}
        />

        {/* Animated Bottom Sheet */}
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
              {/* Title */}
              <Text className="text-display text-center leading-tight">
                Welcome to Shiksha{"\n"}Intelligence
              </Text>

              {/* Subtitle */}
              <Text className="text-body text-center text-neutral-500 mt-3 mb-6">
                Empowering education through{"\n"}intelligent insights.
              </Text>

              {/* Selector */}
              <View className="relative">
                <TouchableOpacity
                  onPress={() => setDropdownOpen((o) => !o)}
                  activeOpacity={0.85}
                  style={styles.selector}
                >
                  <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
                    <Text style={{ fontSize: 16 }}>🎓</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-label-sm text-neutral-400 uppercase tracking-widest mb-0.5">
                      Select your school
                    </Text>

                    <Text className="text-label-lg text-primary">
                      {selectedSchool}
                    </Text>
                  </View>

                  <Text className="text-neutral-400 text-lg">
                    {dropdownOpen ? "▲" : "▾"}
                  </Text>
                </TouchableOpacity>

                {dropdownOpen && (
                  <View style={styles.dropdown}>
                    {SCHOOLS.map((school) => (
                      <TouchableOpacity
                        key={school}
                        onPress={() => {
                          setSelectedSchool(school);
                          setDropdownOpen(false);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>{school}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={{ flex: 1 }} />

              <TouchableOpacity
                onPress={handleContinue}
                style={styles.continueBtn}
                className="rounded-3xl! "
              >
                <Text style={styles.buttonText}>
                  Continue
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View
              entering={SlideInDown.duration(500)}
              style={{ flex: 1 }}
            >
              {/* Back */}
              <TouchableOpacity
                onPress={() => {
                  setShowLogin(false);

                  translateY.value = withTiming(0, {
                    duration: 500,
                  });
                }}
              >
                <Text className="text-neutral-500 text-base mb-4">
                  ← Back
                </Text>
              </TouchableOpacity>

              {/* Title */}
              <Text className="text-display text-center">
                Sign In
              </Text>

              <Text className="text-body text-center text-neutral-500 mt-3 mb-6">
                Enter your credentials
              </Text>

              {/* Username */}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#64748B"

                  style={styles.textInput}
                />
              </View>

              {/* Password */}
              <View
                style={[
                  styles.inputContainer,
                  { marginTop: 16 },
                ]}
              >
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#64748B"
                  secureTextEntry
                  style={styles.textInput}
                />
              </View>

              <View style={{ flex: 1 }} />

              <TouchableOpacity style={styles.continueBtn} className="rounded-3xl!">
                <Text style={styles.buttonText}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
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
    paddingVertical: Platform.OS === "ios" ? 16 : 1
  },

  textInput: {
    fontSize: 15
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