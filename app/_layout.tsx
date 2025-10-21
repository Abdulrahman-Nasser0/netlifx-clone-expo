
import { Stack } from 'expo-router';
import '../global.css';
import NetflixHeader from './components/NetflixHeader';


export default function RootLayout() {
  return (
    <>
      <NetflixHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="HomeScreen" options={{ title: 'Home' }} />
        <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
        <Stack.Screen name="RegisterScreen" options={{ title: 'Register' }} />
      </Stack>
    </>
  );
}
