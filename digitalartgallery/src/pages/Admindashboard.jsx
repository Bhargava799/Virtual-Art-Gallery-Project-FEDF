import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import Visitors from "./Visitors";
import Artists from "./Artists";
import Curators from "./Curators";
import Admins from "./Admins";
import Artworks from "./Artworks";
import Exhibitions from "./Exhibitions";

const Admindashboard = ({ admins, setAdmins, artists, setArtists, visitors, setVisitors, curators, setCurators }) => {
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "200px",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{ p: 2, textAlign: "center", backgroundColor: "#1976d2", color: "white" }}
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
    </Box>
  );
};

export default Admindashboard;
