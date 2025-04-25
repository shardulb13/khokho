import React, { useEffect, useRef, useState } from 'react';

const ImageMarkerOverlay = () => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  const updateMarkerPositions = () => {
    const img = imageRef.current;
    if (!img) return;

    const width = img.offsetWidth;
    const height = img.offsetHeight;

    try {
      const stored = localStorage.getItem('imageClickCoordinates');
      const coords = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(coords)) return;

      // Convert percentages to pixels based on actual image size
      const scaledMarkers = coords.map(point => ({
        x: (point.x / 100) * width,
        y: (point.y / 100) * height,
      }));

      setMarkers(scaledMarkers);
    } catch (err) {
      console.error('Failed to load markers:', err);
    }
  };

  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete) {
      updateMarkerPositions();
    }

    window.addEventListener('resize', updateMarkerPositions);
    return () => window.removeEventListener('resize', updateMarkerPositions);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 'fit-content',
        margin: '2rem auto',
      }}
    >
      <img
        ref={imageRef}
        src="khokho.jpg"
        alt="Marked"
        onLoad={updateMarkerPositions}
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />

      {markers.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${point.y}px`,
            left: `${point.x}px`,
            width: '14px',
            height: '14px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default ImageMarkerOverlay;
