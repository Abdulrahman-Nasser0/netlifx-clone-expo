

import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { useAuth } from './stores/authStore';

const HomeScreen: React.FC = () => {
	const { isAuthenticated } = useAuth();
	return (
		<ImageBackground
			source={require('../assets/images/home-bg.jpg')}
			style={{ flex: 1, width: '100%', backgroundColor: '#111' }}
			imageStyle={{ resizeMode: 'cover' }}
		>
			<View className="flex-1 bg-black/70 justify-center items-center px-4">
				{!isAuthenticated && (
					<View className="w-full max-w-2xl mx-auto text-center items-center justify-center">
						<Text className="text-white text-3xl font-bold mb-4 text-center">Unlimited movies, TV shows, and more</Text>
						<Text className="text-gray-100 text-lg mb-4">Starts at EGP 100. Cancel anytime.</Text>
						<Text className="text-gray-100 text-lg mb-8 text-center">Ready to watch? Enter your email to create or restart your membership.</Text>
						<Link
							href="/RegisterScreen"
							className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded text-lg font-semibold flex items-center justify-center h-12 mt-4"
						>
							<Text className="text-white font-semibold text-lg">Get Started</Text>
						</Link>
					</View>
				)}
				{/* TODO: Movie categories and modal */}
			</View>
		</ImageBackground>
	);
};

export default HomeScreen;
