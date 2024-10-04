import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import '../assets/App.css'; 

const DiagnosticForm = ({ selectedFile }) => {
  const [formData, setFormData] = useState({
    proyeccion: '',
    hallazgos: '',
    impresion: '',
    observaciones: '',
    tipoEstudio: '',
    region: '',
    valido: '',
    sexo: '',
    edad: '',
    medico: '',
    fecha: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLatestDiagnostico = async () => {
    try {
      const fileName = selectedFile.split('/').pop();
      const newFileName = fileName.replace(/\.jpg$/, '.dcm');
  
      const fetchStudyResponse = await fetch(`${BASE_URL}/estudios/dicom?nombre=${newFileName}`);
      if (!fetchStudyResponse.ok) {
        console.error('Error en la respuesta al obtener el estudio:', fetchStudyResponse.status);
        throw new Error('Error al obtener el estudio');
      }
  
      const study = await fetchStudyResponse.json();
      if (!study || !study.estudio_id) {
        console.warn('Estudio no encontrado o ID inválido');
        throw new Error('Estudio no encontrado');
      }
  
      const fetchDiagnosticoResponse = await fetch(`${BASE_URL}/estudios/diagnostico?id=${study.estudio_id}`);
      if (!fetchDiagnosticoResponse.ok) {
        console.error('Error al obtener el diagnóstico:', fetchDiagnosticoResponse.status);
        throw new Error('Error al obtener el diagnóstico');
      }
  
      const diagnostico = await fetchDiagnosticoResponse.json();
      console.log('Diagnóstico obtenido:', diagnostico); // Verifica que obtienes los datos correctos
  
      setFormData({
        hallazgos: diagnostico.Hallazgos || '',
        impresion: diagnostico.Impresion || '',
        observaciones: diagnostico.Observaciones || '',
        medico: diagnostico.Medico || '',
        // Validación para la fecha
        fecha: diagnostico.Fecha && diagnostico.Fecha !== "0001-01-01" 
          ? diagnostico.Fecha.split('T')[0] 
          : 'No disponible'
      });
      console.log('Diagnóstico mostrado:', diagnostico.Fecha)
    } catch (error) {
      console.error('Error al obtener el diagnóstico más reciente:', error);
      setErrorMessage('Error al obtener el diagnóstico más reciente.');
    }
  };
  

  useEffect(() => {
    if (selectedFile) {
      fetchLatestDiagnostico();
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileName = selectedFile.split('/').pop();
      const newFileName = fileName.replace(/\.jpg$/, '.dcm');
      const formattedDate = new Date(formData.fecha).toISOString(); // Convierte a formato ISO 8601

      const fetchStudyResponse = await fetch(`${BASE_URL}/estudios/dicom?nombre=${newFileName}`);
      if (!fetchStudyResponse.ok) {
        throw new Error('Error al obtener el estudio');
      }

      const study = await fetchStudyResponse.json();
      if (!study || !study.estudio_id) {
        throw new Error('Estudio no encontrado');
      }

      const updatedDiagnostico = {
        ...formData,
        fecha: formattedDate,
      };

      const updateResponse = await fetch(`${BASE_URL}/diagnosticos/${study.estudio_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnostico: updatedDiagnostico }),
      });

      if (!updateResponse.ok) {
        throw new Error('Error al actualizar el diagnóstico');
      }

      setSuccessMessage('Diagnóstico guardado exitosamente');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al enviar el diagnóstico.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-diagnostico" style={{ margin: '20px' }}>
      <h2>Diagnóstico</h2>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="hallazgos">Hallazgos:</label>
          <textarea
            id="hallazgos"
            name="hallazgos"
            placeholder="Ingresa los hallazgos"
            value={formData.hallazgos}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="impresion">Impresión Diagnóstica:</label>
          <textarea
            id="impresion"
            name="impresion"
            placeholder="Ingresa la impresión diagnóstica"
            value={formData.impresion}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="observaciones">Observaciones:</label>
          <textarea
            id="observaciones"
            name="observaciones"
            placeholder="Ingresa las observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
          />
        </div>
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Proyección:</label>
          <select
            name="proyeccion"
            value={formData.proyeccion}
            onChange={handleChange}
            required
          >
            <option value="00">Seleccione</option>
            <option value="00">Desconocido</option>
            <option value="01">Postero Anterior</option>
            <option value="02">Antero Posterior</option>
            <option value="03">Obliqua</option>
            <option value="04">Lateral Izquierda</option>
            <option value="05">Lateral Derecha</option>
            <option value="06">Especial</option>
          </select>
        </div>
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Tipo de Estudio:</label>
          <select
            name="tipoEstudio"
            value={formData.tipoEstudio}
            onChange={handleChange}
            required
          >
              <option value="00">Seleccione</option>
              <option value="00">Desconocido</option>
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

        <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Region:</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="00">Seleccione</option>
              <option value="00">Desconocido</option>
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

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Válido:</label>
          <select
            name="valido"
            value={formData.valido}
            onChange={handleChange}
            required
          >
            <option value="0">Seleccione</option>
            <option value="1">Sí</option>
            <option value="2">No</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            required
          >
              <option value="0">Seleccione</option>
              <option value="0">Desconocido</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
          </select>
        </div>

          {/* Edad */}
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Edad:</label>
            <select name="edad" value={formData.edad} onChange={handleChange} required>
              <option value="0">Seleccione</option>
              <option value="0">Desconocido</option>
              <option value="1">Lactante menores de 1 año</option>
              <option value="2">Prescolar 1-5</option>
              <option value="3">Infante 6-12</option>
              <option value="4">Adolescente 13-18</option>
              <option value="5">Adulto joven 19-26</option>
              <option value="6">Adulto 27-59</option>
              <option value="7">Adulto mayor 60+</option>
            </select>
          </div>

        {/* Campo para la fecha */}
        <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }} htmlFor="fecha">Fecha del diagnóstico:</label>
            <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha} // Asegúrate de que formData.fecha tenga un valor de fecha válido
                onChange={handleChange}
                readOnly
                style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
        </div>

        {/* Campo para el médico */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="medicoA">Médico que hizo el diagnóstico:</label>
          <input
            type="text"
            id="medicoA"
            name="medicoA"
            placeholder="Ingresa el nombre del médico"
            value={formData.medico}
            onChange={handleChange}
            readOnly
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        {/* Campo para el médico */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }} htmlFor="medico">Tu nombre:</label>
          <input
            type="text"
            id="medico"
            name="medico"
            placeholder="Ingresa el nombre del médico"
            value={formData.medicoNuevo}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Guardar diagnostico
        </button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default DiagnosticForm;
