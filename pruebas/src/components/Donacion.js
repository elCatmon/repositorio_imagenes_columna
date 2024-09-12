import React, { useState } from 'react';
import JSZip from 'jszip'; // Importar la biblioteca JSZip para manejar archivos zip
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';
import * as dicomParser from 'dicom-parser'; // Importar dicom-parser

const Donaciones = () => {
  const navigate = useNavigate(); // Inicializar la función navigate
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const maxSize = 50 * 1024 * 1024; // 50 MB

    for (const file of files) {
      if (file.size > maxSize) {
        setError(`El archivo ${file.name} excede el límite de 50 MB.`);
        continue;
      }

      if (file.name.endsWith('.zip')) {
        const containsDicom = await handleZipFile(file);
        if (!containsDicom) {
          setError(`El archivo ZIP ${file.name} no contiene imágenes DICOM válidas.`);
        }
      } else if (file.name.endsWith('.dicom') || file.name.endsWith('.dcm')) {
        const metadata = await extractMetadata(file);
        validFiles.push({ file, tipoEstudio: tipoEstudio || 'No seleccionado', metadata });
      } else {
        setError(`El archivo ${file.name} no es un DICOM, DCM o ZIP válido.`);
      }
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleZipFile = async (zipFile) => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    const dicomFiles = [];

    for (const filename in zipContent.files) {
      if (filename.endsWith('.dicom') || filename.endsWith('.dcm')) {
        const fileContent = await zip.file(filename).async('arraybuffer'); // Cambiado a 'arraybuffer'
        const dicomFile = new File([fileContent], filename);
        const metadata = await extractMetadata(dicomFile);
        dicomFiles.push({ file: dicomFile, tipoEstudio: tipoEstudio || 'No seleccionado', metadata });
      }
    }

    if (dicomFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...dicomFiles]);
      return true;
    }
    return false;
  };

  const extractMetadata = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer); // Convertir a Uint8Array
      const dataSet = dicomParser.parseDicom(uint8Array);

      // Extraer y formatear metadatos
      const ageString = dataSet.string('x00101010'); // (0010,1010) Age
      const age = ageString ? parseInt(ageString) : 'No disponible';

      const sex = dataSet.string('x00100040'); // (0010,0040) Sex
      const region = dataSet.string('x00181020'); // (0018,1020) Body Part Examined

      const dateStr = dataSet.string('x00080022'); // (0008,0022) Acquisition Date
      const date = dateStr ? formatDate(dateStr) : 'No disponible';

      return { age, sex, region, date };
    } catch (err) {
      console.error('Error al extraer metadatos:', err);
      return { age: 'No disponible', sex: 'No disponible', region: 'No disponible', date: 'No disponible' };
    }
  };

  // Función para formatear la fecha en formato YYYY-MM-DD
  const formatDate = (dateStr) => {
    // Asumiendo que dateStr está en formato YYYYMMDD
    if (dateStr.length === 8) {
      return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
    }
    return 'Formato de fecha inválido';
  };

  const handleTipoEstudioChange = (event) => {
    setTipoEstudio(event.target.value);
  };

  const handleUploadClick = async () => {
    if (!tipoEstudio) {
      alert('Por favor, seleccione un tipo de estudio.');
      return;
    }
  
    if (selectedFiles.length === 0) {
      alert('No hay archivos seleccionados para subir.');
      return;
    }
  
    const formData = new FormData();
    selectedFiles.forEach(({ file }) => {
      formData.append('files', file);
    });
    formData.append('tipoEstudio', tipoEstudio);
  
    try {
      setUploading(true);
      const response = await fetch(`${BASE_URL}/donacion`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json', // Ensure the backend returns a JSON response
        },
      });
  
      if (response.ok) {
        alert('Archivos subidos exitosamente.');
        setSelectedFiles([]);
        setTipoEstudio('');
      } else {
        const errorText = await response.text();
        setError(`Error al subir archivos: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de red: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="donaciones-container">
      <div className="header">
        <button onClick={() => navigate('/')} className="back-button">← Regresar</button>
      </div>

      <div className="donaciones-left">
        <h2>Donaciones de Archivos</h2>
        <div>
          <label htmlFor="tipo-estudio">Tipo de Estudio:</label>
          <select id="tipo-estudio" value={tipoEstudio} onChange={handleTipoEstudioChange}>
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

        <input
          type="file"
          accept=".dcm, .dicom, .zip"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />

        <button
          onClick={handleUploadClick}
          className="upload-button"
          disabled={uploading || !tipoEstudio || selectedFiles.length === 0}
        >
          {uploading ? 'Subiendo...' : 'Subir Archivos'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="donaciones-right">
        {selectedFiles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre del archivo</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Región del cuerpo</th>
                <th>Fecha de toma</th>
                <th>Fecha y hora de subida</th>
                <th>Tipo de estudio</th>
              </tr>
            </thead>
            <tbody>
              {selectedFiles.map(({ file, tipoEstudio, metadata }, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{metadata.age || 'No disponible'}</td>
                  <td>{metadata.sex || 'No disponible'}</td>
                  <td>{metadata.region || 'No disponible'}</td>
                  <td>{metadata.date || 'No disponible'}</td>
                  <td>{new Date().toLocaleString()}</td>
                  <td>{tipoEstudio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay archivos seleccionados.</p>
        )}
      </div>
    </div>
  );
};

export default Donaciones;
