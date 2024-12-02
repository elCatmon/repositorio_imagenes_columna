import React, { useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import "./RegistroDonaciones.css";
import { BASE_URL } from '../config/config';

function FormularioEstudios() {
  const [datosPersona, setDatosPersona] = useState({
    correo: '',
    curp: '',
  });

  const [datosEstudios, setDatosEstudios] = useState([
    { tipoEstudio: '', cantidadImagenes: 0, esDonacion: false, observaciones: '' }
  ]);

  const [registros, setRegistros] = useState([]);

  const tiposEstudio = [
    'Radiografia', 'Tomografia Computarizada', 'Resonancia Magnetica',
    'Ultrasonido', 'Mastografia', 'Angiografia', 'Medicina Nuclear', 'Fluoroscopia'
  ];

  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setDatosPersona((prevDatos) => ({
      ...prevDatos,
      [name]: value
    }));
  };

  const handleEstudioChange = (index, event) => {
    const { name, value, type, checked } = event.target;

    setDatosEstudios(prevState => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: type === 'checkbox' ? checked : name === 'cantidadImagenes' ? parseInt(value, 10) || 0 : value,
      };
      return newState;
    });
  };

  const agregarOtroEstudio = () => {
    setDatosEstudios((prevDatosEstudios) => [
      ...prevDatosEstudios,
      { tipoEstudio: '', cantidadImagenes: 0, esDonacion: false, observaciones: '' }
    ]);
  };

  const calcularFechaPrestamo = () => {
    const fecha = new Date();
    let diasAgregados = 0;
    while (diasAgregados < 5) {
      fecha.setDate(fecha.getDate() + 1);
      if (fecha.getDay() !== 0 && fecha.getDay() !== 6) {
        diasAgregados++;
      }
    }
    return fecha.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCURP(datosPersona.curp)) {
      alert('Por favor, ingresa un CURP válido.');
      return;
    }

    const folio = Math.floor(Math.random() * 1e11).toString().padStart(12, '0');
    const fechaRecepcion = new Date().toISOString();

    const estudiosConDonacionesYObservaciones = datosEstudios.map(estudio => ({
      tipoEstudio: estudio.tipoEstudio,
      cantidadImagenes: parseInt(estudio.cantidadImagenes, 10),
      esDonacion: estudio.esDonacion,
      observaciones: estudio.observaciones,
      fechaDevolucion: estudio.esDonacion ? '' : calcularFechaPrestamo() // Enviar vacío si es donación
    }));

    const tiposDeEstudioConcatenados = datosEstudios.map(estudio => estudio.tipoEstudio).join(', ');
    const totalCantidadImagenes = datosEstudios.reduce((total, estudio) => total + estudio.cantidadImagenes, 0);

    const nuevoRegistro = {
      folio,
      fechaRecepcion,
      ...datosPersona,
      estudios: tiposDeEstudioConcatenados,
      cantidadTotalImagenes: totalCantidadImagenes,
      detallesEstudios: estudiosConDonacionesYObservaciones,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/estudios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoRegistro),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el estudio');
      }

      setRegistros((prevRegistros) => [...prevRegistros, nuevoRegistro]);

      // Reiniciar los campos
      setDatosPersona({
        correo: '',
        curp: '',
      });
      setDatosEstudios([{ tipoEstudio: '', cantidadImagenes: 0, esDonacion: false, observaciones: '' }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  const isValidCURP = (curp) => {
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
    return curpRegex.test(curp);
  };

  return (
    <div>
      <div className="next-module">
        <Header />
      </div>
      <div className=".registro-container">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Datos de la Persona</h2>

            <label>
              Correo:
              <input
                type="email"
                name="correo"
                value={datosPersona.correo}
                onChange={handlePersonaChange}
                required
                className="input-field-R"
              />
            </label>

            <label>
              CURP:
              <input
                type="text"
                name="curp"
                value={datosPersona.curp}
                onChange={handlePersonaChange}
                required
                className="input-field-R"
                maxLength={18}
              />
            </label>

            <h2>Datos de los Estudios</h2>
            {datosEstudios.map((estudio, index) => (
              <div key={index}>
                <label>
                  Tipo de Estudio:
                  <select
                    name="tipoEstudio"
                    value={estudio.tipoEstudio}
                    onChange={(e) => handleEstudioChange(index, e)}  // Ensure event is passed
                    required
                    className="input-field-R"
                  >
                    <option value="">Seleccionar</option>
                    {tiposEstudio.map((tipo, tipoIndex) => (
                      <option key={tipoIndex} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </label>

                <label>
                  Cantidad de Imágenes:
                  <input
                    type="number"
                    name="cantidadImagenes"
                    value={estudio.cantidadImagenes}
                    onChange={(e) => handleEstudioChange(index, e)}  // Ensure event is passed
                    min="1"
                    required
                    className="input-field-R"
                  />
                </label>
                <div>
                  <label>
                    Donación:
                    <input
                      type="checkbox"
                      name="esDonacion"
                      checked={datosEstudios.esDonacion}
                      onChange={(event) => handleEstudioChange(index, event)}
                    />
                  </label>

                  <label>
                    Observaciones:
                    <textarea
                      name="observaciones"
                      value={datosEstudios.observaciones}
                      onChange={(event) => handleEstudioChange(index, event)}
                      className="input-field-R"
                    />
                  </label>
                </div>

              </div>
            ))}

            <button type="button" onClick={agregarOtroEstudio} className="add-study-button-R">
              Agregar otro estudio
            </button>
            <button type="submit">Guardar</button>
          </form>
        </div>

        {/* Tabla de registros guardados */}
        {registros.length > 0 && (
          <div className="table-container-R">
            <h2>Registros Guardados</h2>
            <table className="data-table-R">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha de Recepción</th>
                  <th>Fecha de Devolución</th>
                  <th>CURP</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro, index) => (
                  <tr key={index}>
                    <td>{registro.folio}</td>
                    <td>{formatDate(registro.fechaRecepcion)}</td>
                    <td>{formatDate(registro.fechaDevolucion)}</td>
                    <td>{registro.curp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="next-module" />
      <Footer />
    </div>
  );
}

export default FormularioEstudios;