import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Tooltip,
  TextField,
  InputAdornment,
  Modal,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Palette,
  Person,
  Search,
  ShoppingCart,
  NotificationsNone,
} from '@mui/icons-material';

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2C387E' },
    background: { default: '#121212', paper: '#1d1d1d' },
    text: { primary: '#e0e0e0', secondary: '#b3b3b3' },
  },
  typography: { fontFamily: 'Inter, sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
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

export default function Navbar1({ username = 'John Doe', role = 'Visitor' }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  // Overlay modals
  const [openArtists, setOpenArtists] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate("/");
  };

  // Dummy artists
  const artists = Array.from({ length: 10 }, (_, i) => ({
    name: `Artist ${i + 1}`,
    img: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo and title */}
            <Palette sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="button"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Artiquarium Virtual Gallery
            </Typography>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open main menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate("/exhibitions"); }}>Exhibitions</MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); setOpenArtists(true); }}>Artists</MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); setOpenAbout(true); }}>About</MenuItem>
              </Menu>
            </Box>

            {/* Mobile title */}
            <Palette sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="button"
              onClick={() => navigate('/')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Aurora Art Gallery
            </Typography>

            {/* Desktop nav links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={() => navigate("/exhibitions")} sx={{ my: 2, color: 'white' }}>Exhibitions</Button>
              <Button onClick={() => setOpenArtists(true)} sx={{ my: 2, color: 'white' }}>Artists</Button>
              <Button onClick={() => setOpenAbout(true)} sx={{ my: 2, color: 'white' }}>About</Button>
            </Box>

            {/* Right side */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Search */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <TextField
                  placeholder="Search..."
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      '&:hover fieldset': { borderColor: '#bb86fc' },
                      '&.Mui-focused fieldset': { borderColor: '#bb86fc' },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <NotificationsNone />
                </IconButton>
              </Tooltip>
              <Tooltip title="My Cart">
                <IconButton color="inherit" onClick={() => navigate("/cart")}>
                  <ShoppingCart />
                </IconButton>
              </Tooltip>
              <Tooltip title="My Profile">
                <IconButton onClick={handleOpenUserMenu} color="inherit">
                  <Person />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem sx={{ pointerEvents: 'none', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="body2">Signed in as</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{username}</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                    Role: {role}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>Edit Profile</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>Purchase History</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>User Settings</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Artists modal */}
      <Modal open={openArtists} onClose={() => setOpenArtists(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24, p: 4, borderRadius: 2, width: 500,
        }}>
          <Typography variant="h6" mb={2}>Featured Artists</Typography>
          {artists.map((artist) => (
            <Card key={artist.name} sx={{ mb: 1, display: 'flex', alignItems: 'center', p: 1 }}>
              <Avatar src={artist.img} alt={artist.name} sx={{ mr: 2 }} />
              <CardContent sx={{ p: 0 }}>
                <Typography>{artist.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Modal>

      {/* About modal */}
      <Modal open={openAbout} onClose={() => setOpenAbout(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24, p: 4, borderRadius: 2, width: 500,
        }}>
          <Typography variant="h6" mb={2}>About Aurora Art Gallery</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices
            eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate
            semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </Typography>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
