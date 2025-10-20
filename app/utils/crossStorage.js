import { Platform } from 'react-native';

let AsyncStorage;
if (Platform.OS !== 'web') {
  // Only import AsyncStorage on native
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

export const crossStorage = {
  async getItem(key) {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        return Promise.resolve(window.localStorage.getItem(key));
      } else {
        return Promise.resolve(null);
      }
    } else {
      return AsyncStorage.getItem(key);
    }
  },
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
      return Promise.resolve();
    } else {
      return AsyncStorage.setItem(key, value);
    }
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
      return Promise.resolve();
    } else {
      return AsyncStorage.removeItem(key);
    }
  },
};
