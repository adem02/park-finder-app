import * as SecureStore from 'expo-secure-store';

export interface SecureStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}

class ExpoSecureStorage implements SecureStorage {
  async get(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  }

  async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async remove(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}

export const secureStorage: SecureStorage = new ExpoSecureStorage();

export const StorageKeys = {
  accessToken: 'auth.accessToken',
  user: 'auth.user',
} as const;
