import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([
    {
      id: 1,
      title: "Visions of Tomorrow",
      description: "A futuristic collection of concept digital art.",
      verified: false,
    },
    {
      id: 2,
      title: "Ethereal Dreams",
      description: "Surreal and dreamlike paintings exploring the subconscious.",
      verified: false,
    },
    {
      id: 3,
      title: "Echoes of Time",
      description: "Historical reinterpretations through modern art.",
      verified: false,
    },
    {
      id: 4,
      title: "Urban Pulse",
      description: "Photography and graffiti art inspired by city life.",
      verified: false,
    },
    {
      id: 5,
      title: "Nature’s Whisper",
      description: "Eco-themed exhibition celebrating Earth’s beauty.",
      verified: false,
    },
  ]);

  const handleVerify = (id) => {
    const updated = exhibitions.map((ex) =>
      ex.id === id ? { ...ex, verified: true } : ex
    );
    setExhibitions(updated);
  };

  const handleDelete = (id) => {
    const updated = exhibitions.filter((ex) => ex.id !== id);
    setExhibitions(updated);
  };

  return (
    <Box>
       <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  backgroundColor: "rgba(20, 0, 0, 0.88)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                Exhibitions Management
              </Typography>
            </Box>
      <Divider sx={{ mb: 2 }} />

      {exhibitions.length === 0 ? (
        <Typography>No exhibitions available.</Typography>
      ) : (
        exhibitions.map((ex) => (
          <Card key={ex.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={8}>
                  <Typography variant="h6">{ex.title}</Typography>
                  <Typography color="text.secondary">{ex.description}</Typography>
                  <Typography
                    color={ex.verified ? "success.main" : "warning.main"}
                    sx={{ mt: 1 }}
                  >
                    {ex.verified ? "Verified ✅" : "Pending Verification"}
                  </Typography>
                </Grid>
                <Grid item>
                  {!ex.verified && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleVerify(ex.id)}
                      sx={{ mr: 1 }}
                    >
                      Verify
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(ex.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Exhibitions;
