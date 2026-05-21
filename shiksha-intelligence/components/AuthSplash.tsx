import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

/**
 * AuthSplash — shown while fonts are loading and the auth store is hydrating.
 * NOT a route. Rendered directly by _layout.tsx.
 */
export default function AuthSplash() {
  const opacity = useSharedValue(0.4);
  const scale   = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1,   { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,  // infinite
      false,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity:   opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrapper, animatedStyle]}>
        {/* Outer ring */}
        <View style={styles.outerRing}>
          <View style={styles.innerCircle}>
            <Text style={styles.emoji}>🎓</Text>
          </View>
        </View>
      </Animated.View>

      <Text style={styles.brand}>Shiksha Intelligence</Text>
      <Text style={styles.tagline}>School ERP & LMS Platform</Text>

      {/* Dot loader */}
      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <DotPulse key={i} delay={i * 220} />
        ))}
      </View>
    </View>
  );
}

function DotPulse({ delay }: { delay: number }) {
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1,    { duration: 500 }),
          withTiming(0.25, { duration: 500 }),
        ),
        -1,
        false,
      );
    }, delay);
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoWrapper: {
    marginBottom: 8,
  },
  outerRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 36,
  },
  brand: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.2,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#6366F1',
  },
});
