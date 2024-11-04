import React, { useState, useEffect, useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { ZoomTool, PanTool, LengthTool, RotateTool } from 'cornerstone-tools';
import Footer from '../assets/Footer';
import Header from '../assets/Header';

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

const DicomViewer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageId, setImageId] = useState(null);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (element && imageId) {
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
    }, [imageId]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const byteArray = new Uint8Array(e.target.result);
                const blob = new Blob([byteArray], { type: 'application/dicom' });
                const url = URL.createObjectURL(blob);
                setImageId(`wadouri:${url}`);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const zoomIn = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.scale *= 1.2; // Incrementar el nivel de zoom
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen después de modificar el viewport
    };
    
    const zoomOut = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.scale /= 1.2; // Decrementar el nivel de zoom
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const moveLeft = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.translation.x -= 20; // Mover a la izquierda
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const moveRight = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.translation.x += 20; // Mover a la derecha
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const moveUp = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.translation.y -= 20; // Mover hacia arriba
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const moveDown = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.translation.y += 20; // Mover hacia abajo
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const rotateClockwise = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.rotation += 0.75; // Rotar en sentido horario
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    
    const rotateCounterClockwise = () => {
        const viewport = cornerstone.getViewport(elementRef.current);
        viewport.rotation -= 0.75; // Rotar en sentido antihorario
        cornerstone.setViewport(elementRef.current, viewport);
        cornerstone.updateImage(elementRef.current); // Actualizar la imagen
    };
    

    return (
        <div className="dicom-viewer-container">
            <div className="next-module">
                <Header />
            </div>
            <div className="next-module" />
            <input type="file" accept=".dcm" onChange={handleFileUpload} style={{ marginBottom: '10px' }} />
            <div className="dicom-viewer-container" style={{ display: 'flex' }}>
                <div className="viewer" style={{ flex: 1, position: 'relative', paddingTop: '75%', marginRight: '10px' }}>
                    <div
                        onContextMenu={(e) => e.preventDefault()}
                        ref={elementRef}
                        className="dicom-viewer"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '30%',
                            height: '30%',
                            backgroundColor: '#fff', // Fondo blanco para el visualizador
                        }}
                    >
                        {loading && <p>Cargando imagen DICOM...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
            </div>

            <div className="tool-buttons" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={zoomIn}>Zoom +</button>
                <button onClick={zoomOut}>Zoom -</button>
                <button onClick={moveDown}>Mover ↑</button>
                <button onClick={rotateCounterClockwise}>Rotar ←</button>
                <button onClick={rotateClockwise}>Rotar →</button>
                <button onClick={moveRight}>Mover ←</button>
                <button onClick={moveUp}>Mover ↓</button>
                <button onClick={moveLeft}>Mover →</button>
            </div>
            <div className="next-module">
                <Footer />
            </div>
        </div>
    );
};

export default DicomViewer;
