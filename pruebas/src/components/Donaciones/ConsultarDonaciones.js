// EstudiosTable.js
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
        const response = await fetch('http://192.168.100.5:8081/api/estudios/consulta'); // URL del endpoint ajustada
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setEstudios(data);
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
        <Header/>
        </div>
        <div className="next-module"/>
      <h2>Lista de Estudios</h2>
      <table>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Fecha de Recepción</th>
            <th>Fecha de Devolución</th>
            <th>Correo</th>
            <th>CURP</th>
            <th>Tipo de Estudio</th>
            <th>Cantidad de Imágenes</th>
            <th>Observaciones</th>
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
              <td>{estudio.TipoEstudio}</td>
              <td>{estudio.CantidadImagenes}</td>
              <td>{estudio.Observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="next-module"/>
      <Footer/>
    </div>
  );    
}

export default EstudiosTable;
