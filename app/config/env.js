import Constants from 'expo-constants';

/**
 * Environment configuration
 * 
 * Priority:
 * 1. Environment variables (process.env) - For web builds
 * 2. Expo config extra field (app.json) - For native builds
 * 3. Fallback defaults
 */

const getEnvVar = (key, defaultValue = '') => {
  // Try process.env first (works in web)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // Try Expo Constants extra field (works in native)
  if (Constants.expoConfig?.extra?.[key]) {
    return Constants.expoConfig.extra[key];
  }
  
  // Return default value
  return defaultValue;
};

export const ENV = {
  // Backend API URL
  BACKEND_API_URL: getEnvVar(
    'BACKEND_API_URL',
    'https://netflix-clone-production-4f77.up.railway.app/api'
  ),
  
  // TMDB API Configuration
  TMDB_API_KEY: getEnvVar(
    'TMDB_API_KEY',
    '44090856cfc33566c8bb504be8ee1fcd'
  ),
  
  TMDB_BEARER_TOKEN: getEnvVar(
    'TMDB_BEARER_TOKEN',
    ''
  ),
  
  // 🔧 MOCK AUTHENTICATION MODE
  // Set to true to bypass backend and use mock authentication
  // Set to false to use real backend authentication
  USE_MOCK_AUTH: getEnvVar('USE_MOCK_AUTH', 'true') === 'true',
  
  // App Configuration
  APP_NAME: 'Netflix Clone',
  APP_VERSION: Constants.expoConfig?.version || '1.0.0',
  
  // Environment
  IS_DEV: __DEV__,
  IS_PROD: !__DEV__,
};

// Log configuration in development
if (__DEV__) {
  console.log('🔧 Environment Configuration:', {
    BACKEND_API_URL: ENV.BACKEND_API_URL,
    TMDB_API_KEY: ENV.TMDB_API_KEY ? '***' + ENV.TMDB_API_KEY.slice(-4) : 'NOT SET',
    APP_VERSION: ENV.APP_VERSION,
    USE_MOCK_AUTH: ENV.USE_MOCK_AUTH ? '✅ ENABLED (Backend bypassed)' : '❌ DISABLED (Using real backend)',
  });
  
  if (ENV.USE_MOCK_AUTH) {
    console.warn('⚠️  MOCK AUTHENTICATION ENABLED - To use real backend, set USE_MOCK_AUTH to false in app/config/env.js');
  }
}

// Default export
export default ENV;
