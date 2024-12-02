import React, { useState } from 'react';
import ThumbnailGallery from '../Miniaturas/ThumbnailGallery';
import DicomViewer from '../Visualizador/DicomViewer';
import { useNavigate } from 'react-router-dom'; // For back navigation
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import Diagnosticos from './Diagnosticos'
import '../assets/App.css';

function DiagnosticosPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageD, setSelectedImageD] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailClick = (image) => {
    const fileName = image.split('/').pop().replace('.jpg', '.dcm');
    setSelectedImage(fileName);
    setSelectedImageD(image); // Verifica que este valor sea el esperado
  };


  return (
    <div className="visualizer-page">
      <div className="next-module">
        <Header />
      </div>
      <div className="next-module" />
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
        <div className="study-info">
          {selectedImageD ? (
            <Diagnosticos selectedFile={selectedImageD} />
          ) : (
            <p>Selecciona una miniatura para emitir un diagnostico.</p>
          )}
        </div>

      </div>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default DiagnosticosPage;
