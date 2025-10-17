import React from "react";
import { useNavigate } from "react-router-dom";

// Import local images
import exhibition1 from "../assets/exhibition1.png";
import exhibition2 from "../assets/exhibition2.jpg";
import exhibition3 from "../assets/exhibition3.jpeg";

import artist1 from "../assets/artist1.jpeg";
import artist2 from "../assets/artist2.jpeg";
import artist3 from "../assets/artist3.jpeg";
import artist4 from "../assets/artist4.webp";
import artist5 from "../assets/artist5.jpg";
import artist6 from "../assets/artist6.jpeg";
import artist7 from "../assets/artist7.webp";
import artist8 from "../assets/artist8.avif";
import artist9 from "../assets/artist9.jpg";

export default function IntroPage() {
  const navigate = useNavigate();

  const trendingExhibitions = [
    { id: 1, img: exhibition1 },
    { id: 2, img: exhibition2 },
    { id: 3, img: exhibition3 },
  ];

  const famousArtists = [
    { id: 1, img: artist1, name: "Eva Rostova" },
    { id: 2, img: artist2, name: "Kenji Tanaka" },
    { id: 3, img: artist3, name: "Maria Gonzalez" },
    { id: 4, img: artist4, name: "Liam Patel" },
    { id: 5, img: artist5, name: "Sofia Kim" },
    { id: 6, img: artist6, name: "Noah Smith" },
    { id: 7, img: artist7, name: "Ava Chen" },
    { id: 8, img: artist8, name: "Ethan Johnson" },
    { id: 9, img: artist9, name: "Mia Lopez" },
  ];

  const scrollContainerStyle = {
    display: "flex",
    gap: "1rem",
    overflowX: "auto",
    paddingBottom: "1rem",
  };

  const cardStyle = {
    minWidth: "320px",
    height: "440px",
    borderRadius: "1rem",
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    cursor: "pointer",
    transition: "transform 0.35s ease",
    objectFit: "cover",
    flexShrink: 0,
  };

  const artistStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "9999px",
    objectFit: "cover",
    cursor: "pointer",
    transition: "transform 0.25s ease",
    flexShrink: 0,
    boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
  };

  const buttonStyle = {
    padding: "1rem 1.6rem",
    fontSize: "1rem",
    fontWeight: 700,
    borderRadius: "9999px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.25s ease",
    border: "none",
    color: "#fff",
  };

  const leftButtonStyle = {
    ...buttonStyle,
    background: "#2b21ff",
  };
  const rightButtonStyle = {
    ...buttonStyle,
    background: "#ff3fa7",
  };

  return (
    <div style={{ width: "100%", fontFamily: "'Helvetica Neue', sans-serif", color: "#f1f7fb" }}>
      {/* HERO */}
      <section
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            width: "90%",
            padding: "2rem 2.4rem",
            borderRadius: 18,
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.71)", // black with 50% transparency
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              color: "#fff", // text color
              display: "inline-block",
            }}
          >
            <h1 style={{ fontSize: "4rem", fontWeight: 800, margin: 0 }}>
              Digital Art Display
            </h1>
            <p style={{ fontSize: "1.15rem", marginTop: "1rem", maxWidth: 900, margin: "0 auto" }}>
              Artiquarium brings gallery-level curation to the browser. Walk through virtual
              exhibitions, discover trending collections, and connect directly with artists from wherever you are.
            </p>
          </div>

          <div style={{ marginTop: 26, display: "flex", gap: 14, justifyContent: "center" }}>
            <button
              style={leftButtonStyle}
              onClick={() => navigate("/home")}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Discover Exhibitions
            </button>

            <button
              style={rightButtonStyle}
              onClick={() => navigate("/signup")}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Become an Artist
            </button>
          </div>
        </div>
      </section>

      {/* Trending Exhibitions */}
      <section style={{ width: "100%", padding: "4rem 2rem", background: "rgba(7,12,20,0.48)" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 20, textAlign: "center" }}>
          Trending Exhibitions
        </h2>
        <div style={scrollContainerStyle}>
          {trendingExhibitions.map((exhibition) => (
            <img
              key={exhibition.id}
              src={exhibition.img}
              alt={`Exhibition ${exhibition.id}`}
              style={cardStyle}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <div
            style={leftButtonStyle}
            onClick={() => navigate("/home")}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Discover Exhibitions
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section style={{ width: "100%", padding: "4rem 2rem", background: "rgba(7,12,20,0.48)" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 20, textAlign: "center" }}>
          Featured Artists
        </h2>

        {/* Artists in 2 rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[0, 1].map((row) => (
            <div key={row} style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
              {famousArtists.slice(row * 5, row * 5 + 5).map((artist) => (
                <div
                  key={artist.id}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                >
                  <img
                    src={artist.img}
                    alt={artist.name}
                    style={artistStyle}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ color: "#dbeeff", fontWeight: 700 }}>{artist.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <div
            style={rightButtonStyle}
            onClick={() => navigate("/signup")}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Become an Artist
          </div>
        </div>
      </section>
    </div>
  );
}
