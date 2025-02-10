import React, { useState, useEffect } from 'react';

const MouseDotEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x - 10,
        top: position.y - 10,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#2D5FB6', // Your theme color
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference', // Creates an interesting interaction with background
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out',
        boxShadow: '0 0 10px rgba(134, 194, 50, 0.5)'
      }}
    />
  );
};

export default MouseDotEffect;