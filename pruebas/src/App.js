import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import DicomViewer from './components/DicomViewer';
import ThumbnailGallery from './components/ThumbnailGallery';
import Donaciones from './components/Donacion'; // Asegúrate de que el nombre es correcto
import Importar from './components/Importar'; // Importa el nuevo componente
import './App.css'; // Asegúrate de que el CSS se está importando correctamente

function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleThumbnailClick = (image) => {
    const fileName = image.split('/').pop().replace('.jpg', '.dcm');
    setSelectedImage(fileName);
  };

  return (
    <div className="app-container">
      <h1>Prueba de webservice</h1>
      <Register />
      <Login />
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

      {/* Aquí se agrega el componente Donaciones debajo de ThumbnailGallery y DicomViewer */}
      <div className="donaciones-section">
        <Donaciones />
      </div>

      {/* Aquí se agrega el nuevo formulario */}
      <div className="importar-section">
        <Importar />
      </div>
    </div>
  );
}

export default App;
