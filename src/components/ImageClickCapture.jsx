import React, { useRef, useState } from 'react';

const ImageClickCapture = () => {
  const imageRef = useRef(null);
  const [popup, setPopup] = useState({ show: false, x: 0, y: 0 });

  const handleClick = (e) => {
    const img = imageRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (clickX < 0 || clickY < 0 || clickX > rect.width || clickY > rect.height) return;

    const xPercent = (clickX / rect.width) * 100;
    const yPercent = (clickY / rect.height) * 100;

    let existing = [];
    try {
      const stored = localStorage.getItem('imageClickCoordinates');
      existing = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(existing)) existing = [];
    } catch (err) {
      existing = [];
    }

    const updated = [...existing, { x: xPercent, y: yPercent }];
    localStorage.setItem('imageClickCoordinates', JSON.stringify(updated));

    setPopup({ show: true, x: xPercent, y: yPercent });


    setTimeout(() => {
      setPopup(prev => ({ ...prev, show: false }));
    }, 1000);
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
        style={{ maxWidth: '100%', cursor: 'crosshair' }}
      />

      {popup.show && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '25%',
            // transform: 'translateX(-50%)',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 10,
          }}
        >
          <p><strong>Clicked at:</strong></p>
          <p>X: {popup.x.toFixed(2)}%</p>
          <p>Y: {popup.y.toFixed(2)}%</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ImageClickCapture;
