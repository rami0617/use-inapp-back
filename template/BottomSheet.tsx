/**
 * NOTE: This is a template file for demonstration purposes.
 * The import error for 'use-inapp-back' is expected in this project.
 *
 * To use this template in your project:
 * 1. Install the package: npm install use-inapp-back
 * 2. Copy this file to your project
 * 3. The import will work correctly after installation
 */

import { useState, useEffect } from 'react';
import { useOverlayBack } from 'use-inapp-back';

/**
 * Bottom Sheet Example
 *
 * This example demonstrates how to use useOverlayBack with a bottom sheet.
 * Bottom sheets are commonly used in mobile apps for actions or additional content.
 * The back button will slide the sheet down and close it.
 */
export default function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => setIsOpen(false),
    overlayId: 'bottom-sheet',
  });

  // Prevent background scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Open Bottom Sheet
      </button>

      {isOpen && (
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
              Bottom Sheet Title
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
      )}
    </div>
  );
}
