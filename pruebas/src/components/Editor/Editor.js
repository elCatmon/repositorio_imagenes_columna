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

    const processImage = async () => {
        try {
            console.log("Starting image processing...");
    
            const imgData = await getImageData(image);
            if (!imgData) {
                console.error("Image data is null or undefined.");
                return;
            }
            console.log("Image data retrieved:", imgData);
    
            if (typeof cv === 'undefined') {
                console.error("OpenCV has not been loaded correctly.");
                return;
            }
            console.log("OpenCV is loaded.");
    
            const mat = cv.matFromImageData(imgData);
            if (!mat || mat.empty()) {
                console.error("The Mat object could not be created from image data.");
                return;
            }
            console.log("Mat object created from image data.");
    
            let processedMat = mat.clone();
            if (!processedMat || processedMat.empty()) {
                console.error("The processedMat object could not be cloned from mat.");
                mat.delete();
                return;
            }
            console.log("ProcessedMat object cloned from Mat.");
    
            // Procesa la imagen con los ajustes
            processedMat = ajustarExposicion(processedMat, exposure);
            console.log("After adjusting exposure:", processedMat);
    
            processedMat = ajustarContraste(processedMat, contrast);
            console.log("After adjusting contrast:", processedMat);
    
            processedMat = ajustarIluminaciones(processedMat, brightness);
            console.log("After adjusting brightness:", processedMat);
    
            processedMat = ajustarSombras(processedMat, shadows);
            console.log("After adjusting shadows:", processedMat);
    
            processedMat = ajustarBlancos(processedMat, whites);
            console.log("After adjusting whites:", processedMat);
    
            processedMat = ajustarNegros(processedMat, blacks);
            console.log("After adjusting blacks:", processedMat);
    
            /*processedMat = ajustarTextura(processedMat, texture);
            console.log("After adjusting texture:", processedMat);*/
    
            processedMat = ajustarClaridad(processedMat, clarity);
            console.log("After adjusting clarity:", processedMat);
    
            if (!processedMat || processedMat.empty()) {
                console.error("processedMat is invalid after adjustments.");
                mat.delete();
                return;
            }
    
            if (processedMat.channels() === 1) {
                console.log("ProcessedMat is grayscale. Converting to BGR...");
                const bgrMat = new cv.Mat();
                cv.cvtColor(processedMat, bgrMat, cv.COLOR_GRAY2BGR);
                processedMat.delete();
                processedMat = bgrMat;
            }
    
            console.log("Applying white balance...");
            processedMat = mejorarBalanceBlancos(processedMat);
    
            const buf = new cv.Mat();
            cv.imencode('.png', processedMat, buf);
    
            const outputImage = `data:image/png;base64,${buf.toString()}`;
            console.log("Image encoding completed.");
            setProcessedImage(outputImage);
    
            // Liberar memoria
            mat.delete();
            processedMat.delete();
            buf.delete();
            console.log("Image processing completed and memory freed.");
    
        } catch (error) {
            console.error("An error occurred while processing the image:", error);
        }
    };
       

    const getImageData = (imgSrc) => {
        return new Promise((resolve, reject) => {
            console.log("Creating new Image object...");
            const img = new Image();
            
            img.src = imgSrc;
            console.log("Image source set to:", imgSrc);
    
            img.onload = () => {
                console.log("Image loaded successfully.");
                console.log("Image dimensions:", img.width, "x", img.height);
    
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                console.log("Canvas created with dimensions:", canvas.width, "x", canvas.height);
    
                ctx.drawImage(img, 0, 0);
                console.log("Image drawn to canvas.");
    
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                console.log("Image data retrieved:", imageData);
    
                resolve(imageData);
            };
    
            img.onerror = (error) => {
                console.error("Error loading image:", error);
                reject(error);
            };
        });
    };
    
    
    const ajustarExposicion = (mat, valor) => {
        const newMat = new cv.Mat();
        mat.convertTo(newMat, -1, Math.pow(2, valor), 0); // Adjust exposure
        return newMat; // Return modified Mat
    };
    
    const ajustarContraste = (mat, valor) => {
        const newMat = new cv.Mat();
        mat.convertTo(newMat, -1, valor, 0); // Adjust contrast
        return newMat; // Return modified Mat
    };
    
    const ajustarIluminaciones = (mat, valor) => {
        const newMat = new cv.Mat();
        mat.convertTo(newMat, -1, 1, valor); // Adjust brightness
        return newMat; // Return modified Mat
    };
    
    const ajustarSombras = (mat, valor) => {
        // You can use a more advanced method to adjust shadows if necessary
        const newMat = new cv.Mat();
        mat.convertTo(newMat, -1, 1, valor); // Simple brightness increase for shadows
        return newMat; // Return modified Mat
    };
    
    const ajustarBlancos = (mat, valor) => {
        const newMat = new cv.Mat();
        // Adjust whites using contrast and brightness methods
        mat.convertTo(newMat, -1, 1, valor); // Adjust whites
        return newMat; // Return modified Mat
    };
    
    const ajustarNegros = (mat, valor) => {
        const newMat = new cv.Mat();
        // Adjust blacks using contrast and brightness methods
        mat.convertTo(newMat, -1, 1, -valor); // Decrease brightness for blacks
        return newMat; // Return modified Mat
    };
    
    /*const ajustarTextura = (mat, valor) => {
        console.log("Before texture adjustment, mat size:", mat.size());
        const newMat = new cv.Mat();
        const scalar = new cv.Scalar(valor); // This should typically be 3 values for BGR
        const kernel = new cv.Mat(3, 3, cv.CV_32F, [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ]);
        
        console.log("Applying texture adjustment with kernel:", kernel);
        cv.filter2D(mat, newMat, -1, kernel);
        
        console.log("After texture adjustment, newMat size:", newMat.size());
        kernel.delete();
        
        return newMat;
    };    */
    
    const ajustarClaridad = (mat, valor) => {
        const newMat = new cv.Mat();
        // Use clarity adjustments, could also use sharpening
        cv.GaussianBlur(mat, newMat, new cv.Size(0, 0), 2);
        return newMat; // Return modified Mat
    };
    
    const mejorarBalanceBlancos = (mat) => {
        // Ensure that mat is of type CV_8UC3 (BGR image)
        if (mat.type() !== cv.CV_8UC3) {
            console.error("Invalid Mat type for white balance");
            return mat; // Early return or handle appropriately
        }
    
        // Example of a simple white balance adjustment
        const result = new cv.Mat();
        const avg = new cv.Mat();
        const channels = new cv.MatVector();
        cv.split(mat, channels); // Split channels
    
        // Calculate mean of each channel
        for (let i = 0; i < channels.size(); i++) {
            const mean = cv.mean(channels.get(i));
            // Adjust channels based on mean values
            channels.get(i).convertTo(channels.get(i), cv.CV_32F, 1 / mean[0]);
        }
    
        cv.merge(channels, result); // Merge channels back
    
        return result; // Return the adjusted image
    };
    

    /*const scalar = new cv.Scalar(255, 0, 0);*/ // Example for Red color in BGR format

    
    return (
        <div>
        <div className="next-module">
        <Header/>
        </div>
        <div className="next-module"/>
            <div>
                <h1>Procesador de Imágenes</h1>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {image && <img src={image} alt="Cargada" />}
                {processedImage && <img src={processedImage} alt="Procesada" />}
            </div>
            <div className="next-module"></div>
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
            <div className="next-module"/>
            <Footer />
        </div>
    );
};

export default Editor;
