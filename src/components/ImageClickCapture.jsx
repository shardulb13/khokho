import React, { useRef, useState } from 'react';

const ImageClickCapture = () => {
  const imageRef = useRef(null);
  const [popup, setPopup] = useState({ show: false, x: 0, y: 0 });

  const handleClick = (e) => {
    const img = imageRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Ensure click is within image bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

     // Safely get and parse stored clicks
     let existing = [];
     try {
       const stored = localStorage.getItem('imageClickCoordinates');
       existing = stored ? JSON.parse(stored) : [];
       if (!Array.isArray(existing)) existing = [];
     } catch (err) {
       console.error("Failed to parse localStorage data", err);
       existing = [];
     }

     const updated = [...existing, { x, y }];
     localStorage.setItem('imageClickCoordinates', JSON.stringify(updated));
    // Show popup
    setPopup({ show: true, x, y });
  };

  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', position: 'relative' }}>
      <img
        ref={imageRef}
        src='khokho.jpg'
        alt="Clickable"
        onClick={handleClick}
        style={{ width: '50%', maxWidth: '100%', cursor: 'crosshair' }}
      />

      {popup.show && (
        <div
          style={{
            position: 'absolute',
            top: popup.y + 20,
            left: popup.x + 20,
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <p><strong>Clicked at:</strong></p>
          <p>X: {popup.x}px</p>
          <p>Y: {popup.y}px</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ImageClickCapture;