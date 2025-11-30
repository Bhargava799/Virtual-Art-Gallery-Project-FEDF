import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import Visitors from "./Visitors";
import Artists from "./Artists";
import Curators from "./Curators";
import Admins from "./Admins";
import Artworks from "./Artworks";
import Exhibitions from "./Exhibitions";

const Admindashboard = ({
  admins,
  setAdmins,
  artists,
  setArtists,
  visitors,
  setVisitors,
  curators,
  setCurators,
}) => {
  const [selectedTab, setSelectedTab] = useState("Visitors");

  const tabs = [
    { name: "Visitors", component: <Visitors visitors={visitors} setVisitors={setVisitors} /> },
    { name: "Artists", component: <Artists artists={artists} setArtists={setArtists} /> },
    { name: "Curators", component: <Curators curators={curators} setCurators={setCurators} /> },
    { name: "Admins", component: <Admins admins={admins} setAdmins={setAdmins} /> },
    { name: "Artworks", component: <Artworks artists={artists} setArtists={setArtists} /> },
    { name: "Exhibitions", component: <Exhibitions curators={curators} setCurators={setCurators} /> },
  ];

  const currentTab = tabs.find((t) => t.name === selectedTab)?.component;

  // 🔹 Sync function — sends all users stored in localStorage to DB
  const syncUsersToDB = async () => {
    const allRoles = ["admins", "artists", "visitors", "curators"];
    let syncedCount = 0;

    for (const role of allRoles) {
      const users = JSON.parse(localStorage.getItem(role)) || [];
      if (!users.length) continue;

      for (const user of users) {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, role }),
        });
        syncedCount++;
      }
    }

    alert(`${syncedCount} User Accounts Synced to MongoDB!`);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "200px",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#336f6dff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ p: 2, textAlign: "center", backgroundColor: "#0d80e4ff", color: "white" }}
        >
          Admin Panel
        </Typography>
        <List>
          {tabs.map((tab) => (
            <ListItem disablePadding key={tab.name}>
              <ListItemButton onClick={() => setSelectedTab(tab.name)}>
                <ListItemText primary={tab.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, overflowY: "auto" }}>{currentTab}</Box>

      {/* Sync Button - Bottom Right */}
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#007bff",
          color: "#fff",
          px: 3,
        }}
        onClick={syncUsersToDB}
      >
        Sync Users to DB
      </Button>
    </Box>
  );
};

export default Admindashboard;
