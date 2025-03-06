
import { createContext, useContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

// For demo purposes, we'll simulate JWT auth with localStorage
export const storeToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// Mock API functions that would be replaced with real backend calls
export const loginApi = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  // This would be a real API call in production
  console.log('Logging in with:', { email, password });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation - in production this would be handled by your backend
  if (email === 'demo@example.com' && password === 'password') {
    return {
      user: {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
      },
      token: 'mock-jwt-token'
    };
  }
  
  return null;
};

export const registerApi = async (name: string, email: string, password: string): Promise<{ user: User; token: string } | null> => {
  // This would be a real API call in production
  console.log('Registering with:', { name, email, password });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always succeed in demo mode
  return {
    user: {
      id: '1',
      name,
      email,
    },
    token: 'mock-jwt-token'
  };
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);
