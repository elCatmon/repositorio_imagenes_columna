import React, { useState, useEffect } from 'react'; // Importar useEffect
import JSZip from 'jszip'; 
import { useNavigate } from 'react-router-dom'; 
import { BASE_URL } from '../config/config';
import * as dicomParser from 'dicom-parser'; 
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './Donaciones.css'; 

const Donaciones = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // useEffect para cambiar el mensaje después de 10 segundos
  useEffect(() => {
    let timer1, timer2;
  
    if (uploading) {
      // Primer temporizador: cambiar el mensaje después de 10 segundos
      timer1 = setTimeout(() => {
        setLoadingMessage('Esto está tardando más de lo esperado, por favor espere...');
  
        // Segundo temporizador: cambiar el mensaje después de 20 segundos adicionales (30 segundos en total)
        timer2 = setTimeout(() => {
          setLoadingMessage('El tiempo de subida y procesamiento depende de la cantidad de archivos, por favor espera...');
        }, 20000); // 20 segundos adicionales
      }, 10000); // 10 segundos iniciales
    }
  
    // Limpiar ambos temporizadores cuando el componente se desmonte
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [uploading]);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const maxSize = 50 * 1024 * 1024;

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
        const fileContent = await zip.file(filename).async('arraybuffer');
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
      const uint8Array = new Uint8Array(arrayBuffer);
      const dataSet = dicomParser.parseDicom(uint8Array);

      const ageString = dataSet.string('x00101010'); 
      const age = ageString ? parseInt(ageString) : 'No disponible';

      const sex = dataSet.string('x00100040'); 
      const region = dataSet.string('x00181020'); 

      const dateStr = dataSet.string('x00080022'); 
      const date = dateStr ? formatDate(dateStr) : 'No disponible';

      return { age, sex, region, date };
    } catch (err) {
      console.error('Error al extraer metadatos:', err);
      return { age: 'No disponible', sex: 'No disponible', region: 'No disponible', date: 'No disponible' };
    }
  };

  const formatDate = (dateStr) => {
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
    const donador = ("D" + Math.floor(Math.random() * 1e11).toString().padStart(11, '0'));
    const estudioid = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    formData.append('estudioID', estudioid)
    formData.append('tipoEstudio', tipoEstudio);
    formData.append('donador', donador)
  
    try {
      setUploading(true);
      setLoadingMessage('Por favor espera, se están cargando tus archivos, este proceso podría tardar un poco...');
      const response = await fetch(`${BASE_URL}/donacion`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json', 
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
      setLoadingMessage(''); // Clear loading message
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen" style={{ fontFamily:'Poppins'}}>
        <div className="next-module">
        <Header/>
        </div>
      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
           Donación de archivos
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize:'20px', fontFamily:'Poppins' }}>
           Elige el tipo de estudio y los archivos correspondientes para realizar tu donación
        </p>
      </header>
      <div className="donaciones-left" onContextMenu={(e) => e.preventDefault()}>
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

        {loadingMessage && <p className="loading-message">{loadingMessage}</p>} {/* Mostrar mensaje de carga */}
        {error && <p className="error-message">{error}</p>}

        {uploading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
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
                <th>Fecha de carga</th>
                <th>Tipo de estudio</th>
              </tr>
            </thead>
            <tbody>
              {selectedFiles.map(({ file, metadata }, index) => (
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
      <Footer />
    </div>
  );
};

export default Donaciones;
