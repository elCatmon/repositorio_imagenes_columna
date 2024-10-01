import React, { useState } from 'react';
import ThumbnailGallery from './ThumbnailGallery';
import DicomViewer from './DicomViewer';
import DatasetDownload from './datasetDownload';
import { useNavigate } from 'react-router-dom'; // For back navigation
import Header from './Header';
import Footer from './Footer';
import '../App.css'; 

function VisualizerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleThumbnailClick = (image) => {
    const fileName = image.split('/').pop().replace('.jpg', '.dcm');
    setSelectedImage(fileName);
  };

  return (
    <div className="visualizer-page">
      <Header/>

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
        <div>
            <DatasetDownload />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VisualizerPage;
