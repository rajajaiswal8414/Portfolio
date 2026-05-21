import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { canAccess } from '@/utils/roleGuard';
import { LayoutDashboard, CheckSquare, GraduationCap, User } from 'lucide-react-native';

export default function TeacherLayout() {
  const { user } = useAuthStore();

  // PRINCIPAL can also access the teacher portal
  if (!user || !canAccess(user.roles, ['TEACHER', 'PRINCIPAL'])) {
    return <Redirect href="/home" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:   '#10B981',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor:  '#F1F5F9',
          borderTopWidth:  1,
          paddingBottom:   8,
          paddingTop:      6,
          height:          60,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize:   11,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color, size }) => <CheckSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color, size }) => <GraduationCap size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
