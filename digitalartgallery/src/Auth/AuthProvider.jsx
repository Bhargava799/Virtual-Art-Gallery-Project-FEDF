import React, { createContext, useState, useEffect, useMemo } from "react";

export const AuthContext = createContext({
  user: null,
  role: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) {
        setUser(storedUser);
        setRole(storedUser.role);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setUser(userData);
    setRole(userData.role);

    // Role-based initializations
    if (userData.role === "Artist" && !localStorage.getItem("artistsData"))
      localStorage.setItem("artistsData", JSON.stringify({ [userData.username]: [] }));

    if (userData.role === "Visitor" && !localStorage.getItem("visitorsCart"))
      localStorage.setItem("visitorsCart", JSON.stringify({ [userData.username]: [] }));

    if (userData.role === "Curator" && !localStorage.getItem("curatorsExhibitions"))
      localStorage.setItem("curatorsExhibitions", JSON.stringify({ [userData.username]: [] }));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setRole(null);
  };

  const value = useMemo(() => ({ user, role, isVerified, login, logout }), [user, role, isVerified]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
