import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const NetflixHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };
    
  return (
    <View className="absolute top-10 left-0 right-0 flex-row items-center justify-between px-4 h-14 bg-transparent z-10">
      <Link href={'/'} ><Image source={require('../../assets/images/netflix-logo.png')} style={{ width: 96, height: 40 }} /></Link>

      <View className="flex-row space-x-2 items-center">
        {isAuthenticated ? (
          <>
            <Link href={'/screens/ProfileScreen'} className='text-white py-1.5 px-3'>
              <Text className="text-white">👤 {user?.name || 'Profile'}</Text>
            </Link>
            <TouchableOpacity onPress={handleLogout} className='bg-red-600 py-1.5 px-3 rounded'>
              <Text className="text-white">Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Link href={'/LoginScreen'} className='text-white bg-red-600 py-1.5 px-3 rounded'>
              <Text className="text-white">Login</Text>
            </Link>
            <Link href={'/RegisterScreen'} className='text-white py-1.5 px-3 rounded'>
              <Text className="text-white">Sign Up</Text>
            </Link>
          </>
        )}
      </View>
    </View>
  );
};

export default NetflixHeader;
