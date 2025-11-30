import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

const Exhibitions1 = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load exhibitions from localStorage
  useEffect(() => {
    const storedExhibitions = JSON.parse(localStorage.getItem("exhibitions")) || [];
    setExhibitions(storedExhibitions);
  }, []);

  // Auto-slide between exhibitions every 5 seconds
  useEffect(() => {
    if (exhibitions.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % exhibitions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [exhibitions]);

  if (exhibitions.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">No exhibitions available yet.</Typography>
      </Box>
    );
  }

    return (
    <Box
        sx={{
        position: "relative",
        minHeight: "100vh",
        p: 4,
        }}
    >{exhibitions.map((exhibition, idx) => (
  <Box key={exhibition.id} sx={{ mb: 8, textAlign: "center" }}> 
    {/* Container with textAlign center */}

    {/* Exhibition Title */}
    <Typography
      variant="h3"
      sx={{
        backgroundColor: "rgba(20,0,0,0.88)",
        color: "white",
        padding: "12px 20px",
        borderRadius: "80px",
        display: "inline-block",
        fontFamily: "Brush Script MT, cursive", // calligraphy style
      }}
    >
      {exhibition.title}
    </Typography><br></br>

    {/* Exhibition Description */}
    <Typography
      variant="body1"
      sx={{
        backgroundColor: "rgba(20,0,0,0.7)",
        color: "white",
        padding: "10px 18px",
        borderRadius: "60px",
        display: "inline-block",
        fontFamily: "Lucida Handwriting, cursive",
        mt: 2, // margin-top for spacing below title
      }}
    >
      {exhibition.description}
    </Typography>

    {/* Slideshow */}
    <Box sx={{ overflow: "hidden", whiteSpace: "nowrap", position: "relative", mt: 3 }}>
      <Box
        sx={{
          display: "inline-block",
          animation: "scrollLeft 20s linear infinite",
        }}
      >
        {exhibition.images.concat(exhibition.images).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Exhibition ${i}`}
            style={{
              width: 350,
              height: 280,
              objectFit: "cover",
              borderRadius: 12,
              marginRight: 12,
              display: "inline-block",
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
))}


        {/* CSS animation */}
        <style>{`
        @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        `}</style>
    </Box>
    );
};

export default Exhibitions1;
