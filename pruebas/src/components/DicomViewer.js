import React, { useState, useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { BASE_URL } from './config';
import { ZoomTool } from 'cornerstone-tools';


// Configurar el cargador de imágenes DICOM
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Configurar herramientas
const configureTools = () => {
  cornerstoneTools.addTool(ZoomTool);
  cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
    configuration: {
      invert: false,
      preventZoomOutsideImage: false,
      minScale: 0.1,
      maxScale: 20.0,
    }
  });
};

const DicomViewer = ({ fileName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    if (element && fileName) {
      const imageId = `wadouri:${BASE_URL}/image/${fileName}`;

      const loadImage = async () => {
        setLoading(true);
        setError(null);

        try {
          cornerstone.enable(element);

          // Configura herramientas aquí
          configureTools();

          // Cargar y mostrar la imagen
          const image = await cornerstone.loadImage(imageId);
          cornerstone.displayImage(element, image);

          // Activar la herramienta de zoom por defecto
          cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });

        } catch (error) {
          setError('Error al cargar la imagen DICOM.');
        } finally {
          setLoading(false);
        }
      };

      loadImage();

      return () => {
        if (element) {
          cornerstone.disable(element);
        }
      };
    }
  }, [fileName]);

  return (
    <div className="dicom-viewer-container">
      <div
        ref={elementRef}
        className="dicom-viewer"
        style={{ width: '100%', height: '100%' }}
      >
        {loading && <p>Cargando imagen DICOM...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="tool-buttons">
        <button
          onClick={() => {
            cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
          }}
        >
          Zoom
        </button>
      </div>
    </div>
  );
};

export default DicomViewer;
