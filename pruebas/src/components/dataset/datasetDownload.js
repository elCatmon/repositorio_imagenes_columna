import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';

const StudyForm = () => {
  const [formData, setFormData] = useState({
    tipoEstudio: '',
    region: '',
    formato: '',
    dimensionX: '',
    dimensionY: ''
  });

  const [showDimensions, setShowDimensions] = useState(false);

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
    // Construir la URL de la solicitud
    const queryParams = new URLSearchParams({
      type: formData.formato,
      tipoEstudio: formData.tipoEstudio,
      region: formData.region,
      dimensionX: formData.dimensionX,
      dimensionY: formData.dimensionY,
    }).toString();

    const url = `${BASE_URL}/dataset/descarga?${queryParams}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/zip', // Especificar que es un archivo ZIP
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
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <div>
      <h2>Opciones de descarga del dataset</h2>
      <form onSubmit={handleSubmit}>
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
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="region">Región:</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="">Todas</option>
            <option value="01">Cabeza</option>
            <option value="02">Cuello</option>
            <option value="03">Torax</option>
            <option value="04">Abdomen</option>
            <option value="05">Pelvis</option>
            <option value="06">Brazo</option>
            <option value="07">Manos</option>
            <option value="08">Piernas</option>
            <option value="09">Rodilla</option>
            <option value="10">Tobillo</option>
            <option value="11">Pie</option>
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
            <option value="jpg">JPG</option>
            <option value="both">DICOM & JPG</option>
          </select>
        </div>

        {/* Campos de dimensiones (X e Y) */}
        {showDimensions && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }} htmlFor="dimensionX">Dimensiones (X):</label>
              <input
                type="number"
                id="dimensionX"
                name="dimensionX"
                value={formData.dimensionX}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontWeight: 'bold' }} htmlFor="dimensionY">Dimensiones (Y):</label>
              <input
                type="number"
                id="dimensionY"
                name="dimensionY"
                value={formData.dimensionY}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
            </div>
          </>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Generar dataset
        </button>
      </form>
    </div>
  );
};

export default StudyForm;
