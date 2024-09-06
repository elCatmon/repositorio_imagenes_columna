import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar

const Importar = () => {
  const navigate = useNavigate(); // Inicializa la función de navegación
  const [formData, setFormData] = useState({
    tipoEstudio: '',
    donador: '',
    imagenValida: '',
    edad: '',
    sexo: '',
    fechaNacimiento: '',
    fechaEstudio: '',
    proyeccion: '',
    archivos: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({ ...prevData, [name]: checked ? 'Sí' : 'No' }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, archivos: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para manejar el envío del formulario
  };

  return (
    <div className="importar-container">
      <div className="header">
        <button onClick={() => navigate('/')} className="back-button">← Regresar</button>
      </div>

      <div className="form-section">
        <h2>Formulario de Importación</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label>Tipo de estudio:</label>
            <input
              type="text"
              name="tipoEstudio"
              value={formData.tipoEstudio}
              onChange={handleChange}
              required
            />
          </div>
          {/* Other form fields remain the same */}
          <div className="form-group">
            <label>Seleccionar archivos:</label>
            <input
              type="file"
              multiple
              name="archivos"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Aceptar</button>
        </form>
      </div>

      <div className="table-section">
        <h2>Tabla de Importación</h2>
        <table>
          <thead>
            <tr>
              <th>Miniatura</th>
              <th>No. Operación</th>
              <th>Donador</th>
              <th>Fecha</th>
              <th>Tipo de estudio</th>
              <th>Número de archivos</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí deberías mapear los datos a filas de la tabla */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Importar;
