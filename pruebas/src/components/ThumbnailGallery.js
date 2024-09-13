import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from './config';

const ThumbnailGallery = ({ onThumbnailClick }) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Si hay más imágenes para cargar

  const [tipoEstudio, setTipoEstudio] = useState('');
  const [region, setRegion] = useState('');
  const [edadMin, setEdadMin] = useState('');
  const [edadMax, setEdadMax] = useState('');
  const [sexo, setSexo] = useState('');

  const fetchImages = useCallback(async (pageNumber) => {
    if (!tipoEstudio) return;

    try {
      const query = new URLSearchParams({
        tipoEstudio,
        region,
        edadMin,
        edadMax,
        sexo,
        page: pageNumber,
        limit: 18 // Limitar a 18 imágenes por página
      }).toString();

      const response = await fetch(`${BASE_URL}/thumbnails?${query}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.length < 18) {
          setHasMore(false); // No hay más imágenes para cargar
        }
        setImages(prevImages => [...prevImages, ...data]); // Añadir nuevas imágenes al estado
        setLoaded(true);
      } else {
        setError('Error al obtener las imágenes');
      }
    } catch (error) {
      setError('Error en la solicitud de imágenes: ' + error.message);
    }
  }, [tipoEstudio, region, edadMin, edadMax, sexo]);

  useEffect(() => {
    setImages([]); // Limpiar imágenes cuando cambian los filtros
    setPage(1); // Resetear la página
    setHasMore(true); // Volver a habilitar el botón de cargar más
    fetchImages(1); // Cargar la primera página
  }, [fetchImages, tipoEstudio, region, edadMin, edadMax, sexo]);

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage); // Cargar la siguiente página
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="thumbnail-gallery-container">
      <h2 className="thumbnail-gallery-header">Estudios médicos</h2>

      <div className="filters" style={filterStyle}>
        <label>
          Tipo de Estudio:
          <select value={tipoEstudio} onChange={(e) => setTipoEstudio(e.target.value)}>
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
        </label>

        {tipoEstudio && (
          <>
            <label>
              Región:
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
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
                <option value="sistema-digestivo">Sistema Digestivo</option>
                <option value="sistema-urogenital">Sistema Urogenital</option>
              </select>
            </label>

            <label>
              Edad Min:
              <input
                type="number"
                min="0"
                max="120"
                value={edadMin}
                onChange={(e) => setEdadMin(e.target.value)}
                placeholder="Edad mínima"
              />
            </label>

            <label>
              Edad Max:
              <input
                type="number"
                min="0"
                max="120"
                value={edadMax}
                onChange={(e) => setEdadMax(e.target.value)}
                placeholder="Edad máxima"
              />
            </label>

            <label>
              Sexo:
              <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </label>
          </>
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
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150'; }} // Imagen de sustitución en caso de error
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
