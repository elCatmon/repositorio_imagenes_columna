import React, { useState, useEffect } from 'react';
import cv from 'opencv.js';
import Header from '../assets/Header';
import Footer from '../assets/Footer';

const Editor = () => {
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [exposure, setExposure] = useState(0.15);
    const [contrast, setContrast] = useState(0.1);
    const [brightness, setBrightness] = useState(-0.1);
    const [shadows, setShadows] = useState(0.5);
    const [whites, setWhites] = useState(-0.3);
    const [blacks, setBlacks] = useState(0.2);
    const [texture, setTexture] = useState(4);
    const [clarity, setClarity] = useState(0.2);

    useEffect(() => {
        if (image) {
            processImage();
        }
    }, [image, exposure, contrast, brightness, shadows, whites, blacks, texture, clarity]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Resize image if necessary
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const ratio = Math.min(800 / img.width, 800 / img.height);
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    setImage(canvas.toDataURL());
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = () => {
        try {
            const imgData = getImageData(image);
            const mat = cv.matFromImageData(imgData);
            let processedMat = mat.clone();

            // Apply adjustments
            processedMat = ajustarExposicion(processedMat, exposure);
            processedMat = ajustarContraste(processedMat, contrast);
            processedMat = ajustarIluminaciones(processedMat, brightness);
            processedMat = ajustarSombras(processedMat, shadows);
            processedMat = ajustarBlancos(processedMat, whites);
            processedMat = ajustarNegros(processedMat, blacks);
            processedMat = ajustarTextura(processedMat, texture);
            processedMat = ajustarClaridad(processedMat, clarity);

            // Ensure processedMat is in the correct format
            if (processedMat.channels() === 1) {
                const bgrMat = new cv.Mat();
                cv.cvtColor(processedMat, bgrMat, cv.COLOR_GRAY2BGR);
                processedMat.delete(); // Release the grayscale mat
                processedMat = bgrMat; // Use the converted BGR mat
            }

            // Optionally improve white balance, if necessary
            processedMat = mejorarBalanceBlancos(processedMat);

            // Encoding the image
            const buf = new cv.Mat();
            cv.imencode('.png', processedMat, buf);

            const outputImage = `data:image/png;base64,${buf.toString()}`;
            setProcessedImage(outputImage);

            // Clean up
            mat.delete();
            processedMat.delete();
            buf.delete();
        } catch (error) {
            console.error("An error occurred while processing the image:", error);
        }
    };

    const getImageData = (imgSrc) => {
        const img = new Image();
        img.src = imgSrc;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, img.width, img.height);
    };

    const convertirABN = (mat) => {
        cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY);
        return mat;
    };

    const mejorarBalanceBlancos = (mat) => {
        // Placeholder for balance white improvements
        return mat;
    };

    const ajustarExposicion = (mat, valor) => {
        let dst = new cv.Mat();
        cv.add(mat, new cv.Mat(mat.rows, mat.cols, mat.type(), new cv.Scalar(valor * 255, valor * 255, valor * 255)), dst);
        return dst;
    };

    const ajustarContraste = (mat, valor) => {
        let dst = new cv.Mat();
        cv.convertScaleAbs(mat, dst, 1 + valor, 0);
        return dst;
    };

    const ajustarIluminaciones = (mat, valor) => {
        let dst = new cv.Mat();
        cv.convertScaleAbs(mat, dst, 1, -valor);
        return dst;
    };

    const ajustarSombras = (mat, valor) => {
        let dst = new cv.Mat();
        cv.add(mat, new cv.Mat(mat.rows, mat.cols, mat.type(), new cv.Scalar(valor, valor, valor)), dst);
        return dst;
    };

    const ajustarBlancos = (mat, valor) => {
        let dst = new cv.Mat();
        cv.add(mat, new cv.Mat(mat.rows, mat.cols, mat.type(), new cv.Scalar(valor, valor, valor)), dst);
        return dst;
    };

    const ajustarNegros = (mat, valor) => {
        let dst = new cv.Mat();
        cv.subtract(mat, new cv.Mat(mat.rows, mat.cols, mat.type(), new cv.Scalar(valor, valor, valor)), dst);
        return dst;
    };

    const ajustarTextura = (mat, valor) => {
        let dst = new cv.Mat();
        cv.GaussianBlur(mat, dst, new cv.Size(0, 0), valor);
        return dst;
    };

    const ajustarClaridad = (mat, valor) => {
        let dst = new cv.Mat();
        cv.addWeighted(mat, 1 + valor / 100.0, mat, -valor / 100.0, 0, dst);
        return dst;
    };

    return (
        <div>
            <Header />
            <div>
                <h1>Procesador de Imágenes</h1>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {image && <img src={image} alt="Cargada" />}
                {processedImage && <img src={processedImage} alt="Procesada" />}
            </div>
            <div>
                <label>Exposición:</label>
                <input type="range" min="-1" max="1" step="0.01" value={exposure} onChange={(e) => setExposure(parseFloat(e.target.value))} />
                <label>Contraste:</label>
                <input type="range" min="-1" max="1" step="0.01" value={contrast} onChange={(e) => setContrast(parseFloat(e.target.value))} />
                <label>Brillo:</label>
                <input type="range" min="-1" max="1" step="0.01" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} />
                <label>Sombra:</label>
                <input type="range" min="-1" max="1" step="0.01" value={shadows} onChange={(e) => setShadows(parseFloat(e.target.value))} />
                <label>Blancos:</label>
                <input type="range" min="-1" max="1" step="0.01" value={whites} onChange={(e) => setWhites(parseFloat(e.target.value))} />
                <label>Negros:</label>
                <input type="range" min="-1" max="1" step="0.01" value={blacks} onChange={(e) => setBlacks(parseFloat(e.target.value))} />
                <label>Textura:</label>
                <input type="range" min="0" max="10" step="0.1" value={texture} onChange={(e) => setTexture(parseFloat(e.target.value))} />
                <label>Claridad:</label>
                <input type="range" min="-1" max="1" step="0.01" value={clarity} onChange={(e) => setClarity(parseFloat(e.target.value))} />
            </div>
            <Footer />
        </div>
    );
};

export default Editor;
