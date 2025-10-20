import React from 'react';
import { Text, View } from 'react-native';

const ComingSoonScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Feature Coming Soon...</Text>
    {/* TODO: Add navigation to Home if needed */}
  </View>
);

export default ComingSoonScreen;
