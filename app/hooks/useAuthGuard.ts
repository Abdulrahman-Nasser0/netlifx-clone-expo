import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../stores/authStore';

/**
 * Hook to protect routes that require authentication
 * Redirects to login if user is not authenticated
 */
export const useAuthGuard = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/screens/LoginScreen');
    }
  }, [isAuthenticated, loading, router]);

  return { isAuthenticated, loading };
};
