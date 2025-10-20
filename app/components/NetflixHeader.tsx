import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const NetflixHeader: React.FC = () => {
    
  return (
    <View className="flex-row items-center justify-center w-full px-4 h-14">
      <Link
      href={'/'} className='text-red-600 mr-20 font-bold text-lg mr-4'>Netflix</Link>

      <View className="flex-row space-x-2">
        <Link
      href={'/LoginScreen'} className=' text-white bg-red-600 py-1.5 px-3 rounded   ml-8'>Login</Link>

        <Link
      href={'/RegisterScreen'} className='text-white py-1.5 px-3 rounded   '>Sign Up</Link>

      </View>
    </View>
  );
};

export default NetflixHeader;
