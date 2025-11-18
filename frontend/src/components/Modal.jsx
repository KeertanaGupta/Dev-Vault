import React from 'react';
import styles from './Modal.module.css';
import { X } from 'lucide-react'; // 'X' icon to close

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    // This is the semi-transparent background
    <div className={styles.overlay} onClick={onClose}>
      {/* This is the modal content box */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          {children} {/* This is where our form will go */}
        </div>
      </div>
    </div>
  );
}

export default Modal;