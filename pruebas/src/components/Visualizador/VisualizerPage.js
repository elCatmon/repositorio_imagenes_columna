import React, { useState, useEffect } from 'react';
import ThumbnailGallery from '../Miniaturas/ThumbnailGallery';
import DicomViewer from './DicomViewer';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import '../assets/App.css';
import { useAuth } from '../../AuthContext'; // Asegúrate de que la ruta sea correcta

function VisualizerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Usa el contexto de autenticación

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  const handleThumbnailClick = (image) => {
    const fileName = image.split('/').pop().replace('.jpg', '.dcm');
    setSelectedImage(fileName);
  };

  return (
    <div className="visualizer-page">
      <div className="next-module">
        <Header />
      </div>
      <div className="content">
        <div className="thumbnail-gallery">
          <ThumbnailGallery onThumbnailClick={handleThumbnailClick} />
        </div>
        <div className="dicom-viewer">
          {selectedImage ? (
            <DicomViewer fileName={selectedImage} />
          ) : (
            <p>Selecciona una miniatura para ver la imagen DICOM.</p>
          )}
        </div>
      </div>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default VisualizerPage;
