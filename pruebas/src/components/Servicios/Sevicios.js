import React, { useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';

function FileConverter() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [conversionType, setConversionType] = useState('');
    const [convertedFile, setConvertedFile] = useState(null);

    // Maneja la selección de archivos
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Maneja el cambio de tipo de conversión
    const handleConversionTypeChange = (e) => {
        setConversionType(e.target.value);
    };

    // Maneja el envío del formulario y realiza la conversión
    const handleConvert = async () => {
        if (!selectedFile || !conversionType) {
            alert("Por favor, selecciona un archivo y el tipo de conversión.");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('conversionType', conversionType);

        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setConvertedFile(url);
            } else {
                console.error("Error en la conversión del archivo.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div>
            <div className="next-module">
                <Header />
            </div>
            <div className="next-module"/>
            <h2>Convertidor de Archivos</h2>

            <label>
                Subir archivo:
                <input type="file" onChange={handleFileChange} accept=".jpg,.png,.dcm" />
            </label>

            <label>
                Selecciona el formato de conversión:
                <select value={conversionType} onChange={handleConversionTypeChange}>
                    <option value="">Seleccione</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                    <option value="dicom">DICOM</option>
                    <option value="xml">XML</option>
                </select>
            </label>

            <button onClick={handleConvert}>Convertir</button>

            {convertedFile && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Archivo Convertido:</h3>
                    <a href={convertedFile} download="archivo_convertido">
                        Descargar Archivo
                    </a>
                </div>
            )}
            <div className="next-module"/>
            <Footer />
        </div>
    );
}

export default FileConverter;
