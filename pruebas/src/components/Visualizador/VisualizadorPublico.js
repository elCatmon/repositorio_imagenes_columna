import React, { useState, useRef, useEffect } from 'react';
import { DICOMWEB } from 'dcmjs';

const DicomViewer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (imageIds.length > 0) {
            loadImage();
        }
    }, [imageIds, currentImageIndex]);

    const loadImage = async () => {
        setLoading(true);
        setError(null);
        try {
            const dicomUrl = imageIds[currentImageIndex];
            const response = await fetch(dicomUrl);
            const dicomArrayBuffer = await response.arrayBuffer();
            const dicomData = new DICOMWEB.DicomMessage(dicomArrayBuffer);
            const imageData = dicomData.dataSet;
            const pixelData = imageData.get('PixelData').value;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Assuming the DICOM data includes a 2D array of pixel data
            // and that imageData contains metadata like width/height
            const imageWidth = imageData.get('Columns').value;
            const imageHeight = imageData.get('Rows').value;

            const image = new ImageData(new Uint8ClampedArray(pixelData), imageWidth, imageHeight);
            ctx.putImageData(image, 0, 0);
        } catch (err) {
            setError('Error loading DICOM image');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const imageIdsArray = files.map(file => URL.createObjectURL(file));
            setImageIds(imageIdsArray);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        if (currentImageIndex < imageIds.length - 1) {
            setCurrentImageIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <div>
            <input type="file" accept=".dcm" multiple onChange={handleFileUpload} />
            <canvas ref={canvasRef} width={600} height={600}></canvas>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={prevImage}>Previous</button>
            <button onClick={nextImage}>Next</button>
        </div>
    );
};

export default DicomViewer;
