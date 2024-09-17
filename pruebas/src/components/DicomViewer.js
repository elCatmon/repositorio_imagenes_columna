import React, { useState, useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { BASE_URL } from './config';
import { ZoomTool, PanTool, LengthTool, RotateTool } from 'cornerstone-tools';

// Configurar el cargador de imágenes DICOM
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Configurar herramientas
const configureTools = () => {
  cornerstoneTools.addTool(ZoomTool);
  cornerstoneTools.addTool(PanTool);
  cornerstoneTools.addTool(LengthTool);
  cornerstoneTools.addTool(RotateTool); // Asumiendo que existe RotateTool

  cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 }); // Asumiendo que existe RotateTool
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
          configureTools();

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

  const zoomIn = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.scale *= 1.1; // Incrementar el nivel de zoom
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const zoomOut = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.scale /= 1.1; // Decrementar el nivel de zoom
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveLeft = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.x -= 10; // Mover a la izquierda
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveRight = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.x += 10; // Mover a la derecha
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveUp = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.y -= 10; // Mover hacia arriba
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveDown = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.y += 10; // Mover hacia abajo
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const rotateClockwise = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.rotation += 0.5; // Rotar en sentido horario
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const rotateCounterClockwise = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.rotation -= 0.5; // Rotar en sentido antihorario
    cornerstone.setViewport(elementRef.current, viewport);
  };

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
      <div className="tool-buttons" style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
        <button onClick={zoomIn}>
          Zoom +
        </button>
        <button onClick={zoomOut}>
          Zoom -
        </button>
        <button onClick={moveDown}>
          Mover ↑
        </button>
        <button onClick={rotateCounterClockwise}>
          Rotar ←
        </button>
        <button onClick={rotateClockwise}>
          Rotar →
        </button>
        <button onClick={moveRight}>
          Mover ←
        </button>
        <button onClick={moveUp}>
          Mover ↓
        </button>
        <button onClick={moveLeft}>
          Mover →
        </button>
      </div>
    </div>
  );
};

export default DicomViewer;
