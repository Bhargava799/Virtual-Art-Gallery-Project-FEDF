import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Reuse the dark theme for consistency
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2C387E',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

export default function Navbargeneric() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Site Title */}
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <Palette sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Artiquarium Virtual Gallery
              </Typography>
            </Box>

            {/* Login and Signup Buttons */}
            <Box>
              <Button color="inherit" onClick={() => navigate("/home")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}