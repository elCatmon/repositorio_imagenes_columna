import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from './config';
import '../App.css'; 

const ThumbnailGallery = ({ onThumbnailClick }) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Página actual
  const [hasMore, setHasMore] = useState(true); // Si hay más imágenes para cargar

  const [tipoEstudio, setTipoEstudio] = useState('');
  const [region, setRegion] = useState('');
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('');

  const fetchImages = useCallback(async (pageNumber) => {
    if (!tipoEstudio) return;

    try {
      const query = new URLSearchParams({
        tipoEstudio,
        region,
        edad,
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
  }, [tipoEstudio, region, edad, sexo]);

  useEffect(() => {
    setImages([]); // Limpiar imágenes cuando cambian los filtros
    setPage(1); // Resetear la página
    setHasMore(true); // Volver a habilitar el botón de cargar más
    fetchImages(1); // Cargar la primera página
  }, [fetchImages, tipoEstudio, region, edad, sexo]);

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
    <div className="thumbnail-gallery-container" style={{ marginLeft:'100px'}}>
      <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily:'Poppins' }}>
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

        {tipoEstudio && (
          <>
            <label>
              Región:
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">Seleccione</option>
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
            </label>

          {/* Edad */}
            <label>Edad:</label>
            <select value={edad} onChange={(e) => setEdad(e.target.value)}>
              <option value="">Seleccione</option>
              <option value="1">"Lactante menores de 1 año</option>
              <option value="2">Prescolar 1-5</option>
              <option value="3">Infante 6-12</option>
              <option value="4">Adolescente 13-18</option>
              <option value="5">Adulto joven 19-26</option>
              <option value="6">Adulto 27-59</option>
              <option value="7">Adulto mayor 60+</option>
            </select>

            <label>
              Sexo:
              <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
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
