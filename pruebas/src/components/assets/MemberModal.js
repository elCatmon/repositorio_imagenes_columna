import React from 'react';
import './MemberModal.css';

function MemberModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={member.image} alt={member.name} className="modal-image" />
        <h2>{member.name}</h2>
        <p>{member.description}</p>
      </div>
    </div>
  );
}

export default MemberModal;
