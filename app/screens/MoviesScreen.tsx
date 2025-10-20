import React from 'react';
import { Text, View } from 'react-native';

const MoviesScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Movies Screen</Text>
    {/* TODO: Implement movie categories and modal for Expo */}
  </View>
);

export default MoviesScreen;
