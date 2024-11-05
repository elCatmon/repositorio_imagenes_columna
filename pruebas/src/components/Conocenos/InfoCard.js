import React, { useState } from 'react';
import Modal from 'react-modal';
import './Conocenos.css';

// Configura el estilo del modal (opcional)
Modal.setAppElement('#root');

const InfoCard = ({ image, name,title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="info-card" onClick={openModal}>
      <img src={image} alt={name} className="info-card-image" />
      <h2 className="info-card-name">{name}</h2>
      <h3 className="info-card-title">{title}</h3>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Descripción"
        style={{
          content: {
            width: '80%',
            maxWidth: '500px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <h2>{title}</h2>
        <h2 className="info-card-name">{name}</h2>
        <p className='JustifyModal'>{description}</p>
        <button className="btnModal" onClick={closeModal} style={{ marginTop: '20px', padding: '10px' }}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default InfoCard;
