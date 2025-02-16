import React from "react";
import "../styles/Loader.css"; // Ensure this file exists

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
      <div className="dot dot4"></div>
    </div>
  );
};

export default Loader;
