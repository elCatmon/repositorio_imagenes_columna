import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from '../config/config';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import '../assets/App.css'; 
import './Importar.css'; 

const Importar = () => {
  const navigate = useNavigate(); // Inicializa la función de navegación
  const [formData, setFormData] = useState({
    tipoEstudio: '',
    region: "",
    donador: '',
    edad: '',
    sexo: '',
    archivosAnonimizados: [],
    archivosOriginales: []
  });

  const archivosAnonimizadosRef = useRef(null); // Ref para el input de archivos anonimizados
  const archivosOriginalesRef = useRef(null); // Ref para el input de archivos originales

  const [tablaDatos, setTablaDatos] = useState([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [subiendo, setSubiendo] = useState(false); // Para mostrar el estado de carga

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

  const validateForm = () => {
    const { tipoEstudio, donador, archivosOriginales } = formData;
    
    // Verifica si los campos principales están completos
    if (!tipoEstudio || !donador || archivosOriginales.length === 0) {
      setError('Por favor complete todos los campos requeridos y seleccione al menos un archivo.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubiendo(true); // Indica que el proceso de subida ha comenzado

    const noOperacion = generateRandomCode();
    const miniaturas = formData.archivosAnonimizados.map(file => URL.createObjectURL(file));

    const formDataToSend = new FormData();
    formDataToSend.append('estudio_ID', noOperacion);
    formDataToSend.append('donador', formData.donador);
    formDataToSend.append('estudio', formData.tipoEstudio);
    formDataToSend.append('region', formData.region);
    formDataToSend.append('sexo', formData.sexo);
    formDataToSend.append('edad', formData.edad);

    if (formData.archivosAnonimizados.length > 0) {
      formData.archivosAnonimizados.forEach((file) => {
        formDataToSend.append('archivosAnonimizados', file);
      });
    }

    if (formData.archivosOriginales.length > 0) {
      formData.archivosOriginales.forEach((file) => {
        formDataToSend.append('archivosOriginales', file);
      });
    }

    try {
      const response = await fetch(`${BASE_URL}/importar`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Error al enviar los datos: ${errorResponse}`);
      }

      const responseData = await response.json();
      setMensaje('Datos enviados correctamente');
      setError('');
      
      // Agregar datos a la tabla solo si la subida fue exitosa
      const nuevoRegistro = {
        miniaturas,
        noOperacion,
        donador: formData.donador,
        fecha: formData.fechaEstudio,
        tipoEstudio: formData.tipoEstudio,
        numeroArchivos: formData.archivosOriginales.length
      };
      setTablaDatos((prevData) => [...prevData, nuevoRegistro]);

      // Limpia el formulario y los inputs de archivos
      setFormData({
        tipoEstudio: '',
        donador: '',
        region: '',
        edad: '',
        sexo: '',
        archivosAnonimizados: [],
        archivosOriginales: []
      });

      // Limpia el valor de los inputs de archivos solo si están disponibles
      if (archivosAnonimizadosRef.current) {
        archivosAnonimizadosRef.current.value = ''; // Limpia el input de archivos anonimizados
      }
      if (archivosOriginalesRef.current) {
        archivosOriginalesRef.current.value = ''; // Limpia el input de archivos originales
      }

    } catch (error) {
      setError(`Error al enviar los datos: ${error.message}`);
      setMensaje('');
    } finally {
      setSubiendo(false); // Termina el estado de subida
    }
  };

  return (
    <div>
        <div className="next-module">
        <Header/>
        </div>
      <div className="content">
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
            <option value="">Seleccione</option>
            <option value="00">Desconocido</option>
            <option value="01">Craneo</option>
            <option value="02">Columna Vertebral</option>
            <option value="03">Cervical</option>
            <option value="04">Torácica</option>
            <option value="05">Lumbar</option>
            <option value="06">Sacra</option>
            <option value="07">Coxis</option>
            <option value="08">Torax</option>
            <option value="09">Tele de Torax</option>
            <option value="10">Extremidad Superior</option>
            <option value="11">Hombro</option>
            <option value="12">Humero</option>
            <option value="13">Codo</option>
            <option value="14">Antebrazo</option>
            <option value="15">Muñeca</option>
            <option value="16">Mano</option>
            <option value="17">Pelvis</option>
            <option value="18">Extremidad Inferior</option>
            <option value="19">Femur</option>
            <option value="20">Rodilla</option>
            <option value="21">Tibia y Perone</option>
            <option value="22">Tobillo</option>
            <option value="23">Pie</option>
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

          {/* Edad */}
          <div className="form-group">
            <label>Edad:</label>
            <select name="edad" value={formData.edad} onChange={handleChange} required>
              <option value="">Seleccione</option>
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

          {/* Sexo */}
          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="0">Desconocido</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>
          </div>

          <div className="form-group">
              <label>Archivos Anonimizados:</label>
              <input
                type="file"
                name="archivosAnonimizados"
                onChange={handleFileChange}
                multiple
                accept="image/jpeg"
                ref={archivosAnonimizadosRef} // Añadimos la ref para este input
              />
            </div>

            <div className="form-group">
              <label>Archivos Originales:</label>
              <input
                type="file"
                name="archivosOriginales"
                onChange={handleFileChange}
                multiple
                accept="image/jpeg"
                ref={archivosOriginalesRef} // Añadimos la ref para este input
              />
            </div>

          {subiendo && <p>Cargando archivos, por favor espere...</p>}
          {mensaje && <p className="success-message">{mensaje}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-success">
            Enviar
          </button>
        </form>
      </div>

      <div className="table-section">
        <h2>Datos Importados</h2>
        <table>
          <thead>
            <tr>
              <th>Miniatura</th>
              <th>No. Operación</th>
              <th>Donador</th>
              <th>Tipo de Estudio</th>
              <th>Número de Archivos</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                <td>
                  {dato.miniaturas.map((miniatura, i) => (
                    <img key={i} src={miniatura} alt="Miniatura" width="50" />
                  ))}
                </td>
                <td>{dato.noOperacion}</td>
                <td>{dato.donador}</td>
                <td>{dato.tipoEstudio}</td>
                <td>{dato.numeroArchivos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Importar;
