
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const LoginScreen = () => {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    const result = await login(email, password);
    if (result.success) {
      router.replace('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', padding: 24 }}>
      
      <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Sign In</Text>
      <TextInput
        style={{ backgroundColor: '#222', color: 'white', width: '100%', maxWidth: 320, padding: 12, borderRadius: 8, marginBottom: 12 }}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ backgroundColor: '#222', color: 'white', width: '100%', maxWidth: 320, padding: 12, borderRadius: 8, marginBottom: 12 }}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text> : null}
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: '#e50914', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginBottom: 16, width: '100%', maxWidth: 320, alignItems: 'center' }}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Sign In</Text>}
      </TouchableOpacity>
      <Link href={"/screens/RegisterScreen"}>
        <Text style={{ color: '#e50914' }}>Dont have an account? Sign Up</Text>
      </Link>
    </View>
  );
};

export default LoginScreen;
