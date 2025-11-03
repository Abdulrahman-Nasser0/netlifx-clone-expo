import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import HomeScreen from './HomeScreen';
import { useAuthStore } from './stores/authStore';

export default function Index() {
  const [isInitializing, setIsInitializing] = useState(true);
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initialize();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, [initialize]);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return <HomeScreen />;
}