
import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, User, loginApi, registerApi, storeToken, getToken, removeToken, fetchUserData } from '@/lib/auth';
import { toast } from 'sonner';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize auth state from token
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      console.log("🔍 Token on Page Load:", token);
  
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5001/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
  
        const data = await response.json();
        setUser(data.user); // ✅ Ensure user state is set
        console.log("✅ User set in state:", data.user);
      } catch (err) {
        console.error("Auth init failed:", err);
        removeToken();
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
        console.log("✅ Token stored in localStorage:", getToken()); // ✅ Debug token storage
        await fetchUserData(setUser); // ✅ Fetch user details after login
        toast.success("Login successful");
        return true;
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
        return false;
      }
    } catch (err) {
      setError("An error occurred during login");
      toast.error("Login failed. Please try again.");
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
       console.log("✅ Token Stored:", response.token);

        // Fetch user details immediately after registration
        const userResponse = await fetch("http://localhost:5001/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.token}`,
          },
        });

        const userData = await userResponse.json();
        console.log("👤 User Data Retrieved:", userData);

       setUser(userData.user);
       toast.success("Registration successful");
       return true;
     } else {
      setError("Registration failed");
      return false;
     }
    } catch (err) {
      setError("An error occurred during registration");
      toast.error("Registration failed. Please try again.");
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
        login: async () => false,
        register: async () => false,
        logout: () => {
          removeToken();
          setUser(null);
          toast.info('You have been logged out');
        },
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
