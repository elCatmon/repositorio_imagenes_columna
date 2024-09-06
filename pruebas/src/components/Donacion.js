import React, { useState } from 'react';
import JSZip from 'jszip'; // Importar la biblioteca JSZip para manejar archivos zip
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';

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
        validFiles.push({ file, tipoEstudio: tipoEstudio || 'No seleccionado' });
      } else {
        setError(`El archivo ${file.name} no es un DICOM, DCM o ZIP válido.`);
      }
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleZipFile = async (zipFile) => {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    const dicomFiles = [];

    for (const filename in zipContent.files) {
      if (filename.endsWith('.dicom') || filename.endsWith('.dcm')) {
        const fileContent = await zip.file(filename).async('blob');
        const dicomFile = new File([fileContent], filename);
        dicomFiles.push({ file: dicomFile, tipoEstudio: tipoEstudio || 'No seleccionado' });
      }
    }

    if (dicomFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...dicomFiles]);
      return true;
    }
    return false;
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
      const response = await fetch(`${BASE_URL}/donacion`, { // Cambiar a /donacion
        method: 'POST',
        body: formData,
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
            <option value="radiografia">Radiografía</option>
            <option value="tomografia">Tomografía</option>
            <option value="mastografia">Mastografía</option>
          </select>
        </div>

        <input
          type="file"
          accept=".dcm, .dicom, .zip"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />

        <button onClick={handleUploadClick} className="upload-button" disabled={uploading || !tipoEstudio}>
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
                <th>Fecha y hora de subida</th>
                <th>Tipo de estudio</th>
              </tr>
            </thead>
            <tbody>
              {selectedFiles.map(({ file, tipoEstudio }, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
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
