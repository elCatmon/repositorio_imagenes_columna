import React from 'react';

const Video = () => {
  return (
    <div style={{ 
      border: '8px solid #ccc', // Cambia el color y el grosor del borde aquí
      borderRadius: '5px',      // Agrega esquinas redondeadas si lo deseas
      padding: '5px',          // Espaciado interno alrededor del iframe
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: '15px 0' 
    }}>
            <iframe width="820" height="461" 
            src="https://www.youtube.com/embed/CMIg3z9bVVE?si=WjineC6ZwdkKX1Sn" 
            title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  );
};

export default Video;