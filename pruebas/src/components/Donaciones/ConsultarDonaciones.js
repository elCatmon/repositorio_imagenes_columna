import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './ConsultarDonaciones.css';
import ModalAcciones from './modalAcciones';

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

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ folio: '', fecha_Recepcion: '', correoD: ''});

  const handleShowModal = (folio, fecha_Recepcion, correoD) => {
    setModalData({ folio, fecha_Recepcion, correoD}); // Establece el folio, id y fechaRecepcion
    console.log(folio, fecha_Recepcion, correoD)
    setShowModal(true); // Muestra el modal
  };


  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

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

    try {
      const response = await fetch(`http://192.168.100.5:8080/api/estudios/consulta?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Error en la solicitud");

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setEstudios(data || []);
      }
    } catch (error) {
      setError("Error al buscar estudios.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2>Lista de donaciones</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="tablaConsultDonaciones-wrapper">
              <table className="tablaConsultDonaciones">
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
                        <td className="informacion">{estudio.folio}</td>
                        <td className="informacion">{new Date(estudio.fechaRecepcion).toISOString().split("T")[0].split("-").reverse().join("/")}</td>
                        <td className="informacion">{estudio.fechaDevolucion ? new Date(estudio.fechaDevolucion).toISOString().split("T")[0].split("-").reverse().join("/") : 'N/A'}</td>
                        <td className="informacion">{estudio.curp}</td>
                        <td className="detalles">
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
                        <td className="informacion">
                          <button className='btnOperaciones' onClick={() => handleShowModal(estudio.folio, estudio.fechaRecepcion, estudio.correo)}>
                            Acciones
                          </button>
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
      <div className="next-module">
        <Footer />
      </div>
      <ModalAcciones
        folio={modalData.folio}
        fecha_recepcion={modalData.fecha_Recepcion}
        Correo={modalData.correoD}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Estudios;
