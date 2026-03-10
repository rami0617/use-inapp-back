import { useState, useEffect } from 'react';
import { useOverlayBack } from 'use-inapp-back';

interface BottomSheetProps {
  onClose: () => void;
}

export default function BottomSheet({ onClose }: BottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => {
      setIsOpen(false);
      setTimeout(onClose, 300); // Match animation duration
    },
    overlayId: 'bottom-sheet',
  });

  // Open bottom sheet after mount to trigger history entry
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Prevent background scroll when bottom sheet is open
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px',
          zIndex: 1001,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          animation: 'slideUp 0.3s ease-out',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: '#ddd',
            borderRadius: '2px',
            margin: '0 auto 20px',
          }}
        />

        <h2 style={{ margin: '0 0 16px 0', fontSize: '22px' }}>
          Bottom Sheet
        </h2>

        <p style={{ margin: '0 0 16px 0', color: '#666', lineHeight: '1.6' }}>
          This is a bottom sheet component commonly used in mobile apps.
          It slides up from the bottom of the screen.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Menu Options</h3>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Option 1
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Option 2
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Option 3
          </button>
        </div>

        <button
          onClick={closeWithBack}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Close
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
