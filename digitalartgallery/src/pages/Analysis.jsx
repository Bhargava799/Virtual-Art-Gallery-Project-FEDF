import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const Analysis = ({ artworks, artists }) => {
  // ✅ Safe defaults + localStorage fallback
  let parsedArtworks = [];
  let parsedArtists = [];

  try {
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    const storedArtists = JSON.parse(localStorage.getItem("artists")) || [];
    parsedArtworks = storedArtworks;
    parsedArtists = storedArtists;
  } catch (e) {
    console.warn("LocalStorage parse error in Analysis:", e);
  }

  const safeArtworks = artworks && artworks.length > 0 ? artworks : parsedArtworks;
  const safeArtists = artists && artists.length > 0 ? artists : parsedArtists;

  // Enrich data to prevent missing props
  const enrichedArtworks = safeArtworks.map((art) => ({
    ...art,
    sales: art.sales ?? Math.floor(Math.random() * 20),
    feedback: art.feedback ?? Math.floor(Math.random() * 10),
  }));

  const enrichedArtists = safeArtists.map((artist) => ({
    ...artist,
    activity: artist.activity ?? Math.floor(Math.random() * 50),
    netWorth:
      artist.netWorth ??
      Array.from({ length: 5 }, () => Math.floor(Math.random() * 30000)),
  }));

  const totalSales = enrichedArtworks.map((a) => a.sales);
  const maxSales = Math.max(...totalSales, 10);
  const maxFeedback = Math.max(...enrichedArtworks.map((a) => a.feedback), 5);
  const maxNetWorth = Math.max(
    ...enrichedArtists.flatMap((a) => a.netWorth),
    10000
  );

  return (
    <Box sx={{ p: 4, mt: 8, minHeight: "calc(100vh - 64px)" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Analysis
      </Typography>

      <Grid container spacing={2}>
        {/* Top Left: Sales Analysis */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Sales Analysis per Month</Typography>
              {enrichedArtworks.length === 0 ? (
                <Typography>No artworks uploaded yet.</Typography>
              ) : (
                <Box sx={{ mt: 2 }}>
                  {enrichedArtworks.map((art, i) => (
                    <Box key={art.id || i} sx={{ mb: 1 }}>
                      <Typography variant="body2">{art.title}</Typography>
                      <Box
                        sx={{
                          backgroundColor: "#1976d2",
                          height: 20,
                          width: `${(art.sales / maxSales) * 100}%`,
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Top Right: Artist Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Artist Activity per Annum</Typography>
              {enrichedArtists.length === 0 ? (
                <Typography>No artists data.</Typography>
              ) : (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <svg width="200" height="200" viewBox="0 0 32 32">
                    {(() => {
                      let cumulative = 0;
                      return enrichedArtists.map((artist, index) => {
                        const value = artist.activity;
                        cumulative += (value / 100) * 32;
                        return (
                          <circle
                            key={index}
                            r="16"
                            cx="16"
                            cy="16"
                            fill="transparent"
                            stroke={`hsl(${
                              (index * 360) / enrichedArtists.length
                            }, 70%, 50%)`}
                            strokeWidth="32"
                            strokeDasharray={`${value} ${100 - value}`}
                            strokeDashoffset={-cumulative + value}
                          />
                        );
                      });
                    })()}
                  </svg>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Left: Annual Net Worth */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Annual Net Worth</Typography>
              {enrichedArtists.length === 0 ? (
                <Typography>No artists data.</Typography>
              ) : (
                <svg width="100%" height="200">
                  {enrichedArtists.map((artist, index) => {
                    const points = artist.netWorth
                      .map(
                        (n, i) =>
                          `${(i / (artist.netWorth.length - 1)) * 100}%,${
                            200 - (n / maxNetWorth) * 180
                          }`
                      )
                      .join(" ");
                    return (
                      <polyline
                        key={index}
                        points={points}
                        fill="none"
                        stroke={`hsl(${
                          (index * 360) / enrichedArtists.length
                        }, 70%, 50%)`}
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Right: Feedback Histogram */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Feedback of Artwork</Typography>
              {enrichedArtworks.length === 0 ? (
                <Typography>No artworks uploaded yet.</Typography>
              ) : (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {enrichedArtworks.map((art, i) => (
                    <Box
                      key={art.id || i}
                      sx={{
                        width: 20,
                        height: `${(art.feedback / maxFeedback) * 150}px`,
                        backgroundColor: "#f50057",
                        borderRadius: 1,
                      }}
                      title={`${art.title}: ${art.feedback} feedbacks`}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analysis;
