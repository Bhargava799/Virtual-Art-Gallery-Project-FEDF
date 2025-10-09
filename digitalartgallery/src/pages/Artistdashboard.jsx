import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Import images from src/assets folder
import uploadImg from "../assets/upload.jpg";
import manageImg from "../assets/manage.png";
import analysisImg from "../assets/analysis.jpg";

const Artistdashboard = () => {
  const navigate = useNavigate();

  // ✅ Card Data with routes
  const cardData = [
    { title: "Upload Art", image: uploadImg, path: "/upload" },
    { title: "Manage Art", image: manageImg, path: "/manage" },
    { title: "Analysis", image: analysisImg, path: "/analysis" },
  ];

  return (
    <div style={{ padding: "40px" }}>
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
          Artist Dashboard
        </Typography>
      </Box>


      {/* Cards Layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Top row (Upload + Manage) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {cardData.slice(0, 2).map((card) => (
            <Card
              key={card.title}
              sx={{ width: 300, cursor: "pointer", boxShadow: 3 }}
            >
              <CardActionArea onClick={() => navigate(card.path)}>
                <Box
                  component="img"
                  sx={{ height: 140, width: "100%", objectFit: "cover" }}
                  alt={card.title}
                  src={card.image}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6">
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>

        {/* Bottom row (Analysis) */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            key={cardData[2].title}
            sx={{ width: 300, cursor: "pointer", boxShadow: 3 }}
          >
            <CardActionArea onClick={() => navigate(cardData[2].path)}>
              <Box
                component="img"
                sx={{ height: 140, width: "100%", objectFit: "cover" }}
                alt={cardData[2].title}
                src={cardData[2].image}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h6">
                  {cardData[2].title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Artistdashboard;
