'use client';

import { useEffect, useState, useRef } from 'react';

export interface UseOverlayBackProps {
  /** Whether the overlay is open */
  isOpen: boolean;
  /** Function to close the overlay */
  onClose: () => void;
  /** Unique ID for distinguishing multiple overlays (optional) */
  overlayId?: string;
}

/**
 * A React hook for managing browser history in overlays to enable back button closing.
 *
 * @example
 * Basic usage:
 * ```tsx
 * const { closeWithBack } = useOverlayBack({
 *   isOpen,
 *   onClose: () => setIsOpen(false),
 * });
 * ```
 *
 * @see {@link https://github.com/rami0617/use-inapp-back/tree/main/template | Template Examples}
 * For complete working examples, see the `/template` folder:
 * - BasicModal.tsx - Simple modal dialog
 * - BottomSheet.tsx - Mobile bottom sheet
 * - MultipleOverlays.tsx - Managing multiple overlays
 */
export const useOverlayBack = ({
  isOpen,
  onClose,
  overlayId = 'default-overlay',
}: UseOverlayBackProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const historyPushed = useRef<boolean>(false);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Back button detection handler
  useEffect(() => {
    if (!mounted) return;

    const handlePopState = () => {
      // Only handle if overlay is open and history entry was added
      if (isOpen && historyPushed.current) {
        historyPushed.current = false;
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose, mounted]);

  // History management based on overlay state
  useEffect(() => {
    if (!mounted) return;

    const wasOpen = prevIsOpenRef.current;
    const isNowOpen = isOpen;

    // When overlay opens: add history entry
    if (!wasOpen && isNowOpen && !historyPushed.current) {
      window.history.pushState({ overlayId }, '', window.location.href);
      historyPushed.current = true;
    }

    // When overlay closes (e.g., user clicks X button): clean up history
    if (wasOpen && !isNowOpen && historyPushed.current) {
      // Remove dummy entry from history
      window.history.back();
      historyPushed.current = false;
    }

    prevIsOpenRef.current = isOpen;
  }, [isOpen, mounted, overlayId]);

  // Function to close overlay directly via UI close button
  const closeWithBack = () => {
    if (!historyPushed.current) {
      // If no history entry exists, call onClose directly
      onClose();
      return;
    }

    // Reset history state (prevent duplicate calls)
    historyPushed.current = false;

    // Execute back navigation using standard History API
    window.history.back();
  };

  // Clean up history on component unmount (safety measure)
  useEffect(() => {
    return () => {
      if (historyPushed.current && window.history.state?.overlayId === overlayId) {
        window.history.back();
      }
    };
  }, [overlayId]);

  return {
    closeWithBack,
  };
};
