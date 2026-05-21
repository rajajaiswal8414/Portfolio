import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { Users, UserPlus, DollarSign, Shield, LogOut } from 'lucide-react-native';

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const name = user?.name ?? 'Admin';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Administrator Portal</Text>
          <Text style={styles.headerTitle}>Dashboard 🏛️</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <LogOut size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetCard}>
          <Text style={styles.greetText}>Welcome back, {name.split(' ')[0]}</Text>
          <Text style={styles.greetSub}>Here's your school at a glance.</Text>
        </View>

        {/* KPI row */}
        <View style={styles.kpiRow}>
          <KpiCard label="Total Students" value="1,240" color="#6366F1" />
          <KpiCard label="Staff Members"  value="98"    color="#10B981" />
          <KpiCard label="Admissions"     value="14"    color="#F59E0B" />
        </View>

        {/* Modules */}
        <Text style={styles.section}>Administration Modules</Text>
        <View style={styles.grid}>
          <ModuleCard icon={<UserPlus   size={20} color="#6366F1" />} bg="#EEF2FF" title="Admissions"  sub="Manage new applications" />
          <ModuleCard icon={<Users      size={20} color="#10B981" />} bg="#D1FAE5" title="Staff"       sub="HR & staff directory" />
          <ModuleCard icon={<DollarSign size={20} color="#F59E0B" />} bg="#FEF3C7" title="Finance"     sub="Fees & invoices" />
          <ModuleCard icon={<Shield     size={20} color="#EF4444" />} bg="#FEE2E2" title="Access Ctrl" sub="Roles & permissions" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
      <Text style={styles.kpiLabel}>{label}</Text>
    </View>
  );
}

function ModuleCard({ icon, bg, title, sub }: { icon: React.ReactNode; bg: string; title: string; sub: string }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <View style={[styles.cardIcon, { backgroundColor: bg }]}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#F8FAFC' },
  header:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerSub:  { fontFamily: 'Inter_500Medium', fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 },
  headerTitle:{ fontFamily: 'PlusJakartaSans_700Bold', fontSize: 22, color: '#0F172A', marginTop: 2 },
  logoutBtn:  { backgroundColor: '#FEF2F2', borderRadius: 20, padding: 10, borderWidth: 1, borderColor: '#FECACA' },
  content:    { padding: 20, paddingBottom: 40 },
  greetCard:  { backgroundColor: '#0F172A', borderRadius: 20, padding: 20, marginBottom: 16 },
  greetText:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 18, color: '#FFF' },
  greetSub:   { fontFamily: 'Inter_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  kpiRow:     { flexDirection: 'row', gap: 10, marginBottom: 20 },
  kpiCard:    { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  kpiValue:   { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16 },
  kpiLabel:   { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2, textAlign: 'center' },
  section:    { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card:       { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  cardIcon:   { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle:  { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 13, color: '#0F172A' },
  cardSub:    { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2 },
});
