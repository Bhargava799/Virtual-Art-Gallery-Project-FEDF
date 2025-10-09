import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const ExhibitionAnalysis = ({ exhibitions }) => {
  const maxViews = Math.max(...exhibitions.map((ex) => ex.views || 0), 10);
  const maxLikes = Math.max(...exhibitions.map((ex) => ex.likes || 0), 5);
  const maxImages = Math.max(...exhibitions.map((ex) => ex.images.length || 1), 1);

  return (
    <Box sx={{ p: 4, mt: 8, minHeight: "calc(100vh - 64px)" }}>
      <Typography variant="h4" gutterBottom>
        Exhibition Analysis
      </Typography>

      <Grid container spacing={2}>
        {/* Top Left: Views Analysis (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Exhibition Views</Typography>
              <Box sx={{ mt: 2 }}>
                {exhibitions.length === 0 ? (
                  <Typography>No exhibitions available.</Typography>
                ) : (
                  exhibitions.map((ex) => (
                    <Box key={ex.id} sx={{ mb: 1 }}>
                      <Typography variant="body2">{ex.title}</Typography>
                      <Box
                        sx={{
                          backgroundColor: "#1976d2",
                          height: 20,
                          width: `${((ex.views || 0) / maxViews) * 100}%`,
                          borderRadius: 1,
                        }}
                      />
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Right: Likes Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Exhibition Likes</Typography>
              {exhibitions.length === 0 ? (
                <Typography>No exhibitions available.</Typography>
              ) : (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <svg width="200" height="200" viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)" }}>
                    {(() => {
                      const totalLikes = exhibitions.reduce((sum, ex) => sum + (ex.likes || 0), 0) || 1;
                      let cumulative = 0;
                      return exhibitions.map((ex, index) => {
                        const value = ex.likes || 0;
                        const startAngle = (cumulative / totalLikes) * 2 * Math.PI;
                        const endAngle = ((cumulative + value) / totalLikes) * 2 * Math.PI;
                        cumulative += value;

                        const x1 = Math.cos(startAngle);
                        const y1 = Math.sin(startAngle);
                        const x2 = Math.cos(endAngle);
                        const y2 = Math.sin(endAngle);
                        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

                        const pathData = `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                        return (
                          <path
                            key={index}
                            d={pathData}
                            fill={`hsl(${(index * 360) / exhibitions.length}, 70%, 50%)`}
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

        {/* Bottom Left: Number of Images (Bar Chart) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Number of Images per Exhibition</Typography>
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-end", height: 150, gap: 1 }}>
                {exhibitions.map((ex) => (
                  <Box
                    key={ex.id}
                    sx={{
                      width: `${100 / exhibitions.length}%`,
                      height: `${((ex.images.length || 1) / maxImages) * 100}%`,
                      backgroundColor: "#1976d2",
                      borderRadius: 1,
                    }}
                    title={`${ex.title}: ${ex.images.length} images`}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Right: Likes Histogram */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Exhibition Likes Histogram</Typography>
              <Box sx={{ mt: 2, display: "flex", alignItems: "flex-end", gap: 1 }}>
                {exhibitions.map((ex) => (
                  <Box
                    key={ex.id}
                    sx={{
                      width: 20,
                      height: `${((ex.likes || 0) / maxLikes) * 150}px`,
                      backgroundColor: "#f50057",
                      borderRadius: 1,
                    }}
                    title={`${ex.title}: ${ex.likes || 0} likes`}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExhibitionAnalysis;
