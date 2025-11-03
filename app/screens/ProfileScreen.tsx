import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const ProfileScreen = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.replace('/LoginScreen');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
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
        <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 32 }}>Profile</Text>
        
        <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Name</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>{user.name}</Text>
          </View>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Email</Text>
            <Text style={{ color: 'white', fontSize: 18 }}>{user.email}</Text>
          </View>
          
          {user.created_at && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Member Since</Text>
              <Text style={{ color: 'white', fontSize: 18 }}>
                {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push('/screens/AccountScreen')}
          style={{ backgroundColor: '#333', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8, marginBottom: 12 }}
        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{ backgroundColor: '#e50914', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
