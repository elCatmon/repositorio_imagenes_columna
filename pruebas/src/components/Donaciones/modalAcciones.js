import React, { useState } from 'react';
import './ConsultarDonaciones.css'
import Modal from 'react-modal';
import { BASE_URL } from '../config/config';

const ModalAcciones = ({ folio, fecha_recepcion, Correo, show, onClose }) => {

    const handleSendEmail = () => {
        console.log(fecha_recepcion, Correo)
        fetch(`${BASE_URL}/api/estudios/confirmar-digitalizacion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo: Correo,
                fecha: fecha_recepcion,
                folio: folio
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Correo enviado:", data);
                alert("Correo enviado:", data);
            })
            .catch((error) => {
                console.error("Error al enviar el correo:", error);
            });
    };


    const handleCancelDonation = () => {
        console.log("Cancelar Donación");
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            style={{
                content: {
                    width: '80%',
                    maxWidth: '500px',
                    maxHeight: '600px',
                    margin: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                    zIndex: 1000,
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            }}
        >
            <h2>Donacion: {folio}</h2>
            <p className='modalID'>Fecha de recepcion: {fecha_recepcion}</p>
            <div>
                <p className='modalText'>Si el proceso de digitalizacion fue realizado</p>
                <button className='btnModal' onClick={handleSendEmail}>
                    Enviar Correo
                </button>
            </div>
            <div>
                <p className='modalText'>Si los estudios ya han sido anonimizados</p>
                <button className='btnModal' onClick={handleCancelDonation}>
                    Enviar Correo
                </button>
            </div>
            <div>
                <p className='modalText'>Si el usuario ya no desea que sus donaciones se encuentren en la biblioteca</p>
                <button className='btnModal' onClick={handleCancelDonation}>
                    Cancelar Donación
                </button>
            </div>
            <div>
                <div>
                    <button className='btnModal' onClick={onClose} style={{ marginTop: '20px', padding: '10px' }}>
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAcciones;
