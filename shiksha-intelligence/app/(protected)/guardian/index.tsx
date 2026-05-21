import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { Baby, DollarSign, QrCode, Bell, LogOut } from 'lucide-react-native';

export default function GuardianDashboard() {
  const { user, logout } = useAuthStore();

  const name = user?.name ?? 'Guardian';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Guardian Portal</Text>
          <Text style={styles.headerTitle}>Hello, {name.split(' ')[0]} 👪</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>👪</Text>
          <Text style={styles.heroLabel}>GUARDIAN PORTAL</Text>
          <Text style={styles.heroName}>{name}</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Active Parent / Guardian</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <QuickCard
            icon={<Baby size={22} color="#6366F1" />}
            bg="#EEF2FF"
            title="Attendance"
            subtitle="View child's attendance"
          />
          <QuickCard
            icon={<DollarSign size={22} color="#10B981" />}
            bg="#D1FAE5"
            title="Fees Due"
            subtitle="Check pending dues"
          />
          <QuickCard
            icon={<QrCode size={22} color="#F59E0B" />}
            bg="#FEF3C7"
            title="Pickup QR"
            subtitle="Show at school gate"
          />
          <QuickCard
            icon={<Bell size={22} color="#EF4444" />}
            bg="#FEE2E2"
            title="Notices"
            subtitle="School announcements"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickCard({
  icon, bg, title, subtitle,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <View style={[styles.cardIcon, { backgroundColor: bg }]}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#F8FAFC' },
  header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerSub:    { fontFamily: 'Inter_500Medium', fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#0F172A', marginTop: 2 },
  logoutBtn:    { backgroundColor: '#FEF2F2', borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#FECACA' },
  content:      { padding: 20, paddingBottom: 40 },
  heroCard:     { backgroundColor: '#6366F1', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24 },
  heroEmoji:    { fontSize: 44, marginBottom: 8 },
  heroLabel:    { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, textTransform: 'uppercase' },
  heroName:     { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 24, color: '#FFF', marginTop: 4 },
  heroBadge:    { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginTop: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBadgeText:{ fontFamily: 'Inter_500Medium', fontSize: 12, color: '#FFF' },
  sectionTitle: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  grid:         { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card:         { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  cardIcon:     { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle:    { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 14, color: '#0F172A' },
  cardSub:      { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#94A3B8', marginTop: 2 },
});
