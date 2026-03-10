import { useState, useEffect } from 'react';
import { useOverlayBack } from 'use-inapp-back';

interface BasicModalProps {
  onClose: () => void;
}

export default function BasicModal({ onClose }: BasicModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => {
      setIsOpen(false);
      setTimeout(onClose, 100); // Small delay for smooth animation
    },
  });

  // Open modal after mount to trigger history entry
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeWithBack}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
            Basic Modal
          </h2>
          <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
            This is a basic modal example. You can close this modal by:
            <br />
            1. Clicking the close button below
            <br />
            2. Clicking outside the modal (on the backdrop)
            <br />
            3. Pressing the back button on your device
          </p>
          <button
            onClick={closeWithBack}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
