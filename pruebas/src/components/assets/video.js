import React from 'react';

const Video = () => {
  return (
    <div style={{
      border: '8px solid #ccc',
      borderRadius: '5px',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '820px',      // Limits the width to 820px
      margin: '15px auto',    // Centers the container horizontally
      padding: '5px'
    }}>
      <div style={{
        position: 'relative',
        paddingTop: '56.25%', // Aspect ratio for 16:9
      }}>
        <iframe
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          src="https://www.youtube.com/embed/CMIg3z9bVVE?si=WjineC6ZwdkKX1Sn"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
