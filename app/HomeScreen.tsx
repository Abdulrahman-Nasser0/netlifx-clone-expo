

import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { useAuth } from './stores/authStore';

const HomeScreen: React.FC = () => {
	const { user, isAuthenticated } = useAuth();
	return (
		<ImageBackground
			source={require('../assets/images/home-bg.jpg')}
			style={{ flex: 1, width: '100%', backgroundColor: '#111' }}
			imageStyle={{ resizeMode: 'cover' }}
		>
			<View className="flex-1 bg-black/70">
				{!isAuthenticated ? (
					<View className="flex-1 justify-center items-center px-4">
						<View className="w-full max-w-2xl mx-auto text-center items-center justify-center">
							<Text className="text-white text-3xl font-bold mb-4 text-center">Unlimited movies, TV shows, and more</Text>
							<Text className="text-gray-100 text-lg mb-4">Starts at EGP 100. Cancel anytime.</Text>
							<Text className="text-gray-100 text-lg mb-8 text-center">Ready to watch? Enter your email to create or restart your membership.</Text>
							<Link
								href="/RegisterScreen"
								className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded  font-semibold  h-12 mt-4 text-white pb-2 pt-3"
							>
								Get Started
							</Link>
						</View>
					</View>
				) : (
					<ScrollView className="flex-1 pt-20 px-4">
						<Text className="text-white text-2xl font-bold mb-4">Welcome back, {user?.name}! 👋</Text>
						<Text className="text-gray-300 text-lg mb-8">Your Netflix experience awaits</Text>
						
						<View className="mb-8">
							<Text className="text-white text-xl font-bold mb-4">Quick Links</Text>
							<Link href="/screens/MoviesScreen" className="bg-gray-800 p-4 rounded mb-3">
								<Text className="text-white text-lg">🎬 Browse Movies</Text>
							</Link>
							<Link href="/screens/TVShowsScreen" className="bg-gray-800 p-4 rounded mb-3">
								<Text className="text-white text-lg">📺 TV Shows</Text>
							</Link>
							<Link href="/screens/MyListScreen" className="bg-gray-800 p-4 rounded mb-3">
								<Text className="text-white text-lg">❤️ My List</Text>
							</Link>
							<Link href="/screens/SearchScreen" className="bg-gray-800 p-4 rounded mb-3">
								<Text className="text-white text-lg">🔍 Search</Text>
							</Link>
						</View>

						<View className="mb-8">
							<Text className="text-white text-xl font-bold mb-4">Coming Soon</Text>
							<Text className="text-gray-400">Movie categories and personalized recommendations will be shown here</Text>
						</View>
					</ScrollView>
				)}
			</View>
		</ImageBackground>
	);
};

export default HomeScreen;
