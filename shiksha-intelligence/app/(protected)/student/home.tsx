import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { BookOpen, Award, TrendingUp, Bell } from 'lucide-react-native';

export default function StudentHome() {
  const { user } = useAuthStore();
  const name = user?.name ?? 'Student';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting card */}
        <View style={styles.greetCard}>
          <Text style={styles.greetEmoji}>🎒</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.greetSub}>Good morning!</Text>
            <Text style={styles.greetName}>{name}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={{ fontSize: 22 }}>🧑‍🎓</Text>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatChip label="Attendance" value="92%" color="#10B981" />
          <StatChip label="Pending"    value="3 tasks" color="#F59E0B" />
          <StatChip label="Next Exam"  value="4 days" color="#6366F1" />
        </View>

        {/* Quick actions */}
        <Text style={styles.section}>My Academics</Text>
        <View style={styles.grid}>
          <ActionCard icon={<BookOpen size={20} color="#6366F1" />} bg="#EEF2FF" title="My Classes"  sub="View subjects & teachers" />
          <ActionCard icon={<Award    size={20} color="#10B981" />} bg="#D1FAE5" title="Results"     sub="View exam scores" />
          <ActionCard icon={<TrendingUp size={20} color="#F59E0B" />} bg="#FEF3C7" title="Progress"  sub="Academic progress" />
          <ActionCard icon={<Bell    size={20} color="#EF4444" />} bg="#FEE2E2" title="Notices"     sub="School announcements" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.statChip}>
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
  safe:       { flex: 1, backgroundColor: '#F8FAFC' },
  content:    { padding: 20, paddingBottom: 40 },
  greetCard:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', borderRadius: 24, padding: 20, marginBottom: 16, gap: 12 },
  greetEmoji: { fontSize: 32 },
  greetSub:   { fontFamily: 'Inter_400Regular', fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  greetName:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 20, color: '#FFF', marginTop: 2 },
  avatarCircle:{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  statsRow:   { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statChip:   { flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  statValue:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
  statLabel:  { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2 },
  section:    { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16, color: '#0F172A', marginBottom: 12 },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card:       { width: '47%', backgroundColor: '#FFF', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#F1F5F9' },
  cardIcon:   { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  cardTitle:  { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 13, color: '#0F172A' },
  cardSub:    { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#94A3B8', marginTop: 2 },
});
