import React from 'react';
import './ModalAlertas.css';

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

// Declaración de función en lugar de expresión
function ModalAlertas({ message, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalAlertas;
