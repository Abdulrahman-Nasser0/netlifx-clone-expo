import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const ProfileScreen = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.replace('/screens/LoginScreen');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#111]">
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView className="flex-1 bg-[#111]">
      <View className="p-6 pt-20 mt-10">
        <Text className="text-white text-4xl font-bold mb-8">Profile</Text>
        
        <View className="bg-[#222] rounded-xl p-5 mb-5">
          <View className="mb-4">
            <Text className="text-gray-400 text-sm mb-1">Name</Text>
            <Text className="text-white text-lg">{user.name}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 text-sm mb-1">Email</Text>
            <Text className="text-white text-lg">{user.email}</Text>
          </View>
          
          {user.created_at && (
            <View className="mb-4">
              <Text className="text-gray-400 text-sm mb-1">Member Since</Text>
              <Text className="text-white text-lg">
                {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push('/screens/AccountScreen')}
          className="bg-[#333] py-4 px-6 rounded-lg mb-3"
        >
          <Text className="text-white text-base text-center">Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-[#e50914] py-4 px-6 rounded-lg"
        >
          <Text className="text-white text-base font-bold text-center">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
