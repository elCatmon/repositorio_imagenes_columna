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

  const [tablaDatos, setTablaDatos] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({ ...prevData, [name]: checked ? 'Sí' : 'No' }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' && file.size <= 20 * 1024 * 1024 // Solo archivos JPG de hasta 20MB
    );

    if (validFiles.length !== files.length) {
      alert('Solo se permiten imágenes JPG de máximo 20MB.');
    }

    setFormData((prevData) => ({ ...prevData, archivos: validFiles }));
  };

  const generateRandomCode = () => {
    return Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Genera un número de operación aleatorio
    const noOperacion = generateRandomCode();

    // Crea las miniaturas de las imágenes subidas
    const miniaturas = formData.archivos.map(file => URL.createObjectURL(file));

    // Crea los datos para la nueva fila
    const nuevoRegistro = {
      miniaturas,
      noOperacion,
      donador: formData.donador,
      fecha: formData.fechaEstudio,
      tipoEstudio: formData.tipoEstudio,
      numeroArchivos: formData.archivos.length
    };

    // Agrega el nuevo registro a la tabla
    setTablaDatos((prevData) => [...prevData, nuevoRegistro]);

    // Limpia el formulario si es necesario
    setFormData({
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
  };

  return (
    <div className="importar-container">
      <div className="header">
        <button onClick={() => navigate('/')} className="back-button">← Regresar</button>
      </div>
      <div className="form-section">
        <h2>Formulario de Importación</h2>
        <form onSubmit={handleSubmit}>
          {/* Tipo de estudio */}
          <div className="form-group">
            <label>Tipo de estudio:</label>
            <select
              name="tipoEstudio"
              value={formData.tipoEstudio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="Radiografia">Radiografía</option>
              <option value="TomografiaComputarizada">Tomografia Computarizada</option>
              <option value="ResonanciaMagentica">Resonancia Magentica</option>
              <option value="Ultrasonido">Ultrasonido</option>
              <option value="Mamografia">Mamografia</option>
              <option value="Angiografia">Angiografia</option>
              <option value="MedicinaNuclear">Medicina Nuclear</option>
              <option value="RadioTerapia">Radio Terapia</option>
              <option value="Fluroscopia">Fluroscopia</option>
            </select>
          </div>

          {/* Donador */}
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

          {/* Imagen válida */}
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

          {/* Edad */}
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

          {/* Sexo */}
          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          {/* Fecha de nacimiento */}
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

          {/* Fecha del estudio */}
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

          {/* Proyección */}
          <div className="form-group">
            <label>Proyección:</label>
            <textarea
              name="proyeccion"
              value={formData.proyeccion}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          {/* Selección de archivos */}
          <div className="form-group">
            <label>Seleccionar archivos (Solo imágenes JPG de máx 20MB):</label>
            <input
              type="file"
              multiple
              accept="image/jpeg"
              name="archivos"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit">Aceptar</button>
        </form>
      </div>

      {/* Tabla de Importación */}
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
            {tablaDatos.map((item, index) => (
              <tr key={index}>
                <td>
                  {item.miniaturas.map((miniatura, i) => (
                    <img key={i} src={miniatura} alt="miniatura" style={{ width: '60px', height: '60px' }} />
                  ))}
                </td>
                <td>{item.noOperacion}</td>
                <td>{item.donador}</td>
                <td>{item.fecha}</td>
                <td>{item.tipoEstudio}</td>
                <td>{item.numeroArchivos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Importar;
