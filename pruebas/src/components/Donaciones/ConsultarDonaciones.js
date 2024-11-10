import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './ConsultarDonaciones.css';

function Estudios() {
  const [estudios, setEstudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    folio: '',
    correo: '',
    curp: '',
    FechaRecepcion: ''
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    if (filtros.folio) queryParams.append("folio", filtros.folio);
    if (filtros.correo) queryParams.append("correo", filtros.correo);
    if (filtros.curp) queryParams.append("curp", filtros.curp);
    if (filtros.FechaRecepcion) queryParams.append("FechaRecepcion", filtros.FechaRecepcion);

    // Log antes de la solicitud
    console.log("Parámetros de búsqueda:", queryParams.toString());

    try {
      const response = await fetch(`http://192.168.100.5:8081/api/estudios/consulta?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Error en la solicitud");

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // Log de la respuesta recibida
        console.log("Datos recibidos:", data);

        setEstudios(data);
      } else {
        console.error("Respuesta no es JSON:", await response.text());
      }
    } catch (error) {
      setError("Error al buscar estudios.");
      console.error("Error al buscar estudios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Log de los estudios antes de renderizarlos
  useEffect(() => {
    console.log("Estudios en estado:", estudios);
  }, [estudios]);

  return (
    <div>
      <div className="next-module">
        <Header />
      </div>

      <div className="contenido-principal">
        <div className="columna-formulario">
          <form onSubmit={handleBuscar}>
            <h2>Buscar donaciones</h2>
            <label>
              Folio:
              <input
                name="folio"
                value={filtros.folio}
                onChange={handleFiltroChange}
                className="input-field"
              />
            </label>
            <label>
              Correo:
              <input
                type="email"
                name="correo"
                value={filtros.correo}
                onChange={handleFiltroChange}
                className="input-field"
              />
            </label>
            <label>
              CURP:
              <input
                name="curp"
                value={filtros.curp}
                onChange={handleFiltroChange}
                className="input-field"
              />
            </label>
            <label>
              Fecha de Recepción:
              <input
                type="date"
                name="FechaRecepcion"
                value={filtros.FechaRecepcion}
                onChange={handleFiltroChange}
                className="input-field"
              />
            </label>
            <button className="btnBuscarDoancion" type="submit">Buscar</button>
          </form>
        </div>

        <div className="columna-tabla">
          <div className="next-module">
            <h2>Lista de donaciones</h2>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div class="tablaConsultDonaciones-wrapper">
              <table class="tablaConsultDonaciones">
                <thead>
                  <tr>
                    <th className="table-headerDonaiones">Folio</th>
                    <th className="table-headerDonaiones">Fecha de Recepción</th>
                    <th className="table-headerDonaiones">Fecha de Devolución</th>
                    <th className="table-headerDonaiones">Donador</th>
                    <th className="table-headerDonaiones">Detalles del Estudio</th>
                    <th className="table-headerDonaiones">Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudios.length > 0 ? (
                    estudios.map((estudio) => (
                      <tr key={estudio.folio}>
                        <td className='informacion'>{estudio.folio}</td>
                        <td className='informacion'>{new Date(estudio.fechaRecepcion).toLocaleDateString()}</td>
                        <td className='informacion'>{estudio.fechaDevolucion ? new Date(estudio.fechaDevolucion).toLocaleDateString() : 'N/A'}</td>
                        <td className='informacion'>{estudio.curp}</td>
                        <td className='detalles'>
                          <ul>
                            {estudio.detallesEstudios && estudio.detallesEstudios.length > 0 ? (
                              estudio.detallesEstudios.map((detalle, index) => (
                                <li key={index}>
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td><strong>Tipo de Estudio:</strong></td>
                                        <td>{detalle.tipoEstudio || 'No disponible'}</td>
                                      </tr>
                                      <tr>
                                        <td><strong>Cantidad de Imágenes:</strong></td>
                                        <td>{detalle.cantidadImagenes || 'No disponible'}</td>
                                      </tr>
                                      <tr>
                                        <td><strong>Observaciones:</strong></td>
                                        <td>{detalle.observaciones || 'No disponible'}</td>
                                      </tr>
                                      <tr>
                                        <td><strong>Donación:</strong></td>
                                        <td>{detalle.esDonacion ? "Sí" : "No"}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </li>
                              ))
                            ) : (
                              <li>No hay detalles disponibles</li>
                            )}
                          </ul>
                        </td>
                        <td className='informacion'>
                            < button className='btnOperaciones'>Acciones</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">No se encontraron donaciones.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default Estudios;
