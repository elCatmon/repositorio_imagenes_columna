import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import '../assets/App.css';
import './datasetDownload.css';

const StudyForm = () => {
  const [formData, setFormData] = useState({
    tipoEstudio: '',
    region: '',
    subregion: '',
    proyeccion: '',
    formato: '',
    dimensionX: '',
    dimensionY: ''
  });
  const [showDimensions, setShowDimensions] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga

  useEffect(() => {
    // Mostrar campos de dimensiones si el formato es JPG o DICOM & JPG
    setShowDimensions(formData.formato === 'jpg' || formData.formato === 'both');
  }, [formData.formato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar la animación de carga al enviar el formulario
    if (formData.subregion !== '') {
      formData.region = formData.subregion;
    }
    // Construir la URL de la solicitud
    const queryParams = new URLSearchParams({
      type: formData.formato,
      tipoEstudio: formData.tipoEstudio,
      region: formData.region,
      proyeccion: formData.proyeccion,
      dimensionX: formData.dimensionX,
      dimensionY: formData.dimensionY,
    }).toString();

    const url = `${BASE_URL}/dataset/descarga?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/zip',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      // Recibir el archivo como un blob
      const blob = await response.blob();

      // Crear una URL de descarga a partir del blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'dataset.zip'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove(); // Eliminar el enlace después de hacer clic
    } catch (error) {
      console.error('Error al hacer la solicitud:');
    } finally {
      setIsLoading(false); // Ocultar la animación de carga cuando la solicitud finalice
    }
  };

  return (

    <div>
      <Header />
      <div className="next-module" />
      <h2>Opciones de descarga del conjunto de datos</h2>
      <form onSubmit={handleSubmit} onContextMenu={(e) => e.preventDefault()}>
        {/* Campo Tipo de Estudio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="tipoEstudio">Tipo de Estudio:</label>
          <select
            id="tipoEstudio"
            name="tipoEstudio"
            value={formData.tipoEstudio}
            onChange={handleChange}
            required
          >
            <option value="00">Seleccione</option>
            <option value="">Todos</option>
            <option value="01">Radiografía</option>
            <option value="02">Tomografía Computarizada</option>
            <option value="03">Resonancia Magnética</option>
            <option value="04">Ultrasonido</option>
            <option value="05">Mamografía</option>
            <option value="06">Angiografía</option>
            <option value="07">Medicina Nuclear</option>
            <option value="08">Radio Terapia</option>
            <option value="09">Fluoroscopia</option>
          </select>
        </div>

        {/* Campo Región */}
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Región:</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            <option value="02">Columna Vertebral</option>
            <option value="17">Pelvis</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Proyección:</label>
          <select
            name="proyeccion"
            value={formData.proyeccion}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            <option value="01">Postero Anterior</option>
            <option value="02">Antero Posterior</option>
            <option value="03">Obliqua</option>
            <option value="04">Lateral Izquierda</option>
            <option value="05">Lateral Derecha</option>
            <option value="06">Especial</option>
            <option value="07">Comparativa</option>
          </select>
        </div>

        {/* Campo Formato */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="formato">Formato:</label>
          <select
            id="formato"
            name="formato"
            value={formData.formato}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="dcm">DICOM</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Generar dataset
        </button>
      </form>

      {/* Mostrar la animación de carga */}
      {isLoading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Esto puede tardar un rato por favor espera...</p>
          <div className="spinner" style={{ border: '4px solid rgba(0,0,0,.1)', borderLeftColor: '#4CAF50', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        </div>
      )}

      {/* Añadir la animación CSS para el spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="next-module" />
      <Footer />
    </div>
  );
};

export default StudyForm;
