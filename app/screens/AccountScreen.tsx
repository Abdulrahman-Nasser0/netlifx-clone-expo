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
      router.replace('/LoginScreen');
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111' }}>
      <View style={{ padding: 24, paddingTop: 80 }}>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>Account Settings</Text>
        <Text style={{ color: '#888', fontSize: 16, marginBottom: 32 }}>Update your account information</Text>
        
        <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Profile Information</Text>
          
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Name</Text>
          <TextInput
            style={{ backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16 }}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#666"
          />
          
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Email</Text>
          <TextInput
            style={{ backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16 }}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Change Password</Text>
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>Leave blank to keep current password</Text>
          
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Current Password</Text>
          <TextInput
            style={{ backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16 }}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current password"
            placeholderTextColor="#666"
            secureTextEntry
          />
          
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>New Password</Text>
          <TextInput
            style={{ backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16 }}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New password"
            placeholderTextColor="#666"
            secureTextEntry
          />
          
          <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Confirm New Password</Text>
          <TextInput
            style={{ backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16 }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor="#666"
            secureTextEntry
          />
        </View>

        {error ? <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleUpdateProfile}
          disabled={updating}
          style={{ backgroundColor: '#e50914', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, marginBottom: 12 }}
        >
          {updating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Save Changes</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ backgroundColor: '#333', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
