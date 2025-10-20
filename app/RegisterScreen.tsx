
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from './stores/authStore';

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
      setTimeout(() => router.replace('/LoginScreen'), 1200);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 24 }}>Sign Up</Text>
      <TextInput
        style={{ backgroundColor: '#222', color: 'white', width: '100%', maxWidth: 320, padding: 12, borderRadius: 8, marginBottom: 12 }}
        placeholder="Full Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={{ backgroundColor: '#222', color: 'white', width: '100%', maxWidth: 320, padding: 12, borderRadius: 8, marginBottom: 12 }}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text> : null}
      {success ? <Text style={{ color: 'green', marginBottom: 12 }}>{success}</Text> : null}
      <TouchableOpacity
        onPress={handleRegister}
        style={{ backgroundColor: '#e50914', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginBottom: 16, width: '100%', maxWidth: 320, alignItems: 'center' }}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>}
      </TouchableOpacity>
      <Link href={"/LoginScreen"}>
        <Text style={{ color: '#e50914' }}>Already have an account? Sign In</Text>
      </Link>
    </View>
  );
};

export default RegisterScreen;
