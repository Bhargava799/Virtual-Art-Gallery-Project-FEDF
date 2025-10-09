import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [artistData, setArtistData] = useState({});
  const [curatorData, setCuratorData] = useState({});
  const [users, setUsers] = useState({}); // ✅ Store all signup users grouped by role

  // Load from localStorage on mount
  useEffect(() => {
    const storedArtistData = JSON.parse(localStorage.getItem("artistsData")) || {};
    const storedCuratorData = JSON.parse(localStorage.getItem("curatorsExhibitions")) || {};
    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    setArtistData(storedArtistData);
    setCuratorData(storedCuratorData);
    setUsers(storedUsers);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("artistsData", JSON.stringify(artistData));
    localStorage.setItem("curatorsExhibitions", JSON.stringify(curatorData));
    localStorage.setItem("users", JSON.stringify(users));
  }, [artistData, curatorData, users]);

  // ✅ Helper function to add a new user (stores all details)
  const addUser = (newUser) => {
    const { username, email, password, role } = newUser;

    setUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      // Ensure role category exists
      if (!updatedUsers[role]) updatedUsers[role] = [];

      // Push new user data
      updatedUsers[role].push({ username, email, password, role });

      return updatedUsers;
    });

    // Optional: Initialize role-based data
    if (role === "Artist" && !artistData[username]) {
      setArtistData((prev) => ({ ...prev, [username]: [] }));
    }
    if (role === "Curator" && !curatorData[username]) {
      setCuratorData((prev) => ({ ...prev, [username]: [] }));
    }
  };

  return (
    <DataContext.Provider
      value={{
        artistData,
        setArtistData,
        curatorData,
        setCuratorData,
        users,
        addUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataProvider;
