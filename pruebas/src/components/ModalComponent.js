import React from 'react';


function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

const ModalComponent = ({ modalId, title, content }) => {
    return (
        <div id={modalId} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => closeModal(modalId)}>&times;</span>
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
