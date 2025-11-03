
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../stores/authStore';

const RegisterScreen = () => {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!name || !email || !password || !passwordConfirmation) {
      setError('All fields are required');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    const result = await register({ name, email, password, password_confirmation: passwordConfirmation });
    if (result.success) {
      setSuccess('Registration successful! Please sign in.');
      setTimeout(() => router.replace('/screens/LoginScreen'), 1200);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#111] p-6">
      <Text className="text-white text-3xl font-bold mb-6">Sign Up</Text>
      <TextInput
        className="bg-[#222] text-white w-full max-w-[320px] p-3 rounded-lg mb-3"
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        className="bg-[#222] text-white w-full max-w-[320px] p-3 rounded-lg mb-3"
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      {error ? <Text className="text-red-600 mb-3">{error}</Text> : null}
      {success ? <Text className="text-green-600 mb-3">{success}</Text> : null}
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-[#e50914] py-3 px-8 rounded-lg mb-4 w-full max-w-[320px] items-center"
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-base">Sign Up</Text>}
      </TouchableOpacity>
      <Link href={"/screens/LoginScreen"}>
        <Text className="text-[#e50914]">Already have an account? Sign In</Text>
      </Link>
    </View>
  );
};

export default RegisterScreen;
