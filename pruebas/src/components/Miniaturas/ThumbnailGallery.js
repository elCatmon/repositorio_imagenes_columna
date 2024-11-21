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

  const filenameStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666', // Color del texto
    marginTop: '5px',
    wordBreak: 'break-word', // Para manejar nombres largos
  };


  // Define subregiones según la región seleccionada
  const subregionesOptions = {
    '02': [
      { value: '03', label: 'Cervical' },
      { value: '04', label: 'Torácica' },
      { value: '05', label: 'Lumbar' },
      { value: '06', label: 'Sacra' },
      { value: '07', label: 'Coxis' }
    ],
    '26': [
      { value: '18', label: 'Pelvis Adulto' },
      { value: '19', label: 'Pelvis Infantil' },
    ],
  };

  const fetchImages = useCallback(async (pageNumber) => {
    if (!tipoEstudio) return;
  
    const selectedRegion = subregion || region;
  
    try {
      const query = new URLSearchParams({
        tipoEstudio: tipoEstudio,
        ...(selectedRegion && { region: selectedRegion }),
        page: pageNumber,
        limit: 9, // Límite de imágenes por página
      }).toString();
  
      const response = await fetch(`${BASE_URL}/thumbnails?${query}`);
  
      if (response.ok) {
        const { images, total } = await response.json();
  
        if (pageNumber === 1) {
          setImages(images);
        } else {
          setImages((prevImages) => [...prevImages, ...images]);
        }
  
        // Desactivar más cargas si hemos alcanzado el total
        if (pageNumber * 9 >= total) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
  
        setLoaded(true);
      } else {
        setError("Error al obtener las imágenes");
      }
    } catch (error) {
      setError("Error en la solicitud de imágenes: " + error.message);
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
    <div className="thumbnail-gallery-container" style={{ marginLeft: '100px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins', textAlign: 'center' }}>
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
            <option value="08">Medio de contraste</option>
            <option value="09">Fluoroscopia</option>
          </select>
        </label>

        <label>
          Región:
          <select value={region} onChange={handleRegionChange}>
            <option value="">Seleccione</option>
            <option value="00">Desconocido</option>
            <option value="02">Columna Vertebral</option>
            <option value="26">Pelvis</option>
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

      <div className="thumbnail-gallery" style={{ marginTop: '20px' }}>
        {loaded ? (
          images.length > 0 ? (
            <div style={galleryStyle}>
              {images.map((image, index) => {
                // Extraer el nombre del archivo de la URL
                const fileName = image.split('/').pop();

                return (
                  <div
                    key={index}
                    style={thumbnailContainerStyle}
                    onClick={() => onThumbnailClick(image)}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
                      style={thumbnailStyle}
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }}
                    />
                    {/* Mostrar el nombre del archivo */}
                    <p style={fileNameStyle}>{fileName}</p>
                  </div>
                );
              })}
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
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Se ajusta el tamaño de las columnas según el ancho
  gap: '20px',
  justifyContent: 'center',
  padding: '20px',
  border: '1px solid #ddd',
  width: '100%', // Asegura que la galería ocupe el 100% del ancho disponible
  boxSizing: 'border-box', // Incluye el padding y el borde en el ancho total
};

const thumbnailStyle = {
  width: '100%', // Permite que la miniatura ocupe el 100% del ancho del contenedor
  height: 'auto', // Mantiene la proporción de la imagen
  objectFit: 'cover',
};

const thumbnailContainerStyle = {
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Añade una sombra para mejorar la apariencia
  transition: 'transform 0.2s', // Transición suave para el hover
};

const thumbnailContainerHoverStyle = {
  transform: 'scale(1.05)', // Efecto de zoom al pasar el ratón
};

const filterStyle = {
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center', // Centra el filtro
};

const buttonStyle = {
  display: 'block',
  margin: '20px auto',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#38b2ac', // Color de fondo para los botones
  color: '#ffffff', // Color del texto
  border: 'none', // Sin borde
  borderRadius: '5px', // Bordes redondeados
  transition: 'background-color 0.3s', // Transición suave para el hover
};

const buttonHoverStyle = {
  backgroundColor: '#26798e', // Cambia el color al pasar el ratón
};

const fileNameStyle = {
  fontSize: '14px',
  color: '#333',
  marginTop: '8px',
  wordWrap: 'break-word', // Ajusta el texto si el nombre es muy largo
};

export default ThumbnailGallery;
