import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading state added

  // Load user session from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) setUser(storedUser);
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false); // set loading to false after trying
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
