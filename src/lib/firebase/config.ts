'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBUTBPgbRsO9TUn4SEYxVRkCqL9fuciCE4",
  authDomain: "connection-fc2c6.firebaseapp.com",
  projectId: "connection-fc2c6",
  storageBucket: "connection-fc2c6.firebasestorage.app",
  messagingSenderId: "2208580642",
  appId: "1:2208580642:web:2f8f5b3022fe428020b67b",
};

// Debug: Log what we're getting (only in browser, dev mode)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Environment variables check:', {
    apiKey: firebaseConfig.apiKey ? '✓ Set' : '✗ Missing',
    authDomain: firebaseConfig.authDomain ? '✓ Set' : '✗ Missing',
    projectId: firebaseConfig.projectId ? '✓ Set' : '✗ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✓ Set' : '✗ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓ Set' : '✗ Missing',
    appId: firebaseConfig.appId ? '✓ Set' : '✗ Missing',
  });
}

// Validate config
const isConfigValid = () => {
  if (typeof window === 'undefined') return false;
  const values = Object.values(firebaseConfig);
  return values.every(value => value && typeof value === 'string' && value.trim() !== '' && value !== 'undefined');
};

// Lazy initialization - only initialize in browser
let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let configError: Error | null = null;

function getApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase can only be initialized in the browser');
  }

  if (!isConfigValid()) {
    const missingKeys = Object.entries(firebaseConfig)
      .filter(([_, value]) => !value || value === 'undefined')
      .map(([key]) => key);
    throw new Error(
      `Firebase configuration is missing or invalid. Missing: ${missingKeys.join(', ')}. ` +
      `Please check your Firebase configuration.`
    );
  }
  
  if (!app) {
    try {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      configError = null;
    } catch (error) {
      configError = error as Error;
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }
  
  return app;
}

export function getAuthInstance(): Auth | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isConfigValid()) {
    if (!configError) {
      console.warn(
        'Firebase configuration is missing or invalid. ' +
        'Authentication features will not be available. ' +
        'Please check your Firebase configuration.'
      );
    }
    return null;
  }

  if (!authInstance) {
    try {
      authInstance = getAuth(getApp());
      configError = null;
    } catch (error) {
      configError = error as Error;
      console.error('Firebase Auth initialization error:', error);
      return null;
    }
  }
  return authInstance;
}

// Export auth as a getter to ensure lazy initialization
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    try {
      const instance = getAuthInstance();
      if (!instance) {
        // Return no-op functions for methods
        if (typeof prop === 'string' && (prop.startsWith('on') || typeof ({} as any)[prop] === 'function')) {
          return () => {};
        }
        return undefined;
      }
      return instance[prop as keyof Auth];
    } catch (error) {
      // Return a no-op function for methods to prevent errors
      if (typeof prop === 'string' && prop.startsWith('on')) {
        return () => {};
      }
      return undefined;
    }
  },
});

export default getApp;