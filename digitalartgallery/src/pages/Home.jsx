import React from "react";
import { Typography, Grid, Paper, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled, keyframes } from "@mui/material/styles";

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

// Styled Paper for role cards
const RoleCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s, background 0.5s, color 0.5s",
  borderRadius: "20px",
  animation: `${fadeIn} 0.8s ease forwards`,
  "&:hover": {
    transform: "scale(1.1) translateY(-5px)",
    boxShadow: theme.shadows[6],
    animation: `${float} 2s ease-in-out infinite`,
  },
}));

const roles = [
  { name: "Admin", color: "#1976d2" },
  { name: "Artist", color: "#9c27b0" },
  { name: "Visitor", color: "#2e7d32" },
  { name: "Curator", color: "#ff9800" },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const handleRoleClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background artistic shapes */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 100,
          background: isDark
            ? "linear-gradient(120deg, #FF6B6B, #FFD93D)"
            : "linear-gradient(120deg, #FF8A65, #FFD54F)",
          transform: "rotate(-25deg)",
          top: 50,
          left: -100,
          borderRadius: "50px",
          filter: "blur(20px)",
          opacity: isDark ? 0.6 : 0.8,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 120,
          background: isDark
            ? "linear-gradient(120deg, #6BCB77, #4D96FF)"
            : "linear-gradient(120deg, #81C784, #64B5F6)",
          transform: "rotate(30deg)",
          bottom: 100,
          right: -80,
          borderRadius: "60px",
          filter: "blur(25px)",
          opacity: isDark ? 0.6 : 0.8,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 150,
          background: isDark
            ? "linear-gradient(45deg, #FF6B6B, #FF9F1C)"
            : "linear-gradient(45deg, #FF8A65, #FFD54F)",
          transform: "rotate(10deg)",
          top: 200,
          right: -150,
          borderRadius: "80px",
          filter: "blur(30px)",
          opacity: isDark ? 0.5 : 0.7,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 130,
          background: isDark
            ? "linear-gradient(60deg, #6BCB77, #FFD93D)"
            : "linear-gradient(60deg, #A5D6A7, #FFF176)",
          transform: "rotate(-40deg)",
          bottom: 200,
          left: -120,
          borderRadius: "70px",
          filter: "blur(25px)",
          opacity: isDark ? 0.6 : 0.8,
        }}
      />

      {/* Transparent overlay box */}
      <Box
        sx={{
          bgcolor: isDark
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: 5,
          p: 6,
          textAlign: "center",
          width: { xs: "90%", sm: "80%", md: "60%" },
          position: "relative",
          zIndex: 1,
          color: isDark ? "#fff" : "#000",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: isDark ? "#fff" : "#000",
            mb: 6,
            fontWeight: 700,
            letterSpacing: "2px",
            textShadow: isDark
              ? "0px 0px 10px rgba(255,255,255,0.3)"
              : "0px 0px 5px rgba(0,0,0,0.2)",
          }}
        >
          Virtual Art Gallery
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {roles.map((role, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={role.name}
              sx={{
                animation: `${fadeIn} 1s ease ${index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              <RoleCard
                sx={{
                  background: isDark
                    ? `linear-gradient(45deg, ${role.color}, #424242)`
                    : `linear-gradient(45deg, ${role.color}, #f5f5f5)`,
                  color: isDark ? "#fff" : "#000",
                }}
                onClick={() => handleRoleClick(role.name)}
              >
                <Typography variant="h5">{role.name}</Typography>
              </RoleCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
