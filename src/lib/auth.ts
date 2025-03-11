
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
  console.log("📌 Storing token in localStorage:", token);
  localStorage.setItem("auth_token", token);
};


export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

export const loginApi = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  try {
    console.log("📨 Sending login request:", { email, password });

    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("📩 API Response:", data);

    if (!response.ok) {
      console.error("❌ Login failed:", data.message);
      return null;
    }

    console.log("✅ Storing token:", data.token);
    storeToken(data.token); // ✅ Store token in localStorage

    return { user: data.user, token: data.token };
  } catch (error) {
    console.error("🔥 Login Error:", error);
    return null;
  }
};




export const registerApi = async (name: string, email: string, password: string): Promise<{ user: User; token: string } | null> => {
  try {
    console.log("📨 Register API Call:", { name, email, password });

    const response = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log("📩 API Response:", data);

    if (!response.ok) {
      console.error("❌ Registration failed:", data.message);
      return null;
    }

    storeToken(data.token); // ✅ Store token in localStorage
    return data;
  } catch (error) {
    console.error("🔥 Registration Error:", error);
    return null;
  }
};


// ✅ **Fetch user data when the app loads**
export const fetchUserData = async (setUser: (user: User | null) => void) => {
  const token = getToken();
  if (!token) {
    console.error("❌ No token found in localStorage. User not authenticated.");
    return;
  }

  try {
    console.log("📤 Fetching user data with token:", token);

    const response = await fetch("http://localhost:5001/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send token
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ User data fetched successfully:", data);
      setUser(data.user);
    } else {
      console.error("❌ Failed to fetch user:", data.message);
    }
  } catch (error) {
    console.error("❌ Error fetching user:", error);
  }
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
