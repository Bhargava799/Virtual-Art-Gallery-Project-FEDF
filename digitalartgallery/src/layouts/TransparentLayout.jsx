import React from "react";
import { Box, useTheme } from "@mui/material";

const TransparentLayout = ({ children, overlayOpacity = 0.5 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        zIndex: 1,
      }}
    >
      {/* 🔹 Full-page transparent overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: isDark
            ? `rgba(0,0,0,${overlayOpacity})`
            : `rgba(255,255,255,${overlayOpacity * 0.9})`,
          zIndex: -1,
        }}
      />

      {/* Page content */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TransparentLayout;
