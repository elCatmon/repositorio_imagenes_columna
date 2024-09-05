import React, { useState } from 'react';

const Importar = () => {
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
      <div className="form-section">
        <h2>Formulario de Importación</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label>Donador:</label>
            <input
              type="text"
              name="donador"
              value={formData.donador}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagen válida:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="imagenValida"
                  value="Sí"
                  checked={formData.imagenValida === 'Sí'}
                  onChange={handleChange}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="imagenValida"
                  value="No"
                  checked={formData.imagenValida === 'No'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha del estudio:</label>
            <input
              type="date"
              name="fechaEstudio"
              value={formData.fechaEstudio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Proyección:</label>
            <input
              type="text"
              name="proyeccion"
              value={formData.proyeccion}
              onChange={handleChange}
              required
            />
          </div>
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
            {/* Ejemplo:
            {data.map((item) => (
              <tr key={item.id}>
                <td><img src={item.miniatura} alt="miniatura" /></td>
                <td>{item.noOperacion}</td>
                <td>{item.donador}</td>
                <td>{item.fecha}</td>
                <td>{item.tipoEstudio}</td>
                <td>{item.numeroArchivos}</td>
              </tr>
            ))}
            */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Importar;
