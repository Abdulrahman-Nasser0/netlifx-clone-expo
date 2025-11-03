
import { create } from 'zustand';
import ENV from '../config/env';
import { userApi } from '../services/api/user';
import { crossStorage } from '../utils/crossStorage';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  isAuthenticated: false,

  async initialize() {
    try {
  const raw = await crossStorage.getItem('user');
      const user = raw && raw !== 'undefined' ? JSON.parse(raw) : null;
      set({ user, isAuthenticated: !!user });
    } catch {
  await crossStorage.removeItem('user');
  await crossStorage.removeItem('auth_token');
      set({ user: null, isAuthenticated: false });
    }
  },

  async login(email, password) {
    try {
      set({ loading: true });
      
      // 🔧 MOCK AUTHENTICATION MODE
      if (ENV.USE_MOCK_AUTH) {
        console.log('🎭 Mock Login - Bypassing backend');
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const mockUser = {
          id: 1,
          name: 'Mock User',
          email: email,
          created_at: new Date().toISOString(),
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        await crossStorage.setItem('auth_token', mockToken);
        await crossStorage.setItem('user', JSON.stringify(mockUser));
        set({ user: mockUser, isAuthenticated: true });
        
        console.log('✅ Mock Login Successful:', mockUser);
        return { success: true };
      }
      
      // Real backend authentication
      const res = await fetch(`${ENV.BACKEND_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text();
        try { const data = JSON.parse(text); return { success: false, error: data.message || 'Login failed' }; }
        catch { return { success: false, error: `Login failed (${res.status})` }; }
      }
      const data = await res.json();
  if (data.Token) await crossStorage.setItem('auth_token', data.Token);
  await crossStorage.setItem('user', JSON.stringify(data.User));
      set({ user: data.User, isAuthenticated: true });
      return { success: true };
    } catch (e) {
      const msg = e?.message || 'Network error';
      return { success: false, error: msg };
    } finally {
      set({ loading: false });
    }
  },

  async register(userData) {
    try {
      set({ loading: true });
      
      // 🔧 MOCK AUTHENTICATION MODE
      if (ENV.USE_MOCK_AUTH) {
        console.log('🎭 Mock Register - Bypassing backend');
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        console.log('✅ Mock Registration Successful');
        return { success: true };
      }
      
      // Real backend registration
      const res = await fetch(`${ENV.BACKEND_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const text = await res.text();
        try { const data = JSON.parse(text); return { success: false, error: data.message || 'Registration failed', errors: data.errors }; }
        catch { return { success: false, error: `Registration failed (${res.status})` }; }
      }
      await res.json();
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.message || 'Network error' };
    } finally {
      set({ loading: false });
    }
  },

  async logout() {
  const token = await crossStorage.getItem('auth_token');
  await crossStorage.removeItem('auth_token');
  await crossStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
    
    // 🔧 MOCK AUTHENTICATION MODE
    if (ENV.USE_MOCK_AUTH) {
      console.log('🎭 Mock Logout - No backend call');
      return;
    }
    
    // Real backend logout
    if (token) {
      try {
        await fetch(`${ENV.BACKEND_API_URL}/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        });
      } catch {
        // Ignore backend logout failure; local logout already done
      }
    }
  },

  async updateUser(updates) {
  const token = await crossStorage.getItem('auth_token');
    if (!token) return { success: false, error: 'Not authenticated' };
    
    // 🔧 MOCK AUTHENTICATION MODE
    if (ENV.USE_MOCK_AUTH) {
      console.log('🎭 Mock Update User - Bypassing backend');
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      const currentUser = get().user;
      const updated = { ...currentUser, ...updates };
      await crossStorage.setItem('user', JSON.stringify(updated));
      set({ user: updated });
      
      console.log('✅ Mock Update Successful:', updated);
      return { success: true, user: updated };
    }
    
    // Real backend update
    try {
      const data = await userApi.updateProfile(updates);
      const updated = data.User || data.user || data;
  await crossStorage.setItem('user', JSON.stringify(updated));
      set({ user: updated });
      return { success: true, user: updated };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async refreshUser() {
  const token = await crossStorage.getItem('auth_token');
    if (!token) return { success: false, error: 'Not authenticated' };
    
    // 🔧 MOCK AUTHENTICATION MODE
    if (ENV.USE_MOCK_AUTH) {
      console.log('🎭 Mock Refresh User - Using stored data');
      const currentUser = get().user;
      if (currentUser) {
        return { success: true, user: currentUser };
      }
      return { success: false, error: 'No user data found' };
    }
    
    // Real backend refresh
    try {
      const data = await userApi.getCurrent();
      const updated = data.User || data.user || data;
  await crossStorage.setItem('user', JSON.stringify(updated));
      set({ user: updated, isAuthenticated: true });
      return { success: true, user: updated };
    } catch (e) {
      if ((e.message || '').includes('401')) {
  await crossStorage.removeItem('auth_token');
  await crossStorage.removeItem('user');
        set({ user: null, isAuthenticated: false });
        return { success: false, error: 'Session expired, please sign in again.' };
      }
      return { success: false, error: e.message };
    }
  },
}))

export const useAuth = () => {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const logout = useAuthStore((s) => s.logout)
  const updateUser = useAuthStore((s) => s.updateUser)
  const refreshUser = useAuthStore((s) => s.refreshUser)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated,
  }
}
// Initialize derived flags once on import
useAuthStore.getState().initialize();
