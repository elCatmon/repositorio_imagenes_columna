import React, { useState } from 'react';
import { BASE_URL } from './config';
import '../App.css';

const DiagnosticForm = ({ selectedFile }) => { // Recibe selectedFile como prop
  const [formData, setFormData] = useState({
    proyeccion: '',
    hallazgos: '',
    impresion: '',
    observaciones: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(`Campo actualizado: ${name} = ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando el formulario con los siguientes datos:', formData);
  
    try {
      // Primero, busca el estudio basado en el estudio_ID
      console.log(`Buscando estudio con ID: ${selectedFile}`);
      const fetchStudyResponse = await fetch(`${BASE_URL}/estudios/${selectedFile}`);
      
      if (!fetchStudyResponse.ok) {
        throw new Error('Error al obtener el estudio');
      }
  
      const study = await fetchStudyResponse.json();
      console.log('Estudio obtenido:', study);
  
      // Ahora, asegúrate de que el estudio existe
      if (!study) {
        throw new Error('Estudio no encontrado');
      }
  
      // Agrega el nuevo diagnóstico al estudio existente
      const updatedDiagnostico = {
        proyeccion: formData.proyeccion,
        hallazgos: formData.hallazgos,
        impresion: formData.impresion,
        observaciones: formData.observaciones,
      };
      console.log('Actualizando diagnóstico:', updatedDiagnostico);
  
      // Realiza la actualización del diagnóstico en el documento de estudios
      const updateResponse = await fetch(`${BASE_URL}/diagnosticos/${study._id}`, {
        method: 'PATCH', // O 'PUT' dependiendo de cómo manejes la actualización
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diagnostico: updatedDiagnostico }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('Error al actualizar el diagnóstico');
      }
  
      const result = await updateResponse.json();
      console.log('Respuesta del servidor:', result);
      
      setSuccessMessage('Diagnóstico guardado exitosamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSuccessMessage('Error al enviar el diagnóstico. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className="form-diagnostico" style={{ margin: '20px' }}>
      <h2>Formulario de Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Proyección:</label>
          <select
            name="proyeccion"
            value={formData.proyeccion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="PA">Postero Anterior</option>
            <option value="AP">Antero Posterior</option>
            <option value="OB">Obliqua</option>
            <option value="LI">Lateral Izquierda</option>
            <option value="LA">Lateral Derecha</option>
          </select>
        </div>

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
            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Enviar
        </button>

        {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      </form>
    </div>
  );
};

export default DiagnosticForm;
