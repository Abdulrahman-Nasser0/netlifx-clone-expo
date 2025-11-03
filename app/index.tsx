import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
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
      <View className="flex-1 justify-center items-center bg-[#111]">
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return <HomeScreen />;
}