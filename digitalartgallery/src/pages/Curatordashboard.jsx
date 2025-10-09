import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ Import images for Curator Dashboard
import createExhibitionImg from "../assets/createExhibition.jpg"; // replace with your image
import manageExhibitionImg from "../assets/manage.png"; // replace with your image
import analysisExhibitionImg from "../assets/analysis.jpg"; // replace with your image

const Curatordashboard = () => {
  const navigate = useNavigate();

  // ✅ Card Data with routes for curator
  const cardData = [
    { title: "Create Exhibition", image: createExhibitionImg, path: "/createexhibition" },
    { title: "Manage Exhibitions", image: manageExhibitionImg, path: "/manageexhibitions" },
    { title: "Exhibition Analysis", image: analysisExhibitionImg, path: "/exhibitionsanalysis" },
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
          Curator Dashboard
        </Typography>
      </Box>

      {/* Cards Layout */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Top row (Create Exhibition + Manage Exhibitions) */}
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

        {/* Bottom row (Exhibition Analysis) */}
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

export default Curatordashboard;
