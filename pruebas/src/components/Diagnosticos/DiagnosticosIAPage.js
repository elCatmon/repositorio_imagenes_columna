import React, { useState } from "react";
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import ThumbnailGallery from "../Miniaturas/ThumbnailGallery";
import DicomViewer from "../Visualizador/DicomViewer";
import './DiagnosticosIAPage.css'
import GenerarDx from "./GenerarDx";



function DiagnosticosIAPage() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleThumbnailClick = (image) => {
        const fileName = image.split('/').pop().replace('.jpg', '.dcm');
        setSelectedImage(fileName);
    };

    return (
        <div>
            <div className="next-module">
                <Header />
            </div>
            <div className="next-module">
                <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ textAlign: "center", color: '#666666', backgroundColor: 'transparent !important', marginBottom: '50px', fontWeight: '900', fontFamily: 'Poppins' }}>Generar diagnostico con IA</h1>
            </div>
            <div className="dxia-container">

                <div className="dxia-content">
                    <div className="dxia-thumbnail-gallery">
                        <ThumbnailGallery onThumbnailClick={handleThumbnailClick} />
                    </div>
                    <div className="dxia-dicom-viewer">
                        {selectedImage ? (
                            <DicomViewer fileName={selectedImage} />
                        ) : (
                            <p>Selecciona una miniatura para ver la imagen DICOM.</p>
                        )}

                    </div>
                    <div className="dxia-clave-info">
                        <div className="columna-formulario">
                            <h2>Informacion de la imagen:</h2>
                            <label>
                                Tipo de Estudio:
                                <input
                                    name="tipoEstudio"
                                    readOnly
                                    className="dxia-input-field"
                                />
                            </label>
                            <label>
                                Region:
                                <input
                                    name="region"
                                    readOnly
                                    className="dxia-input-field"
                                />
                            </label>
                            <label>
                                Proyeccion:
                                <input
                                    name="proyeccion"
                                    readOnly
                                    className="dxia-input-field"
                                />
                            </label>
                            <label>
                                Sexo:
                                <input
                                    name="sexo"
                                    readOnly
                                    className="dxia-input-field"
                                />
                            </label>
                            <label>
                                Edad:
                                <input
                                    name="edad"
                                    readOnly
                                    className="dxia-input-field"
                                />
                            </label>
                            <button style={buttonStyle} type="submit">Generar Diagnostico</button>


                        </div>
                    </div>

                </div>
                <div className="next-module">
                    <GenerarDx />
                </div>
            </div >
            <div className="next-module" />
            <Footer />
        </div>

    );

}
const buttonStyle = {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#38b2ac', // Color de fondo para los botones
    color: '#ffffff', // Color del texto
    border: 'none', // Sin borde
    borderRadius: '5px', // Bordes redondeados
    transition: 'background-color 0.3s', // Transición suave para el hover
  };

export default DiagnosticosIAPage;
