import React, { useState, useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { BASE_URL } from '../config/config';
import { ZoomTool, PanTool, LengthTool, RotateTool } from 'cornerstone-tools';

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const configureTools = () => {
  cornerstoneTools.addTool(ZoomTool);
  cornerstoneTools.addTool(PanTool);
  cornerstoneTools.addTool(LengthTool);
  cornerstoneTools.addTool(RotateTool);

  cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Rotate', { mouseButtonMask: 1 });
};

const DicomViewer = ({ fileName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const jpgUrl = `${BASE_URL}/convertDicomToJpg/${fileName}`;

    const loadImage = async () => {
      setLoading(true);
      setError(null);

      try {
        cornerstone.enable(element);
        configureTools();

        const image = await cornerstone.loadImage(jpgUrl);
        cornerstone.displayImage(element, image);
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
      } catch (error) {
        setError('Error loading the converted JPG image.');
      } finally {
        setLoading(false);
      }
    };

    if (element && fileName) loadImage();

    return () => {
      if (element) {
        cornerstone.disable(element);
      }
    };
  }, [fileName]);

  const zoomIn = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.scale *= 1.2;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const zoomOut = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.scale /= 1.2;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveLeft = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.x -= 10;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveRight = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.x += 10;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveUp = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.y -= 10;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const moveDown = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.translation.y += 10;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const rotateClockwise = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.rotation += 0.75;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  const rotateCounterClockwise = () => {
    const viewport = cornerstone.getViewport(elementRef.current);
    viewport.rotation -= 0.75;
    cornerstone.setViewport(elementRef.current, viewport);
  };

  return (
    <div className="dicom-viewer-container">
      <div ref={elementRef} className="dicom-viewer" style={{ width: '100%', height: '100%' }}>
        {loading && <p>Cargando imagen JPG...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      
      <div className="tool-buttons" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={zoomIn}>Zoom +</button>
        <button onClick={zoomOut}>Zoom -</button>
        <button onClick={moveUp}>Mover ↑</button>
        <button onClick={moveDown}>Mover ↓</button>
        <button onClick={moveLeft}>Mover ←</button>
        <button onClick={moveRight}>Mover →</button>
        <button onClick={rotateClockwise}>Rotar →</button>
        <button onClick={rotateCounterClockwise}>Rotar ←</button>
      </div>
    </div>
  );
};

export default DicomViewer;
