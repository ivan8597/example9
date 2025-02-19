import React from 'react';
import styles from './Modal.module.scss';

interface ExistingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ExistingModal: React.FC<ExistingModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}; 