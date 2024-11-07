import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './ConsultarDonaciones.css';

function EstudiosTable() {
  const [estudios, setEstudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstudios = async () => {
      try {
        const response = await fetch('http://192.168.252.129:8081/api/estudios/consulta'); // URL del endpoint ajustada
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        // Procesar los datos para asegurar la estructura correcta
        const processedEstudios = data.map(estudio => ({
          Folio: estudio.Folio,
          FechaRecepcion: estudio.FechaRecepcion,
          FechaDevolucion: estudio.FechaDevolucion,
          Correo: estudio.Correo,
          CURP: estudio.CURP,
          Carrera: estudio.Carrera,
          Cuatrimestre: estudio.Cuatrimestre,
          Area: estudio.Area,
          DetallesEstudios: estudio.DetallesEstudios || [], // Si DetallesEstudios es undefined, se inicializa como array vacío
        }));

        setEstudios(processedEstudios);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEstudios();
  }, []);

  if (loading) return <p>Cargando registros...</p>;
  if (error) return <p>Error al cargar registros: {error}</p>;

  return (
    <div>
      <div className="next-module">
        <Header />
      </div>
      <div className="next-module" />
      <h2>Lista de Estudios</h2>
      <table onContextMenu={(e) => e.preventDefault()}>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Fecha de Recepción</th>
            <th>Fecha de Devolución</th>
            <th>Correo</th>
            <th>CURP</th>
            <th>Detalles del Estudio</th>
          </tr>
        </thead>
        <tbody>
          {estudios.map((estudio) => (
            <tr key={estudio.Folio}>
              <td>{estudio.Folio}</td>
              <td>{new Date(estudio.FechaRecepcion).toLocaleDateString()}</td>
              <td>{estudio.FechaDevolucion ? new Date(estudio.FechaDevolucion).toLocaleDateString() : 'N/A'}</td>
              <td>{estudio.Correo}</td>
              <td>{estudio.CURP}</td>
              <td>
                <ul>
                  {estudio.DetallesEstudios && estudio.DetallesEstudios.length > 0 ? (
                    estudio.DetallesEstudios.map((detalle, index) => (
                      <li key={index}>
                        <strong>Tipo de Estudio:</strong> {detalle.TipoEstudio}, 
                        <strong> Cantidad de Imágenes:</strong> {detalle.CantidadImagenes}, 
                        <strong> Observaciones:</strong> {detalle.Observaciones}, 
                        <strong> Donación:</strong> {detalle.EsDonacion ? "Sí" : "No"}
                      </li>
                    ))
                  ) : (
                    <li>No hay detalles disponibles</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default EstudiosTable;
