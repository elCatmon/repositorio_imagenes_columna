import React, { useState } from 'react';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import './RegistroDonaciones.css'; 

function FormularioEstudios() {
  const [tipoPersona, setTipoPersona] = useState(''); // Tipo de persona (alumno, trabajador, externo)
  const [datosPersona, setDatosPersona] = useState({
    correo: '',
    curp: '',
    carrera: '',
    cuatrimestre: '',
    area: ''
  });

  const [datosEstudios, setDatosEstudios] = useState({
    tipoEstudio: '',
    cantidadImagenes: 0, // Asegúrate de que esto sea un número
    esDonacion: false,
    observaciones: '' // Nuevo campo de observaciones
  });

  const [registros, setRegistros] = useState([]); // Lista de registros guardados

  // Tipos de estudio
  const tiposEstudio = [
    'Radiografia', 'Tomografia Computarizada', 'Resonancia Magnetica', 
    'Ultrasonido', 'Mastografia', 'Angiografia', 'Medicina Nuclear', 'Fluoroscopia'
  ];

  // Opciones de cuatrimestre
  const cuatrimestres = [
    '1ro', '2do', '3ro', '4to', '5to', '6to', '8vo', '9no', 'Estadía'
  ];

  // Maneja cambios en los campos de persona
  const handlePersonaChange = (e) => {
    const { name, value } = e.target;
    setDatosPersona((prevDatos) => ({
      ...prevDatos,
      [name]: value
    }));
  };

  // Maneja cambios en los campos de estudios
  const handleEstudioChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosEstudios((prevDatos) => ({
      ...prevDatos,
      [name]: type === 'checkbox' ? checked : (name === 'cantidadImagenes' ? Number(value) : value)
    }));
  };

  // Calcula una fecha de vencimiento para préstamos
  const calcularFechaPrestamo = () => {
    const fecha = new Date();
    let diasAgregados = 0;
    while (diasAgregados < 5) {
      fecha.setDate(fecha.getDate() + 1);
      if (fecha.getDay() !== 0 && fecha.getDay() !== 6) {
        diasAgregados++;
      }
    }
    return fecha.toISOString(); // Retornar fecha en formato ISO
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generar folio
    const folio = (datosEstudios.esDonacion ? "D" : "P") + Math.floor(Math.random() * 1e11).toString().padStart(11, '0');

    // Obtener la fecha actual y fecha de devolución (si aplica)
    const fechaRecepcion = new Date().toISOString(); // Cambiar a formato ISO
    const fechaDevolucion = datosEstudios.esDonacion ? null : calcularFechaPrestamo();

    // Crear nuevo registro
    const nuevoRegistro = {
      folio,
      fechaRecepcion,
      fechaDevolucion,
      ...datosPersona,
      ...datosEstudios
    };

    try {
      // Enviar datos al servidor
      const response = await fetch('http://192.168.100.5:8081/api/estudios', { // Cambia la URL si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoRegistro)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el estudio');
      }

      // Añadir el nuevo registro a la lista de registros
      setRegistros((prevRegistros) => [...prevRegistros, nuevoRegistro]);

      // Limpiar los formularios
      setDatosPersona({
        correo: '',
        curp: '',
        carrera: '',
        cuatrimestre: '',
        area: ''
      });
      setDatosEstudios({
        tipoEstudio: '',
        cantidadImagenes: 0, // Reiniciar a 0
        esDonacion: false,
        observaciones: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '-'; // Manejo de fechas no definidas
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
};

return (
  <div>
        <div className="next-module">
        <Header/>
        </div>
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Sección de Datos de la Persona */}
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
            />
          </label>

          {tipoPersona === 'alumno' && (
            <>
              <label>
                Carrera:
                <input
                  type="text"
                  name="carrera"
                  value={datosPersona.carrera}
                  onChange={handlePersonaChange}
                  required
                  className="input-field"
                />
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

          {/* Sección de Datos de los Estudios */}
          <h2>Datos de los Estudios</h2>

          <label>
            Tipo de Estudio:
            <select
              name="tipoEstudio"
              value={datosEstudios.tipoEstudio}
              onChange={handleEstudioChange}
              required
              className="input-field"
            >
              <option value="">Seleccionar</option>
              {tiposEstudio.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </select>
          </label>

          <label>
            Cantidad de Imágenes:
            <input
              type="number"
              name="cantidadImagenes"
              value={datosEstudios.cantidadImagenes}
              onChange={handleEstudioChange}
              min="1"
              required
              className="input-field"
            />
          </label>

          <label>
            Donación:
            <input
              type="checkbox"
              name="esDonacion"
              checked={datosEstudios.esDonacion}
              onChange={handleEstudioChange}
            />
          </label>

          <label>
            Observaciones:
            <textarea
              name="observaciones"
              value={datosEstudios.observaciones}
              onChange={handleEstudioChange}
              className="input-field"
            />
          </label>

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
    <Footer />
  </div>
);

}

export default FormularioEstudios;