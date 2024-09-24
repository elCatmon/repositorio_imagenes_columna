import React, { useState } from 'react';
import JSZip from 'jszip'; // Importar la biblioteca JSZip para manejar archivos zip
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';
import * as dicomParser from 'dicom-parser'; // Importar dicom-parser
import Header from './Header';
import Footer from './Footer';

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
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen" style={{ fontFamily:'Poppins'}}>

      <Header/>
      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
<h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
   Donación de archivos
</h1>
<p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize:'20px', fontFamily:'Poppins' }}>
   Elige el tipo de estudio y los archivos correspondientes para realizar tu donación
</p>
</header>
      <div className="donaciones-left" style={{marginLeft:'400px'}}>
        
        <div>
          <label htmlFor="tipo-estudio">Tipo de Estudio:</label>
          <select id="tipo-estudio" value={tipoEstudio} onChange={handleTipoEstudioChange}>
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
<br></br>
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
          
          <p style={{marginLeft:'400px', marginTop:'20px',fontStyle:'italic'}}>No se han seleccionado archivos.</p>
        )}
      </div>
      <div class="text-center" style={{marginBottom:'50px', marginTop:'20px'}}>
        <p>Al hacer tu donación estas aceptando nuestro <a href="/documentos/AVISO_PRIVACIDAD.pdf">Aviso de privacidad</a> así como los <a href="/documentos/TERMINOS_CONDICIONES.pdf">Términos y Condiciones</a></p>
       
      </div>
      <Footer/>
    </div>
    
  );
};

export default Donaciones;
