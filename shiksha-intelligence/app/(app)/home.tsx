import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { ROLE_LABELS, ROLE_ICONS, getPrimaryRole } from '@/types/auth';
import { LogOut, AlertTriangle } from 'lucide-react-native';

/**
 * Generic fallback screen for:
 * - Unknown or unsupported roles
 * - Maintenance mode
 * - Manual navigation to a portal the user doesn't own
 */
export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.emoji}>🔒</Text>
          <Text style={styles.title}>Not Signed In</Text>
        </View>
      </SafeAreaView>
    );
  }

  const role  = getPrimaryRole(user);
  const label = role ? ROLE_LABELS[role] : 'Unknown';
  const icon  = role ? ROLE_ICONS[role]  : '❓';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.warnIcon}>
          <AlertTriangle size={28} color="#F59E0B" />
        </View>

        <Text style={styles.emoji}>{icon}</Text>
        <Text style={styles.title}>Portal Unavailable</Text>
        <Text style={styles.sub}>
          Your role <Text style={styles.rolePill}>{label}</Text> does not have an assigned
          portal yet, or you navigated to a restricted area.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Signed in as</Text>
          <Text style={styles.infoValue}>{user.name}</Text>
          <Text style={styles.infoMeta}>@{user.username} · {user.email}</Text>
        </View>

        <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.8}>
          <LogOut size={16} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#F8FAFC' },
  center:     { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  warnIcon:   { backgroundColor: '#FEF3C7', padding: 14, borderRadius: 24, marginBottom: 12 },
  emoji:      { fontSize: 48, marginBottom: 8 },
  title:      { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#0F172A', textAlign: 'center' },
  sub:        { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  rolePill:   { fontFamily: 'Inter_600SemiBold', color: '#6366F1' },
  infoCard:   { backgroundColor: '#FFF', borderRadius: 18, padding: 18, marginTop: 24, width: '100%', borderWidth: 1, borderColor: '#F1F5F9', alignItems: 'center' },
  infoLabel:  { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  infoValue:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 18, color: '#0F172A', marginTop: 4 },
  infoMeta:   { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#94A3B8', marginTop: 4 },
  logoutBtn:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FEF2F2', borderRadius: 100, paddingHorizontal: 24, paddingVertical: 14, marginTop: 24, borderWidth: 1, borderColor: '#FECACA' },
  logoutText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#EF4444' },
});