import React, { useEffect, useRef, useState } from 'react';

const ImageMarkerOverlay = () => {
  const imageRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('imageClickCoordinates');
      const parsed = stored ? JSON.parse(stored) : [];
      if (Array.isArray(parsed)) {
        setMarkers(parsed);
      }
    } catch (err) {
      console.error('Error parsing coordinates:', err);
    }
  }, []);

  return (
    <div style={{textAlign: 'center', marginTop: '2rem', position: 'relative'  }}>
      <img
        ref={imageRef}
        src='khokho.jpg'
        alt="Marked"
        style={{ width: '50%', display: 'block', maxWidth: '100%' }}
      />

      {markers.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: point.y,
            left: point.x,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            // transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', // allow clicks to pass through
          }}
        />
      ))}
    </div>
  );
};

export default ImageMarkerOverlay;
