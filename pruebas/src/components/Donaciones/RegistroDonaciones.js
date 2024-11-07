import React, { useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './RegistroDonaciones.css';

function FormularioEstudios() {
  const [tipoPersona, setTipoPersona] = useState('');
  const [datosPersona, setDatosPersona] = useState({
    correo: '',
    curp: '',
    carrera: '',
    cuatrimestre: '',
    area: ''
  });

  const [datosEstudios, setDatosEstudios] = useState([
    { tipoEstudio: '', cantidadImagenes: 0, esDonacion: false, observaciones: '' }
  ]);
  
  const [registros, setRegistros] = useState([]);

  const tiposEstudio = [
    'Radiografia', 'Tomografia Computarizada', 'Resonancia Magnetica',
    'Ultrasonido', 'Mastografia', 'Angiografia', 'Medicina Nuclear', 'Fluoroscopia'
  ];

  const cuatrimestres = [
    '1ro', '2do', '3ro', '4to', '5to', '6to', '8vo', '9no', 'Estadía'
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
  
    const folio = 'D' + Math.floor(Math.random() * 1e11).toString().padStart(11, '0');
    const fechaRecepcion = new Date().toISOString();
    const fechaDevolucion = calcularFechaPrestamo();
  
    const tiposDeEstudioConcatenados = datosEstudios.map(estudio => estudio.tipoEstudio).join(', ');
    const totalCantidadImagenes = datosEstudios.reduce((total, estudio) => total + estudio.cantidadImagenes, 0);
    const estudiosConDonacionesYObservaciones = datosEstudios.map(estudio => ({
      tipoEstudio: estudio.tipoEstudio,
      cantidadImagenes: parseInt(estudio.cantidadImagenes, 10),  // Convertir a número
      esDonacion: estudio.esDonacion,
      observaciones: estudio.observaciones
    }));
  
    const nuevoRegistro = {
      folio,
      fechaRecepcion,
      fechaDevolucion,
      ...datosPersona,
      estudios: tiposDeEstudioConcatenados,
      cantidadTotalImagenes: totalCantidadImagenes,
      detallesEstudios: estudiosConDonacionesYObservaciones,
    };
  
    console.log(nuevoRegistro.estudios);
    console.log(nuevoRegistro.cantidadTotalImagenes);
    console.log(nuevoRegistro.detallesEstudios);
  
    try {
      const response = await fetch('http://192.168.252.129:8081/api/estudios', {
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
        carrera: '',
        cuatrimestre: '',
        area: '',
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

  return (
    <div>
      <div className="next-module"><Header /></div>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Datos de la Persona</h2>
            <label>
              Tipo de Persona:
              <select value={tipoPersona} onChange={(e) => setTipoPersona(e.target.value)} className="input-field">
                <option value="">Seleccionar</option>
                <option value="alumno">Alumno</option>
                <option value="trabajador">Trabajador</option>
                <option value="externo">Externo</option>
              </select>
            </label>

            <label>
              Correo:
              <input
                type="email"
                name="correo"
                value={datosPersona.correo}
                onChange={handlePersonaChange}
                required
                className="input-field"
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
                className="input-field"
                maxLength={18}
              />
            </label>

            {tipoPersona === 'alumno' && (
              <>
                <label>
                  Carrera:
                  <select
                    name="carrera"
                    value={datosPersona.carrera}
                    onChange={handlePersonaChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecciona una carrera</option>
                    <option value="Ingenieria Biomedica">Ingeniería Biomedica</option>
                    <option value="Ingenieria en Biotecnologia">Ingeniería en Biotecnología</option>
                    <option value="Ingenieria Financiera">Ingeniería Financiera</option>
                    <option value="Ingenieria en Tecnologias de la Informacion e Innovacion Digital">Ingeniería en Tecnologías de la Información e Innovación Digital</option>
                    <option value="Ingenieria Mecanica Automotriz">Ingeniería Mecánica Automotriz</option>
                    <option value="Ingenieria Mecatronica">Ingeniería Mecatrónica</option>
                    <option value="Ingenieria Mecatronica mixto">Ingeniería Mecatrónica Mixto</option>
                    <option value="Ingenieria Industrial">Ingeniería Industrial</option>
                    <option value="Licenciatura en Terapia Fisica">Licenciatura en Terapia Física</option>
                    <option value="Licenciatura en Medico Cirujano">Licenciatura en Médico Cirujano</option>
                    <option value="Ingenieria en Software">Ingeniería en Software</option>
                  </select>
                </label>
                <label>
                  Cuatrimestre:
                  <select
                    name="cuatrimestre"
                    value={datosPersona.cuatrimestre}
                    onChange={handlePersonaChange}
                    required
                    className="input-field"
                  >
                    <option value="">Seleccionar</option>
                    {cuatrimestres.map((cuatri, index) => (
                      <option key={index} value={cuatri}>{cuatri}</option>
                    ))}
                  </select>
                </label>
              </>
            )}

            {tipoPersona === 'trabajador' && (
              <label>
                Área:
                <input
                  type="text"
                  name="area"
                  value={datosPersona.area}
                  onChange={handlePersonaChange}
                  required
                  className="input-field"
                />
              </label>
            )}

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
                    className="input-field"
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
                    className="input-field"
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
                      className="input-field"
                    />
                  </label>
                </div>

              </div>
            ))}

            <button type="button" onClick={agregarOtroEstudio} className="add-study-button">
              Agregar otro estudio
            </button>
            <button type="submit">Guardar</button>
          </form>
        </div>

        {/* Tabla de registros guardados */}
        {registros.length > 0 && (
          <div className="table-container">
            <h2>Registros Guardados</h2>
            <table className="data-table">
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