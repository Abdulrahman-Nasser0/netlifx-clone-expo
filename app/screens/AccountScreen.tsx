import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const AccountScreen = () => {
  const { user, isAuthenticated, loading, updateUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.replace('/screens/LoginScreen');
    }
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [isAuthenticated, loading, user, router]);

  const handleUpdateProfile = async () => {
    setError('');
    setUpdating(true);

    const updates: any = { name, email };

    // Add password update if provided
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        setUpdating(false);
        return;
      }
      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters');
        setUpdating(false);
        return;
      }
      updates.password = newPassword;
      updates.password_confirmation = confirmPassword;
      if (currentPassword) {
        updates.current_password = currentPassword;
      }
    }

    const result = await updateUser(updates);
    setUpdating(false);

    if (result.success) {
      Alert.alert('Success', 'Profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(result.error || 'Failed to update profile');
    }
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
        <Text className="text-white text-4xl font-bold mb-2">Account Settings</Text>
        <Text className="text-gray-400 text-base mb-8">Update your account information</Text>
        
        <View className="bg-[#222] rounded-xl p-5 mb-5">
          <Text className="text-white text-xl font-bold mb-4">Profile Information</Text>
          
          <Text className="text-gray-400 text-sm mb-1">Name</Text>
          <TextInput
            className="bg-[#333] text-white p-3 rounded-lg mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#666"
          />
          
          <Text className="text-gray-400 text-sm mb-1">Email</Text>
          <TextInput
            className="bg-[#333] text-white p-3 rounded-lg mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="bg-[#222] rounded-xl p-5 mb-5">
          <Text className="text-white text-xl font-bold mb-4">Change Password</Text>
          <Text className="text-gray-400 text-sm mb-3">Leave blank to keep current password</Text>
          
          <Text className="text-gray-400 text-sm mb-1">Current Password</Text>
          <TextInput
            className="bg-[#333] text-white p-3 rounded-lg mb-4"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current password"
            placeholderTextColor="#666"
            secureTextEntry
          />
          
          <Text className="text-gray-400 text-sm mb-1">New Password</Text>
          <TextInput
            className="bg-[#333] text-white p-3 rounded-lg mb-4"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New password"
            placeholderTextColor="#666"
            secureTextEntry
          />
          
          <Text className="text-gray-400 text-sm mb-1">Confirm New Password</Text>
          <TextInput
            className="bg-[#333] text-white p-3 rounded-lg mb-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        {error ? <Text className="text-red-600 mb-4 text-center">{error}</Text> : null}

        <TouchableOpacity
          onPress={handleUpdateProfile}
          disabled={updating}
          className="bg-[#e50914] py-4 px-6 rounded-lg mb-3"
        >
          {updating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-base font-bold text-center">Save Changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#333] py-4 px-6 rounded-lg"
        >
          <Text className="text-white text-base text-center">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
