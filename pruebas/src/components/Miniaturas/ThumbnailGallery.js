import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../config/config';
import '../assets/App.css'; 

const ThumbnailGallery = ({ onThumbnailClick }) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [region, setRegion] = useState('');
  const [subregion, setSubregion] = useState('');

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

  const fetchImages = useCallback(async (pageNumber) => {
    if (!tipoEstudio) return;
  
    // Verificar si se ha seleccionado una subregión; si no, usamos el valor de la región
    const selectedRegion = subregion || region;
  
    try {
      // Crear los parámetros de búsqueda
      const query = new URLSearchParams({
        tipoEstudio: tipoEstudio,
        // Solo agregar la región si está seleccionada
        ...(selectedRegion && { region: selectedRegion }),
        page: pageNumber,
        limit: 18 // Límite de imágenes por página
      }).toString();
  
      const response = await fetch(`${BASE_URL}/thumbnails?${query}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Si es la primera página, reinicia las imágenes, de lo contrario agrega
        if (pageNumber === 1) {
          setImages(data);
        } else {
          setImages(prevImages => [...prevImages, ...data]);
        }
  
        // Si recibimos menos de 18 imágenes, desactiva la carga de más imágenes
        if (data.length < 18) {
          setHasMore(false);
        }
        
        setLoaded(true);
      } else {
        setError('Error al obtener las imágenes');
      }
    } catch (error) {
      setError('Error en la solicitud de imágenes: ' + error.message);
    }
  }, [region, subregion, tipoEstudio]);
  
  useEffect(() => {
    // Resetear estado de imágenes y paginación al cambiar filtros
    setImages([]);
    setPage(1);
    setHasMore(true);
    setLoaded(false);
    fetchImages(1);
  }, [fetchImages, tipoEstudio, region, subregion]);

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage);
    }
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setSubregion(''); // Resetear subregión al cambiar la región
  };

  const handleSubregionChange = (e) => {
    setSubregion(e.target.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="thumbnail-gallery-container" style={{ marginLeft: '100px' }}>
      <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
        Estudios médicos
      </h1>

      <div className="filters" style={filterStyle}>
        <label>
          Tipo de Estudio:
          <select value={tipoEstudio} onChange={(e) => setTipoEstudio(e.target.value)}>
            <option value="">Seleccione</option>
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
        </label>
        
        <label>
          Región:
          <select value={region} onChange={handleRegionChange}>
            <option value="">Seleccione</option>
            <option value="00">Desconocido</option>
            <option value="01">Craneo</option>
            <option value="02">Columna Vertebral</option>
            <option value="08">Torax</option>
            <option value="10">Extremidad Superior</option>
            <option value="17">Pelvis</option>
            <option value="18">Extremidad Inferior</option>
          </select>
        </label>

        {region && subregionesOptions[region] && (
          <label>
            Subregión:
            <select value={subregion} onChange={handleSubregionChange}>
              <option value="">Seleccione</option>
              {subregionesOptions[region].map(option2 => (
                <option key={option2.value} value={option2.value}>
                  {option2.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="thumbnail-gallery">
        {loaded ? (
          images.length > 0 ? (
            <div style={galleryStyle}>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={thumbnailContainerStyle}
                  onClick={() => onThumbnailClick(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    style={thumbnailStyle}
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay imágenes disponibles.</p>
          )
        ) : (
          <p>Seleccione el tipo de estudio...</p>
        )}
        {hasMore && (
          <button onClick={handleLoadMore} style={buttonStyle}>Cargar más</button>
        )}
      </div>
    </div>
  );
};

// Estilos para la galería de miniaturas
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '20px',
  justifyContent: 'center',
  padding: '20px',
  border: '1px solid #ddd'
};

const thumbnailStyle = {
  width: '150px',
  height: '150px',
  objectFit: 'cover'
};

const thumbnailContainerStyle = {
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '5px'
};

const filterStyle = {
  marginBottom: '10px'
};

const buttonStyle = {
  display: 'block',
  margin: '20px auto',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default ThumbnailGallery;
