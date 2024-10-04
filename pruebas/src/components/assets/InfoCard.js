import React, { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const InfoCard = ({ image, name, title, description }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="info-card">
      <img src={image} alt={`Foto de ${name}`} className="img-fluid" />
      <div className="info-overlay">
        <h3>{name}</h3>
        <p>{title}</p>
        <button onClick={openModal} className="btn btn-primary mt-2">
          Mostrar más
        </button>
      </div>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Información del Integrante"
  className="modal-content"
  overlayClassName="modal-overlay"
>
  <div className="modal-header">
    <h2 className="modal-title">{name}</h2>
    <button onClick={closeModal} className="close">
      &times;
    </button>
  </div>
  <div className="modal-body">
    <img src={image} alt={`Foto de ${name}`} />
    <p>{description}</p>
  </div>
</Modal>

    </div>
  );
};

export default InfoCard;

