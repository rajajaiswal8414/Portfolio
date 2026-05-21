import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { QrCode, ClipboardList, LogOut } from 'lucide-react-native';

export default function GuardDashboard() {
  const { user, logout } = useAuthStore();
  const name = user?.name ?? 'Guard';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Security Portal</Text>
          <Text style={styles.headerTitle}>Gate Control 🛡️</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🛡️</Text>
          <Text style={styles.heroLabel}>Security Officer</Text>
          <Text style={styles.heroName}>{name}</Text>
        </View>

        <Text style={styles.section}>Gate Operations</Text>
        <TouchableOpacity activeOpacity={0.85} style={styles.bigCard}>
          <View style={styles.bigCardIcon}>
            <QrCode size={32} color="#6366F1" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bigCardTitle}>Scan Pickup QR</Text>
            <Text style={styles.bigCardSub}>Verify guardian QR code for student release</Text>
          </View>
          <Text style={{ fontSize: 20 }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} style={styles.bigCard}>
          <View style={[styles.bigCardIcon, { backgroundColor: '#FEF3C7' }]}>
            <ClipboardList size={32} color="#F59E0B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bigCardTitle}>Visitor Log</Text>
            <Text style={styles.bigCardSub}>Record incoming and outgoing visitors</Text>
          </View>
          <Text style={{ fontSize: 20 }}>→</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#F8FAFC' },
  header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerSub:    { fontFamily: 'Inter_500Medium', fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#0F172A', marginTop: 2 },
  logoutBtn:    { backgroundColor: '#FEF2F2', borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#FECACA' },
  content:      { padding: 20, paddingBottom: 40 },
  heroCard:     { backgroundColor: '#0F172A', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24 },
  heroEmoji:    { fontSize: 44, marginBottom: 8 },
  heroLabel:    { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase' },
  heroName:     { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#FFF', marginTop: 4 },
  section:      { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  bigCard:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9', gap: 14 },
  bigCardIcon:  { width: 60, height: 60, borderRadius: 18, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  bigCardTitle: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 15, color: '#0F172A' },
  bigCardSub:   { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#94A3B8', marginTop: 2 },
});
