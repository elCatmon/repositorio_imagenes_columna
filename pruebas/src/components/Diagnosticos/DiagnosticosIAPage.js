import React, { useState } from "react";
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import ThumbnailGallery from "../Miniaturas/ThumbnailGallery";
import DicomViewer from "../Visualizador/DicomViewer";
import './DiagnosticosIAPage.css'
import { BASE_URL } from '../config/config';


function DiagnosticosIAPage() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [DiagnosticoGenerado, setDiagnosticoGenerado] = useState(false);

    const handleThumbnailClick = (image) => {
        const fileName = image.split('/').pop().replace('.jpg', '.dcm');
        setSelectedImage(fileName);
    };

    const [formData, setFormData] = useState({
        hallazgos: '',
        impresion: '',
        observaciones: '',
    });

    const handleSubmit = async (e) => {
        setDiagnosticoGenerado(true);
        try {
            const response = await fetch(
                `${BASE_URL}/api/diagnosticos/obtener-diagnostico?imagenid=${selectedImage}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();


            // Actualizar el estado de forma inmutable
            setFormData((prevFormData) => ({
                ...prevFormData,
                hallazgos: data.hallazgos,
                impresion: data.impresion,
                observaciones: data.observaciones,
            }));
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const GuardarDiagnostico = () => {
        console.log("Diagnostico guardado");
    }

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
                </div>
                <div className="dxia-content">
                    {selectedImage ? (
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
                                <button style={buttonStyle} onClick={handleSubmit}>Generar Diagnostico</button>


                            </div>
                        </div>
                    ) : (
                        <p>Selecciona una miniatura para ver la informacion del estudio DICOM.</p>
                    )}
                    {DiagnosticoGenerado ? (
                        <div className="gdxia-form-diagnostico" style={{ margin: '20px' }}>
                            <div className="gdxia-diagnostico" style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="hallazgos">Hallazgos:</label>
                                <textarea
                                    id="hallazgos"
                                    name="hallazgos"
                                    placeholder="Hallazgos generados"
                                    value={formData.hallazgos}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="impresion">Impresión Diagnóstica:</label>
                                <textarea
                                    id="impresion"
                                    name="impresion"
                                    placeholder="Impresión diagnóstica generada"
                                    value={formData.impresion}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="observaciones">Observaciones:</label>
                                <textarea
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Observaciones generadas"
                                    value={formData.observaciones}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>
                            <button style={buttonStyle} onClick={GuardarDiagnostico}> Guardar Diagnostico </button>

                        </div>
                    ) : (
                        <p>Genera el diagnostico para ver el resultado.</p>
                    )}
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
