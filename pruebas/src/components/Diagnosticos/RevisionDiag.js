import React, { useState } from 'react';
import "./RevisionDiag.css"
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import DicomViewer from '../Visualizador/DicomViewer';
//import { BASE_URL } from '../config/config';

const RevisionDiagnostico = ({ onSearch }) => {

    // Estado para los campos de búsqueda
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [imagen, setImagen] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [revision, setRevision] = useState('')

    const [resultados, setResultados] = useState([]);

    const handleSearch = (searchParams) => {
        // Si estás buscando en una lista de datos estática:
        const datos = [
            { nombre: 'Juan Pérez', correo: 'juan@example.com', imagen: 'imagen1.jpg' },
            { nombre: 'María Gómez', correo: 'maria@example.com', imagen: 'imagen2.jpg' },
            // otros datos...
        ];

        // Filtrar los datos basados en los parámetros de búsqueda
        const resultadosFiltrados = datos.filter((item) => {
            return (
                (searchParams.nombre ? item.nombre.toLowerCase().includes(searchParams.nombre.toLowerCase()) : true) &&
                (searchParams.correo ? item.correo.toLowerCase().includes(searchParams.correo.toLowerCase()) : true) &&
                (searchParams.imagen ? item.imagen.toLowerCase().includes(searchParams.imagen.toLowerCase()) : true)
            );
        });
        // Establecer los resultados de la búsqueda
        setResultados(resultadosFiltrados);
    };

    const [formData, setFormData] = useState({
        hallazgos: '',
        impresion: '',
        observaciones: '',
        medico: '',
        medicoNuevo: localStorage.getItem('nombre'),
        fecha: '',
        tipoEstudio: '',
        region: '',
        proyeccion: '',
        valido: '',
        obtencion: '',
        sexo: '',
        edad: ''
    });


    // Manejadores de eventos para actualizar los estados
    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleCorreoChange = (e) => setCorreo(e.target.value);
    const handleImagenChange = (e) => setImagen(e.target.value);

    // Enviar la búsqueda
    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamar a la función de búsqueda pasando los valores
        onSearch({ nombre, correo, imagen });
    };

    return (
        <div>
            <Header />
            <div>
                <div className='contenido-principal-revision'>
                    <div className="revision-formulario">
                        <form onSubmit={handleSubmit} className="search-form">
                            <div>
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    placeholder="Buscar por nombre del medico"
                                />
                            </div>

                            <div>
                                <label htmlFor="correo">Correo:</label>
                                <input
                                    type="email"
                                    id="correo"
                                    value={correo}
                                    onChange={handleCorreoChange}
                                    placeholder="Buscar por correo del medico"
                                />
                            </div>

                            <div>
                                <label htmlFor="imagen">Imagen:</label>
                                <input
                                    type="text"
                                    id="imagen"
                                    value={imagen}
                                    onChange={handleImagenChange}
                                    placeholder="Buscar por nombre del estudio"
                                />
                            </div>

                            <button type="submit">Buscar</button>
                        </form>
                    </div>
                    {/* Mostrar los resultados de la búsqueda en una tabla */}
                    <div className='TablaDiagnosticos'>
                        <h2>Resultados de la búsqueda:</h2>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Nombre del Estudio</th>
                                    <th>Nombre del Médico</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.length > 0 ? (
                                    resultados.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombreEstudio}</td>
                                            <td>{item.nombreMedico}</td>
                                            <td>{item.fecha}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No se encontraron resultados</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='next-module' />
                <div className='contenido-principal-revision'>
                    <div className="form-diagnostico-revision" style={{ margin: '20px' }}>
                        <h2>Diagnóstico</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }}>Región:</label>
                                <br/>
                                <select
                                    name="region"
                                    value={formData.region}
                                    readOnly
                                >
                                    <option value="">Seleccione</option>
                                    <option value="00">Desconocido</option>
                                    <option value="02">Columna Vertebral</option>
                                    <option value="26">Pelvis</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }}>Proyección:</label>
                                <br/>
                                <select
                                    name="proyeccion"
                                    value={formData.proyeccion}
                                    readOnly
                                >
                                    <option value="">Seleccione</option>
                                    <option value="00">Desconocido</option>
                                    <option value="01">Postero Anterior</option>
                                    <option value="02">Antero Posterior</option>
                                    <option value="03">Obliqua</option>
                                    <option value="04">Lateral Izquierda</option>
                                    <option value="05">Lateral Derecha</option>
                                    <option value="06">Especial</option>
                                    <option value="07">Comparativa</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="hallazgos">Hallazgos:</label>
                                <textarea
                                    id="hallazgos"
                                    name="hallazgos"
                                    placeholder="Hallazgos"
                                    value={formData.hallazgos}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="impresion">Impresión Diagnóstica:</label>
                                <textarea
                                    id="impresion"
                                    name="impresion"
                                    placeholder="Impresión diagnóstica"
                                    value={formData.impresion}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="observaciones">Observaciones:</label>
                                <textarea
                                    id="observaciones"
                                    name="observaciones"
                                    placeholder="Observaciones"
                                    value={formData.observaciones}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }}>Sexo:</label>
                                <br/>
                                <select
                                    name="sexo"
                                    value={formData.sexo}
                                    readOnly
                                >
                                    <option value="">Seleccione</option>
                                    <option value="0">Desconocido</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Femenino</option>
                                </select>
                            </div>

                            {/* Edad */}
                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }}>Edad:</label>
                                <br/>
                                <select name="edad" value={formData.edad} readOnly>
                                    <option value="">Seleccione</option>
                                    <option value="0">Desconocido</option>
                                    <option value="1">Lactante menores de 1 año</option>
                                    <option value="2">Prescolar 1-5</option>
                                    <option value="3">Infante 6-12</option>
                                    <option value="4">Adolescente 13-18</option>
                                    <option value="5">Adulto joven 19-26</option>
                                    <option value="6">Adulto 27-59</option>
                                    <option value="7">Adulto mayor 60+</option>
                                </select>
                            </div>

                            {/* Campo para el médico */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="medicoA">Médico que hizo el diagnóstico:</label>
                                <input
                                    type="text"
                                    id="medicoA"
                                    name="medicoA"
                                    placeholder="Ingresa el nombre del médico"
                                    value={formData.medico}
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>

                            {/* Campo para la fecha */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontWeight: 'bold' }} htmlFor="fecha">Fecha del diagnóstico:</label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    value={formData.fecha} // Asegúrate de que formData.fecha tenga un valor de fecha válido
                                    readOnly
                                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="imageEstudio">
                        {selectedImage ? (
                            <DicomViewer fileName={selectedImage} />
                        ) : (
                            <p>Selecciona un estudio para ver la imagen DICOM.</p>
                        )}
                    </div>
                </div>
                <div className='contenido-principal-revision'>
                    <div style={{ marginBottom: '15px', width: '60%' }}>
                        <label style={{ fontWeight: 'bold' }} htmlFor="impresion">Observaciones</label>
                        <textarea
                            id="revision"
                            name="revision"
                            placeholder="Observaciones del diagnostico"
                            value={revision}
                            style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px'}}
                        />
                        <button>Enviar comentarios</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RevisionDiagnostico;