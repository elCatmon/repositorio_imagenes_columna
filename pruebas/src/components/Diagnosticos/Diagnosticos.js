import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import './Diagnosticos.css';

const DiagnosticForm = ({ selectedFile }) => {
  const [formData, setFormData] = useState({
    hallazgos: '',
    impresion: '',
    observaciones: '',
    medico: '',
    fecha: '',
    tipoEstudio: '',
    region: '',
    proyeccion: '',
    valido: '',
    obtencion: '',
    sexo: '',
    edad: ''
  });

  // Define subregiones según la región seleccionada
  const subregionesOptions = {
    '02': [
      { value: '03', label: 'Cervical' },
      { value: '04', label: 'Torácica' },
      { value: '05', label: 'Lumbar' },
      { value: '06', label: 'Sacra' },
      { value: '07', label: 'Coxis' }
    ],
    '08': [
      { value: '09', label: 'Tele de Torax' }
    ],
    '10': [
      { value: '11', label: 'Hombro' },
      { value: '12', label: 'Humero' },
      { value: '13', label: 'Codo' },
      { value: '14', label: 'Antebrazo' },
      { value: '15', label: 'Muñeca' },
      { value: '16', label: 'Mano' }
    ],
    '18': [
      { value: '19', label: 'Femur' },
      { value: '20', label: 'Rodilla' },
      { value: '21', label: 'Tibia y Perone' },
      { value: '22', label: 'Tobillo' },
      { value: '23', label: 'Pie' }
    ],
  };

  const [clave, setClave] = useState(''); // Estado para almacenar la clave
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLatestDiagnostico = async () => {
    clearFormFields();
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

      const fetchDiagnosticoResponse = await fetch(`${BASE_URL}/estudios/diagnostico?id=${study.estudio_id}&nombreImagen=${newFileName}`);
      if (!fetchDiagnosticoResponse.ok) {
        console.error('Error al obtener el diagnóstico:', fetchDiagnosticoResponse.status);
        throw new Error('Error al obtener el diagnóstico');
      }

      const response = await fetchDiagnosticoResponse.json();
      const diagnostico = response.diagnostico; // Suponemos que el JSON tiene el campo 'diagnostico'
      const claveImagen = response.clave; // Y un campo 'clave'

      // Guardamos la clave en su estado
      setClave(claveImagen);

      // Actualizar solo los campos relacionados a la clave, sin alterar los otros valores del formulario
      const valoresClave = obtenerValoresDesdeClave(claveImagen);

      setFormData((prevData) => ({
        ...prevData,
        ...valoresClave,
        hallazgos: diagnostico.Hallazgos || prevData.hallazgos,
        impresion: diagnostico.Impresion || prevData.impresion,
        observaciones: diagnostico.Observaciones || prevData.observaciones,
        medico: diagnostico.Medico || prevData.medico,
        fecha: diagnostico.Fecha && diagnostico.Fecha !== "0001-01-01" 
          ? diagnostico.Fecha.split('T')[0] 
          : prevData.fecha,
      }));

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

  const clearFormFields = () => {
    setFormData({
      hallazgos: '',
      impresion: '',
      observaciones: '',
      medico: '',
      fecha: '',
      tipoEstudio: '',
      region: '',
      proyeccion: '',
      valido: '',
      obtencion: '',
      sexo: '',
      edad: ''
    });
  };

  const obtenerValoresDesdeClave = (clave) => {
    return {
      tipoEstudio: clave.substring(0, 2),  // Caracteres 1 y 2
      region: clave.substring(2, 4),       // Caracteres 3 y 4
      proyeccion: clave.substring(4, 6),   // Caracteres 5 y 6
      valido: clave.substring(6, 7),       // Caracter 7
      obtencion: clave.substring(8, 9),    // Caracter 9
      sexo: clave.substring(9, 10),        // Caracter 10
      edad: clave.substring(10, 11)        // Caracter 11
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileName = selectedFile.split('/').pop();
      const newFileName = fileName.replace(/\.jpg$/, '.dcm');
      const formattedDate = new Date(formData.fecha).toISOString(); // Convert date to ISO format

      // Fetch study based on the file
      const fetchStudyResponse = await fetch(`${BASE_URL}/estudios/dicom?nombre=${newFileName}`);
      if (!fetchStudyResponse.ok) {
        throw new Error('Error al obtener el estudio');
      }

      const study = await fetchStudyResponse.json();
      if (!study || !study.estudio_id) {
        throw new Error('Estudio no encontrado');
      }
      if(formData.subregion!=''){
        formData.region = formData.subregion
      }

      // Construct new key (clave) based on form data
      const nuevaClave = formData.tipoEstudio + formData.region + formData.proyeccion + formData.valido + "1" + formData.obtencion + formData.sexo + formData.edad;
      console.log('Nueva clave:', nuevaClave);

      // Prepare updated diagnosis data
      const updatedDiagnostico = {
        hallazgos: formData.hallazgos,
        impresion: formData.impresion,
        observaciones: formData.observaciones,
        medico: formData.medico,
        fecha: formattedDate,
        tipoEstudio: formData.tipoEstudio,
        region: formData.region,
        proyeccion: formData.proyeccion,
        valido: formData.valido,
        obtencion: formData.obtencion,
        sexo: formData.sexo,
        edad: formData.edad,
      };

      // Send PATCH request to update diagnosis and image key
      const updateResponse = await fetch(`${BASE_URL}/diagnosticos/${study.estudio_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imagenNombre: newFileName,  // Include image name
          clave: nuevaClave,         // Include new key
          diagnostico: updatedDiagnostico  // Include updated diagnostic info
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Error al actualizar el diagnóstico');
      }

      setSuccessMessage('Diagnóstico guardado exitosamente');
      setErrorMessage('');

      // Reset form fields after successful update
      setFormData({
        hallazgos: '',
        impresion: '',
        observaciones: '',
        medico: '',
        fecha: '',
        tipoEstudio: '',
        region: '',
        proyeccion: '',
        valido: '',
        obtencion: '',
        sexo: '',
        edad: ''
      });
    } catch (error) {
      console.error('Error al actualizar el diagnóstico:', error);
      setErrorMessage('Error al actualizar el diagnóstico.');
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
        <label style={{ fontWeight: 'bold' }}>Región:</label>
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
            <option value="08">Torax</option>
            <option value="09">Extremidad Superior</option>
            <option value="17">Pelvis</option>
            <option value="18">Extremidad Inferior</option>
        </select>
      </div>

      {formData.region && subregionesOptions[formData.region] && (
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Subregión:</label>
          <select
            name="subregion"
            value={formData.subregion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            {subregionesOptions[formData.region].map(option2 => (
              <option key={option2.value} value={option2.value}>
                {option2.label}
              </option>
            ))}
          </select>
        </div>
      )}

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Proyección:</label>
          <select
            name="proyeccion"
            value={formData.proyeccion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
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
          <label style={{ fontWeight: 'bold' }}>Válido:</label>
          <select
            name="valido"
            value={formData.valido}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="0">Desconocido</option>
            <option value="1">Sí</option>
            <option value="2">No</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Obtencion:</label>
          <select
            name="obtencion"
            value={formData.Obtencion}
            onChange={handleChange}
            required
          >
              <option value="">Seleccione</option>
              <option value="2">Desconocido</option>
              <option value="1">Estudio digital</option>
              <option value="2">Estudio Fisico</option>
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
              <option value="">Seleccione</option>
              <option value="0">Desconocido</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
          </select>
        </div>

          {/* Edad */}
          <div className="form-group">
            <label style={{ fontWeight: 'bold' }}>Edad:</label>
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
