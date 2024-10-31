import React, { useState } from 'react';
import ThumbnailGallery from '../Miniaturas/ThumbnailGallery';
import DicomViewer from './DicomViewer';
import DatasetDownload from '../dataset/datasetDownload';
import { useNavigate } from 'react-router-dom'; // For back navigation
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import '../assets/App.css'; 

function VisualizerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailClick = (image) => {
    const fileName = image.split('/').pop().replace('.jpg', '.dcm');
    setSelectedImage(fileName);
  };

  return (
    <div className="visualizer-page">
        <div className="next-module">
        <Header/>
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
      <Footer />
    </div>
  );
}

export default VisualizerPage;
