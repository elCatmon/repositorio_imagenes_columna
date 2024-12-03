import React, { useState } from "react";
import './GenerarDx.css';

function GenerarDx() {
    const [formData, setFormData] = useState({
        hallazgos: '',
        impresion: '',
        observaciones: ''
    });

    return (
        <div>

            <div className="gdxia-form-diagnostico" style={{ margin: '20px' }}>
                <div className="gdxia-diagnostico" style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }} htmlFor="hallazgos">Hallazgos:</label>
                    <textarea
                        id="hallazgos"
                        name="hallazgos"
                        placeholder="Hallazgos generados"
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
                        placeholder="Impresión diagnóstica generada"
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
                        placeholder="Observaciones generadas"
                        value={formData.observaciones}
                        readOnly
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px', height: '100px', resize: 'vertical' }}
                    />
                </div>
                <button style={buttonStyle}> Guardar Diagnostico </button>

            </div>
        </div>

    );

}

const buttonStyle = {
    display: 'block',
    margin: '20px auto',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#38b2ac', // Color de fondo para los botones
    color: '#ffffff', // Color del texto
    border: 'none', // Sin borde
    borderRadius: '5px', // Bordes redondeados
    transition: 'background-color 0.3s', // Transición suave para el hover
  };

  
export default GenerarDx;