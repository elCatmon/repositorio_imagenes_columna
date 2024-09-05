import React, { useState, useEffect } from 'react';
import { BASE_URL } from './config';

const ThumbnailGallery = ({ onThumbnailClick }) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/thumbnails`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
        setLoaded(true);
      } else {
        setError('Error al obtener las imágenes');
      }
    } catch (error) {
      setError('Error en la solicitud de imágenes: ' + error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="thumbnail-gallery-container">
      <h2 className="thumbnail-gallery-header">Imágenes DICOM</h2>
      {loaded ? (
        <div style={galleryStyle}>
          {images.map((image, index) => (
            <div
              key={index}
              style={thumbnailContainerStyle}
              onClick={() => onThumbnailClick(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                style={thumbnailStyle}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando imágenes...</p>
      )}
    </div>
  );
};

// Estilos para la galería de miniaturas
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '10px',
  maxWidth: '100%',
  overflow: 'auto',
};

// Estilo para cada contenedor de miniaturas
const thumbnailContainerStyle = {
  width: '100%',
  height: '100%',
  cursor: 'pointer',
};

// Estilo para las miniaturas
const thumbnailStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

export default ThumbnailGallery;
