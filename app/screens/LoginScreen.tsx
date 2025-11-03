
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
    <View className="flex-1 justify-center items-center bg-[#111] p-6">
      <Text className="text-white text-3xl font-bold mb-6">Sign In</Text>
      <TextInput
        className="bg-[#222] text-white w-full max-w-[320px] p-3 rounded-lg mb-3"
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-[#222] text-white w-full max-w-[320px] p-3 rounded-lg mb-3"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text className="text-red-600 mb-3">{error}</Text> : null}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#e50914] py-3 px-8 rounded-lg mb-4 w-full max-w-[320px] items-center"
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-base">Sign In</Text>}
      </TouchableOpacity>
      <Link href={"/screens/RegisterScreen"}>
        <Text className="text-[#e50914]">Don&apos;t have an account? Sign Up</Text>
      </Link>
    </View>
  );
};

export default LoginScreen;
