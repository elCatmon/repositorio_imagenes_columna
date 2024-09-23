import React, { useState } from 'react';
import '../App.css'; 

const DiagnosticForm = () => {
  const [formData, setFormData] = useState({
    proyeccion: '',
    hallazgos: '',
    impresion: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí puedes manejar el envío del formulario, como enviarlo a un servidor
  };

  return (
    <div classname="form-diagnostico" style={{ margin: '20px' }}>
      <h2>Formulario de Diagnóstico</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Region:</label>
            <select
              name="region"
              value={formData.region}
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
          <label style={{ fontWeight: 'bold' }} htmlFor="impresion">Impresión Diagnostica:</label>
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
      </form>
    </div>
  );
};

export default DiagnosticForm;
