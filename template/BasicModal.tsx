/**
 * NOTE: This is a template file for demonstration purposes.
 * The import error for 'use-inapp-back' is expected in this project.
 *
 * To use this template in your project:
 * 1. Install the package: npm install use-inapp-back
 * 2. Copy this file to your project
 * 3. The import will work correctly after installation
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { useOverlayBack } from 'use-inapp-back';

/**
 * Basic Modal Example
 *
 * This example demonstrates how to use useOverlayBack with a simple modal.
 * When the modal is open, pressing the back button will close it instead of
 * navigating away from the page.
 */
export default function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  // Prevent background scroll when modal is open
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
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Open Modal
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
                Modal Title
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
      )}
    </div>
  );
}
