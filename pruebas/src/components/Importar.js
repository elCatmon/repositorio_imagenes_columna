import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';

const Importar = () => {
  const navigate = useNavigate(); // Inicializa la función de navegación
  const [formData, setFormData] = useState({
    tipoEstudio: '',
    region: "",
    donador: '',
    imagenValida: '',
    edad: '',
    sexo: '',
    fechaNacimiento: '',
    fechaEstudio: '',
    proyeccion: '',
    archivosAnonimizados: [],
    archivosOriginales: []
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
    const { name } = e.target;
    const files = Array.from(e.target.files);
    console.log('Archivos seleccionados:', files);

    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' && file.size <= 20 * 1024 * 1024 // Solo archivos JPG de hasta 20MB
    );

    if (validFiles.length !== files.length) {
      alert('Solo se permiten imágenes JPG de máximo 20MB.');
      console.warn('Algunos archivos no cumplen con los criterios de validación');
    }

    setFormData((prevData) => ({ 
      ...prevData, 
      [name]: validFiles 
    }));

    console.log('Archivos después de la validación:', validFiles);
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
    const miniaturas = formData.archivosOriginales.map(file => URL.createObjectURL(file));

    const nuevoRegistro = {
      miniaturas,
      noOperacion,
      donador: formData.donador,
      fecha: formData.fechaEstudio,
      tipoEstudio: formData.tipoEstudio,
      numeroArchivos: formData.archivosOriginales.length
    };

    setTablaDatos((prevData) => [...prevData, nuevoRegistro]);

    const formDataToSend = new FormData();
    formDataToSend.append('estudio_ID', noOperacion);
    formDataToSend.append('hash', ''); // O genera un hash si es necesario
    formDataToSend.append('donador', formData.donador)
    formDataToSend.append('estudio', formData.tipoEstudio);
    formDataToSend.append('region', formData.region);
    formDataToSend.append('sexo', formData.sexo);
    formDataToSend.append('edad', formData.edad);
    formDataToSend.append('fecha_nacimiento', formData.fechaNacimiento);
    formDataToSend.append('proyeccion', formData.proyeccion);
    formDataToSend.append('fecha_estudio', formData.fechaEstudio);

    // Solo agrega archivos anonimizados si hay
    if (formData.archivosAnonimizados.length > 0) {
      formData.archivosAnonimizados.forEach((file) => {
        formDataToSend.append('archivosAnonimizados', file);
      });
    }

    // Solo agrega archivos originales si hay
    if (formData.archivosOriginales.length > 0) {
      formData.archivosOriginales.forEach((file) => {
        formDataToSend.append('archivosOriginales', file);
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/importar`, {
        method: 'POST',
        body: formDataToSend, // Usa formDataToSend aquí
      });

      if (!response.ok) {
        // Captura más información sobre el error
        const errorResponse = await response.text();
        throw new Error(`Error al enviar los datos: ${errorResponse}`);
      }

      const responseData = await response.json();
      setMensaje('Datos enviados correctamente');
      setError('');
      console.log('Respuesta del servidor:', responseData);

      // Limpiar el formulario
      setFormData({
        tipoEstudio: '',
        region:'',
        donador: '',
        imagenValida: '',
        edad: '',
        sexo: '',
        fechaNacimiento: '',
        fechaEstudio: '',
        proyeccion: '',
        archivosAnonimizados: [],
        archivosOriginales: []
      });

    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
      setError(`Error al enviar los datos: ${error.message}`);
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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

          {/* Region */}
          <div className="form-group">
            <label>Region:</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="cabeza-y-cuello">Cabeza y Cuello</option>
              <option value="torso">Torso</option>
              <option value="abdomen">Abdomen</option>
              <option value="pelvis">Pelvis</option>
              <option value="columna-vertebral">Columna Vertebral</option>
              <option value="extremidades-superiores">Extremidades Superiores</option>
              <option value="extremidades-inferiores">Extremidades Inferiores</option>
              <option value="sistema-musculoesqueletico">Sistema Musculoesquelético</option>
              <option value="sistema-cardiovascular">Sistema Cardiovascular</option>
              <option value="sistema-respiratorio">Sistema Respiratorio</option>
              <option value="sistema -digestivo">Sistema Digestivo</option>
              <option value="sistema-urogenital">Sistema Urogenital</option>
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
              min="0"
              max="100"
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

          {/* Fecha de estudio */}
          <div className="form-group">
            <label>Fecha de estudio:</label>
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
            <input
              type="text"
              name="proyeccion"
              value={formData.proyeccion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Archivos anonimizados */}
          <div className="form-group">
            <label>Archivos anonimizados (JPG hasta 20MB):</label>
            <input
              type="file"
              name="archivosAnonimizados"
              onChange={handleFileChange}
              accept=".jpg"
              multiple
              required
            />
          </div>

          {/* Archivos originales */}
          <div className="form-group">
            <label>Archivos originales (JPG hasta 20MB):</label>
            <input
              type="file"
              name="archivosOriginales"
              onChange={handleFileChange}
              accept=".jpg"
              multiple
              required
            />
          </div>

          <button type="submit">Enviar</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {mensaje && <p className="success-message">{mensaje}</p>}
      </div>

      <div className="table-section">
        <h3>Datos Ingresados</h3>
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
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                <td>
                  {dato.miniaturas.map((miniatura, miniIndex) => (
                    <img key={miniIndex} src={miniatura} alt="Miniatura" width="50" height="50" />
                  ))}
                </td>
                <td>{dato.noOperacion}</td>
                <td>{dato.donador}</td>
                <td>{dato.fecha}</td>
                <td>{dato.tipoEstudio}</td>
                <td>{dato.numeroArchivos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Importar;
