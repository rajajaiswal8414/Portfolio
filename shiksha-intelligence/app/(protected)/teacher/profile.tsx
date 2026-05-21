import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { LogOut } from 'lucide-react-native';
import { ROLE_LABELS, ROLE_ICONS, getPrimaryRole } from '@/types/auth';

export default function TeacherProfile() {
  const { user, logout } = useAuthStore();
  if (!user) return null;

  const role  = getPrimaryRole(user);
  const label = ROLE_LABELS[role];
  const icon  = ROLE_ICONS[role];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 48 }}>{icon}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{label}</Text>
        </View>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.divider} />
        <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.8}>
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#F8FAFC' },
  content:    { flex: 1, alignItems: 'center', paddingTop: 48, paddingHorizontal: 24 },
  avatar:     { width: 96, height: 96, borderRadius: 48, backgroundColor: '#D1FAE5', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  name:       { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#0F172A' },
  username:   { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#94A3B8', marginTop: 2 },
  badge:      { backgroundColor: '#D1FAE5', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginTop: 10 },
  badgeText:  { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#10B981' },
  email:      { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#64748B', marginTop: 10 },
  divider:    { width: '100%', height: 1, backgroundColor: '#F1F5F9', marginVertical: 28 },
  logoutBtn:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FEF2F2', borderRadius: 100, paddingHorizontal: 24, paddingVertical: 14, borderWidth: 1, borderColor: '#FECACA' },
  logoutText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#EF4444' },
});
