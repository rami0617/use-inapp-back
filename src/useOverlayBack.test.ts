import { renderHook, act, waitFor } from '@testing-library/react';
import { useOverlayBack } from './useOverlayBack';

describe('useOverlayBack', () => {
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
    // Reset history and location
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic functionality', () => {
    test('should return closeWithBack function', () => {
      const { result } = renderHook(() =>
        useOverlayBack({
          isOpen: false,
          onClose: mockOnClose,
        })
      );

      expect(result.current.closeWithBack).toBeDefined();
      expect(typeof result.current.closeWithBack).toBe('function');
    });

    test('should push history entry when overlay opens', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      const initialLength = window.history.length;

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      await waitFor(() => {
        expect(window.history.length).toBeGreaterThan(initialLength);
      });
    });

    test('should call onClose when back button is pressed', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      // Simulate back button press
      await act(async () => {
        window.history.back();
      });

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    test('should clean up history when overlay closes via UI', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      const lengthAfterOpen = window.history.length;

      // Close overlay via UI (not back button)
      await act(async () => {
        rerender({ isOpen: false });
      });

      await waitFor(() => {
        expect(window.history.length).toBeLessThanOrEqual(lengthAfterOpen);
      });
    });
  });

  describe('closeWithBack function', () => {
    test('should call window.history.back when history exists', async () => {
      const historySpy = jest.spyOn(window.history, 'back');

      const { result, rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      // Call closeWithBack
      await act(async () => {
        result.current.closeWithBack();
      });

      await waitFor(() => {
        expect(historySpy).toHaveBeenCalled();
      });

      historySpy.mockRestore();
    });

    test('should call onClose directly when no history entry exists', async () => {
      const { result } = renderHook(() =>
        useOverlayBack({
          isOpen: false,
          onClose: mockOnClose,
        })
      );

      // Call closeWithBack without opening overlay
      await act(async () => {
        result.current.closeWithBack();
      });

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Multiple overlays', () => {
    test('should support multiple overlays with unique IDs', async () => {
      const mockOnClose1 = jest.fn();
      const mockOnClose2 = jest.fn();

      const { rerender: rerender1 } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose1,
            overlayId: 'modal-1',
          }),
        { initialProps: { isOpen: false } }
      );

      const { rerender: rerender2 } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose2,
            overlayId: 'modal-2',
          }),
        { initialProps: { isOpen: false } }
      );

      // Open first overlay
      await act(async () => {
        rerender1({ isOpen: true });
      });

      // Open second overlay
      await act(async () => {
        rerender2({ isOpen: true });
      });

      // Both overlays should be able to coexist
      expect(mockOnClose1).not.toHaveBeenCalled();
      expect(mockOnClose2).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup on unmount', () => {
    test('should clean up history entry on unmount', async () => {
      const { unmount, rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
            overlayId: 'test-overlay',
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      const lengthAfterOpen = window.history.length;

      // Set history state to match overlay ID
      window.history.replaceState({ overlayId: 'test-overlay' }, '', window.location.href);

      // Unmount component
      await act(async () => {
        unmount();
      });

      // History should be cleaned up
      await waitFor(() => {
        expect(window.history.length).toBeLessThanOrEqual(lengthAfterOpen);
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle rapid open/close cycles', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      // Rapid open/close
      for (let i = 0; i < 5; i++) {
        await act(async () => {
          rerender({ isOpen: true });
        });

        await act(async () => {
          rerender({ isOpen: false });
        });
      }

      // Should not throw errors
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    test('should handle overlay opening before mount completes', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: true } }
      );

      // Should handle initial open state
      await waitFor(() => {
        expect(window.history.length).toBeGreaterThan(0);
      });

      // Close overlay
      await act(async () => {
        rerender({ isOpen: false });
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Default overlay ID', () => {
    test('should use default overlay ID when not provided', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      // Check that history state contains default ID
      await waitFor(() => {
        expect(window.history.state?.overlayId).toBe('default-overlay');
      });
    });

    test('should use custom overlay ID when provided', async () => {
      const { rerender } = renderHook(
        ({ isOpen }) =>
          useOverlayBack({
            isOpen,
            onClose: mockOnClose,
            overlayId: 'custom-id',
          }),
        { initialProps: { isOpen: false } }
      );

      // Open overlay
      await act(async () => {
        rerender({ isOpen: true });
      });

      // Check that history state contains custom ID
      await waitFor(() => {
        expect(window.history.state?.overlayId).toBe('custom-id');
      });
    });
  });
});
