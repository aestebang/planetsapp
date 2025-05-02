import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#6EC1E4',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#6EC1E4',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#6EC1E4',
        tabBarInactiveTintColor: '#666',
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Planetas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
