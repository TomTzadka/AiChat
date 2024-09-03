import React from 'react';
import './Modal.css'; // Ensure you have styles in this file

const Modal = ({ isOpen, onClose, response }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Response from Server:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Modal;
