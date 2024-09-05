import React, { useState, useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

// Configurar el cargador de imágenes DICOM
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Registrar herramientas
cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
cornerstoneTools.addTool(cornerstoneTools.MagnifyTool);

const DicomTestViewer = () => {
  const [error, setError] = useState(null);
  const elementRef = useRef(null);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      cornerstone.enable(element);

      if (imageId) {
        cornerstone.loadImage(imageId).then((image) => {
          cornerstone.displayImage(element, image);
          // Activar herramientas
          cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
          cornerstoneTools.setToolActive('Magnify', { mouseButtonMask: 1 });
        }).catch((error) => {
          setError('Error al cargar la imagen DICOM.');
          console.error('Error al cargar la imagen:', error);
        });
      }

      return () => {
        cornerstone.disable(element);
      };
    }
  }, [imageId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Crea una URL para el archivo y usa el prefijo adecuado
      const url = URL.createObjectURL(file);
      const newImageId = `wadouri:${url}`;
      setImageId(newImageId);
    }
  };

  return (
    <div>
      <input type="file" accept=".dcm" onChange={handleFileChange} />
      <div
        ref={elementRef}
        style={{ width: '100%', height: '500px' }}
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default DicomTestViewer;
