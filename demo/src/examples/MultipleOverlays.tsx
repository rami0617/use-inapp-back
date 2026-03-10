import { useState, useEffect } from 'react';
import { useOverlayBack } from 'use-inapp-back';

interface MultipleOverlaysProps {
  onClose: () => void;
}

export default function MultipleOverlays({ onClose }: MultipleOverlaysProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { closeWithBack: closeModal } = useOverlayBack({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
    overlayId: 'main-modal',
  });

  const { closeWithBack: closeDrawer } = useOverlayBack({
    isOpen: isDrawerOpen,
    onClose: () => setIsDrawerOpen(false),
    overlayId: 'side-drawer',
  });

  const { closeWithBack: closeBottomSheet } = useOverlayBack({
    isOpen: isBottomSheetOpen,
    onClose: () => setIsBottomSheetOpen(false),
    overlayId: 'bottom-sheet',
  });

  const hasAnyOpen = isModalOpen || isDrawerOpen || isBottomSheetOpen;

  // Prevent background scroll when any overlay is open
  useEffect(() => {
    if (hasAnyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasAnyOpen]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 999,
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0 }}>Multiple Overlays Demo</h1>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </div>

        <p style={{ marginBottom: '24px', color: '#666' }}>
          Try opening multiple overlays and use the back button to close them one by one.
          Each overlay has a unique ID and can be managed independently.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Open Modal
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Open Drawer
          </button>

          <button
            onClick={() => setIsBottomSheetOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Open Bottom Sheet
          </button>
        </div>

        {hasAnyOpen && (
          <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <strong>Active Overlays:</strong>
            <ul style={{ margin: '8px 0 0 20px' }}>
              {isModalOpen && <li>Modal</li>}
              {isDrawerOpen && <li>Side Drawer</li>}
              {isBottomSheetOpen && <li>Bottom Sheet</li>}
            </ul>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
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
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0' }}>Modal</h2>
            <p style={{ margin: '0 0 24px 0', color: '#666' }}>
              This is a modal dialog. Press back button to close.
            </p>
            <button
              onClick={closeModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          <div
            onClick={closeDrawer}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1100,
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '300px',
              maxWidth: '80vw',
              backgroundColor: 'white',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              zIndex: 1101,
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            <h2 style={{ margin: '0 0 16px 0' }}>Side Drawer</h2>
            <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.6' }}>
              This is a side drawer that slides in from the right.
            </p>
            <nav style={{ marginBottom: '24px' }}>
              <a href="#" style={{ display: 'block', padding: '8px 0', color: '#007bff' }}>
                Menu Item 1
              </a>
              <a href="#" style={{ display: 'block', padding: '8px 0', color: '#007bff' }}>
                Menu Item 2
              </a>
              <a href="#" style={{ display: 'block', padding: '8px 0', color: '#007bff' }}>
                Menu Item 3
              </a>
            </nav>
            <button
              onClick={closeDrawer}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <>
          <div
            onClick={closeBottomSheet}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1200,
            }}
          />
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
              zIndex: 1201,
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: '#ddd',
                borderRadius: '2px',
                margin: '0 auto 20px',
              }}
            />
            <h2 style={{ margin: '0 0 16px 0' }}>Bottom Sheet</h2>
            <p style={{ margin: '0 0 24px 0', color: '#666' }}>
              This is a bottom sheet. Press back button to close.
            </p>
            <button
              onClick={closeBottomSheet}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
