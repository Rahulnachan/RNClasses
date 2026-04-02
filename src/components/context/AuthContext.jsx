import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on initial load
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        // Verify token is valid (optional)
        const decoded = jwtDecode(token);
        console.log("🔓 Token decoded:", decoded);
        
        // Use stored user data
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("❌ Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      }
    } else if (token && !storedUser) {
      // Token exists but no user data - clear token
      localStorage.removeItem("token");
      setToken(null);
    }
    
    setLoading(false);
  }, [token]);

  const login = (newToken, userData) => {
    console.log("🔐 Login - Saving token and user data:", userData);
    
    // Save to localStorage
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // Update state
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    console.log("🚪 Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const hasRole = (role) => {
    if (!user) return false;
    console.log(`🎭 Checking role: ${user.role} === ${role}?`, user.role === role);
    return user.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    if (!user) return false;
    return user.role === 'ADMIN';
  };

  // Check if user is the super admin
  const isSuperAdmin = () => {
    if (!user) return false;
    return user.email === 'nachanr99@gmail.com';
  };

  // For debugging - log current auth state
  useEffect(() => {
    console.log("📊 Auth State:", { 
      isAuthenticated: isAuthenticated(), 
      user, 
      hasToken: !!token,
      userRole: user?.role,
      isAdmin: user?.role === 'ADMIN'
    });
  }, [user, token]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated,
      hasRole,
      isAdmin,
      isSuperAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};