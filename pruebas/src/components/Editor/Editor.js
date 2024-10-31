import React, { useState } from 'react';
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
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
            if (!imgData) return;
            const mat = cv.matFromImageData(imgData);
            let processedMat = mat.clone();

            processedMat = ajustarExposicion(processedMat, exposure);
            processedMat = ajustarContraste(processedMat, contrast);
            processedMat = ajustarIluminaciones(processedMat, brightness);
            processedMat = ajustarSombras(processedMat, shadows);
            processedMat = ajustarBlancos(processedMat, whites);
            processedMat = ajustarNegros(processedMat, blacks);
            processedMat = ajustarTextura(processedMat, texture);
            processedMat = ajustarClaridad(processedMat, clarity);

            if (processedMat.channels() === 1) {
                const bgrMat = new cv.Mat();
                cv.cvtColor(processedMat, bgrMat, cv.COLOR_GRAY2BGR);
                processedMat.delete();
                processedMat = bgrMat;
            }

            processedMat = mejorarBalanceBlancos(processedMat);

            const buf = new cv.Mat();
            cv.imencode('.png', processedMat, buf);

            const outputImage = `data:image/png;base64,${buf.toString()}`;
            setProcessedImage(outputImage);

            mat.delete();
            processedMat.delete();
            buf.delete();
        } catch (error) {
            console.error("An error occurred while processing the image:", error);
        }
    };

    const getImageData = (imgSrc) => {
        if (!imgSrc) return null;
        const img = new Image();
        img.src = imgSrc;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        return ctx.getImageData(0, 0, img.width, img.height);
    };

    const ajustarExposicion = (mat, valor) => { /* ... */ };
    const ajustarContraste = (mat, valor) => { /* ... */ };
    const ajustarIluminaciones = (mat, valor) => { /* ... */ };
    const ajustarSombras = (mat, valor) => { /* ... */ };
    const ajustarBlancos = (mat, valor) => { /* ... */ };
    const ajustarNegros = (mat, valor) => { /* ... */ };
    const ajustarTextura = (mat, valor) => { /* ... */ };
    const ajustarClaridad = (mat, valor) => { /* ... */ };
    const mejorarBalanceBlancos = (mat) => { return mat; };

    return (
        <div>
        <div className="next-module">
        <Header/>
        </div>
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
                <button onClick={processImage}>Aplicar Cambios</button>
            </div>
            <Footer />
        </div>
    );
};

export default Editor;
