import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { canAccess } from '@/utils/roleGuard';
import { Home, Clock, BookOpen, User } from 'lucide-react-native';

export default function StudentLayout() {
  const { user } = useAuthStore();

  if (!user || !canAccess(user.roles, ['STUDENT'])) {
    return <Redirect href="/home" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:   '#6366F1',
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
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timetable"
        options={{
          title: 'Timetable',
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: 'Assignments',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
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
