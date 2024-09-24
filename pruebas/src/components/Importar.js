import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';
import Header from './Header';

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
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' && file.size <= 20 * 1024 * 1024 // Solo archivos JPG de hasta 20MB
    );

    if (validFiles.length !== files.length) {
      alert('Solo se permiten imágenes JPG de máximo 20MB.');
    }

    setFormData((prevData) => ({ 
      ...prevData, 
      [name]: validFiles 
    }));
  };

  const generateRandomCode = () => {
    const code = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    formDataToSend.append('donador', formData.donador);
    formDataToSend.append('estudio', formData.tipoEstudio);
    formDataToSend.append('region', formData.region);
    formDataToSend.append('imagenValida', formData.imagenValida);
    formDataToSend.append('sexo', formData.sexo);
    formDataToSend.append('edad', formData.edad);
    formDataToSend.append('proyeccion', formData.proyeccion);
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
      setError(`Error al enviar los datos: ${error.message}`);
      setMensaje('');
    }
  };

  return (
    
    <div className="importar-container">
      <Header/>
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
              <option value="00">Seleccione</option>
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

          {/* Region */}
          <div className="form-group">
            <label>Region:</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="00">Seleccione</option>
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
                  value="1"
                  checked={formData.imagenValida === '1'}
                  onChange={handleChange}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="imagenValida"
                  value="2"
                  checked={formData.imagenValida === '2'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Edad */}
          <div className="form-group">
            <label>Edad:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="0">Seleccione</option>
              <option value="1">"Lactante menores de 1 año</option>
              <option value="2">Prescolar 1-5</option>
              <option value="3">Infante 6-12</option>
              <option value="4">Adolescente 13-18</option>
              <option value="5">Adulto joven 19-26</option>
              <option value="6">Adulto 27-59</option>
              <option value="7">Adulto mayor 60+</option>
            </select>
          </div>

          {/* Sexo */}
          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="0">Seleccione</option>
              <option value="1">M</option>
              <option value="2">F</option>
            </select>
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