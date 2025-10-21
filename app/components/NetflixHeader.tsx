import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const NetflixHeader: React.FC = () => {
    
  return (
    <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 h-14 bg-transparent z-10">
      <Link
      href={'/'} className='text-red-600 font-bold text-lg'>Netflix</Link>

      <View className="flex-row space-x-2">
        <Link
      href={'/LoginScreen'} className=' text-white bg-red-600 py-1.5 px-3 rounded'>Login</Link>

        <Link
      href={'/RegisterScreen'} className='text-white py-1.5 px-3 rounded'>Sign Up</Link>

      </View>
    </View>
  );
};

export default NetflixHeader;
