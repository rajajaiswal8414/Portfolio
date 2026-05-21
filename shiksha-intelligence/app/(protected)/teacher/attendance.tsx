import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeacherAttendance() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.sub}>Mark and review class attendance here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emoji:  { fontSize: 52, marginBottom: 12 },
  title:  { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 20, color: '#0F172A' },
  sub:    { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 6 },
});
