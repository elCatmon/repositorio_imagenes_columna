import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';

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
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 'Sí' : 'No') : value
    }));
    console.log(`Campo cambiado: ${name} = ${value}`);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Archivos seleccionados:', files);

    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' && file.size <= 20 * 1024 * 1024 // Solo archivos JPG de hasta 20MB
    );

    if (validFiles.length !== files.length) {
      alert('Solo se permiten imágenes JPG de máximo 20MB.');
      console.warn('Algunos archivos no cumplen con los criterios de validación');
    }

    setFormData((prevData) => ({ ...prevData, archivos: validFiles }));
  };

  const generateRandomCode = () => {
    const code = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    console.log('Código de operación generado:', code);
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos del formulario al enviar:', formData);

    const noOperacion = generateRandomCode();
    const miniaturas = formData.archivos.map(file => URL.createObjectURL(file));

    const nuevoRegistro = {
      miniaturas,
      noOperacion,
      donador: formData.donador,
      fecha: formData.fechaEstudio,
      tipoEstudio: formData.tipoEstudio,
      numeroArchivos: formData.archivos.length
    };

    setTablaDatos((prevData) => [...prevData, nuevoRegistro]);

    // Prepara el objeto FormData para enviar al servidor
    const formDataToSend = new FormData();
    formDataToSend.append('estudio_ID', noOperacion);
    formDataToSend.append('hash', ''); // Genera un hash si es necesario
    formDataToSend.append('estudio', formData.tipoEstudio);
    formDataToSend.append('sexo', formData.sexo);
    formDataToSend.append('edad', formData.edad);
    formDataToSend.append('fecha_nacimiento', formData.fechaNacimiento);
    formDataToSend.append('proyeccion', formData.proyeccion);
    formDataToSend.append('hallazgos', ''); // Asume que no envías hallazgos en el frontend
    formDataToSend.append('fecha_estudio', formData.fechaEstudio);

    formData.archivos.forEach((file, index) => {
      formDataToSend.append(`imagenes[${index}]`, file);
    });

    console.log('Datos enviados al servidor:', formDataToSend);

    try {
      const response = await fetch(`${BASE_URL}/estudios`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      setMensaje('Datos enviados correctamente');
      setError('');
      console.log('Respuesta del servidor:', await response.json());
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

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('Error al enviar los datos');
      setMensaje('');
    }
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
              <option value="TomografiaComputarizada">Tomografía Computarizada</option>
              <option value="ResonanciaMagnetica">Resonancia Magnética</option>
              <option value="Ultrasonido">Ultrasonido</option>
              <option value="Mamografia">Mamografía</option>
              <option value="Angiografia">Angiografía</option>
              <option value="MedicinaNuclear">Medicina Nuclear</option>
              <option value="RadioTerapia">Radio Terapia</option>
              <option value="Fluroscopia">Fluoroscopia</option>
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

        {mensaje && <p className="success-message">{mensaje}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="table-section">
        <h2>Datos Importados</h2>
        <table>
          <thead>
            <tr>
              <th>Miniatura</th>
              <th>No. Operación</th>
              <th>Donador</th>
              <th>Fecha</th>
              <th>Tipo de Estudio</th>
              <th>Número de Archivos</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((registro, index) => (
              <tr key={index}>
                <td>
                  {registro.miniaturas.map((miniatura, i) => (
                    <img key={i} src={miniatura} alt="miniatura" width="50" />
                  ))}
                </td>
                <td>{registro.noOperacion}</td>
                <td>{registro.donador}</td>
                <td>{registro.fecha}</td>
                <td>{registro.tipoEstudio}</td>
                <td>{registro.numeroArchivos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Importar;
