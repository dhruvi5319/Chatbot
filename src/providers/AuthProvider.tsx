
import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, User, loginApi, registerApi, storeToken, getToken, removeToken } from '@/lib/auth';
import { toast } from 'sonner';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      
      if (token) {
        // In a real app, you would validate the token with your backend
        // and get the user data
        try {
          // Mock user data for demo
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
          });
        } catch (err) {
          // Token was invalid
          removeToken();
        }
      }
      
      setIsLoading(false);
    };
    
    initAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginApi(email, password);
      
      if (response) {
        storeToken(response.token);
        setUser(response.user);
        toast.success('Login successful');
        return true;
      } else {
        setError('Invalid email or password');
        toast.error('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during login');
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await registerApi(name, email, password);
      
      if (response) {
        storeToken(response.token);
        setUser(response.user);
        toast.success('Registration successful');
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (err) {
      setError('An error occurred during registration');
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    removeToken();
    setUser(null);
    toast.info('You have been logged out');
  };
  
  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
