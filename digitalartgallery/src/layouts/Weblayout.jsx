import React from "react";
import bg2 from "../assets/bg2.webp"; // adjust path to assets

const Weblayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh", // start with full viewport height but allow growth
        width: "100vw",
        position: "relative",
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent black overlay
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Weblayout;
