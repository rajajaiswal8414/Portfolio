import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { Users, CheckSquare, BookOpen, Award } from 'lucide-react-native';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const name = user?.name ?? 'Teacher';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🧑‍🏫</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroSub}>Teacher Portal</Text>
            <Text style={styles.heroName}>{name}</Text>
          </View>
        </View>

        {/* Today at a glance */}
        <Text style={styles.section}>Today at a Glance</Text>
        <View style={styles.statsRow}>
          <StatCard label="Classes Today" value="4" color="#6366F1" />
          <StatCard label="Students"      value="124" color="#10B981" />
          <StatCard label="Pending Marks" value="2" color="#F59E0B" />
        </View>

        {/* Quick actions */}
        <Text style={styles.section}>Quick Actions</Text>
        <View style={styles.grid}>
          <ActionCard icon={<CheckSquare size={20} color="#6366F1" />} bg="#EEF2FF" title="Take Attendance" sub="Mark today's roll" />
          <ActionCard icon={<Award       size={20} color="#10B981" />} bg="#D1FAE5" title="Grade Book"      sub="Enter exam marks" />
          <ActionCard icon={<Users       size={20} color="#F59E0B" />} bg="#FEF3C7" title="My Classes"      sub="View your sections" />
          <ActionCard icon={<BookOpen    size={20} color="#EF4444" />} bg="#FEE2E2" title="Lesson Plans"    sub="Curriculum mapping" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActionCard({ icon, bg, title, sub }: { icon: React.ReactNode; bg: string; title: string; sub: string }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <View style={[styles.cardIcon, { backgroundColor: bg }]}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: '#F8FAFC' },
  content:   { padding: 20, paddingBottom: 40 },
  heroCard:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 24, padding: 20, marginBottom: 20, gap: 14 },
  heroEmoji: { fontSize: 40 },
  heroSub:   { fontFamily: 'Inter_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  heroName:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 20, color: '#FFF', marginTop: 2 },
  section:   { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard:  { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  statValue: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 18 },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2, textAlign: 'center' },
  grid:      { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card:      { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  cardIcon:  { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 13, color: '#0F172A' },
  cardSub:   { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2 },
});
