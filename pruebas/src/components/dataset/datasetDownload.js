import React, { useState, useEffect } from 'react';

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
    if (formData.formato === '1' || formData.formato === '2') {
      setShowDimensions(true);
    } else {
      setShowDimensions(false);
    }
  }, [formData.formato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario aquí
    console.log('Datos del formulario:', formData);
  };

  return (
    <div>
      <h2>Opciones de descarga del dataset</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="tipoEstudio">Tipo de Estudio:</label>
          <select
            id="tipoEstudio"
            name="tipoEstudio"
            value={formData.tipoEstudio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
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

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="region">Región:</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
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
            <option value="08">Pernas</option>
            <option value="09">Rdilla</option>
            <option value="10">Tobillo</option>
            <option value="11">Pie</option>
          </select>
        </div>

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
            <option value="0">DICOM</option>
            <option value="1">JPG</option>
            <option value="2">DICOM & JPG</option>
          </select>
        </div>

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

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Generar dataset
        </button>
      </form>
    </div>
  );
};

export default StudyForm;
