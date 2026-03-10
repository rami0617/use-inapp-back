# use-inapp-back

A React hook for managing browser history in overlays (modals, bottom sheets, sidebars) to enable native back button behavior in mobile in-app browsers.

## Demo Videos
![Demo](./assets/demo.gif)

## Problem

In mobile in-app browsers (Instagram, Facebook, KakaoTalk, etc.), when users open a modal or bottom sheet and press the back button, they expect the overlay to close—not the entire page to navigate back. This hook provides a seamless solution by managing browser history states.

## Features

- ✅ Native back button support for overlays
- ✅ Multiple overlay support with unique IDs
- ✅ Works with Next.js App Router (`'use client'` compatible)
- ✅ TypeScript support with full type definitions
- ✅ Zero dependencies (only React peer dependency)
- ✅ Automatic cleanup on unmount
- ✅ SSR safe

## Installation

```bash
npm install use-inapp-back
# or
yarn add use-inapp-back
# or
pnpm add use-inapp-back
```

## Live Demo

Try the interactive demos to see `use-inapp-back` in action:

**Run locally:**
```bash
git clone https://github.com/rami0617/use-inapp-back.git
cd use-inapp-back/demo
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.



## Usage

### Basic Example

```tsx
import { useState } from 'react';
import { useOverlayBack } from 'use-inapp-back';

function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <div className="modal">
          <h2>Modal Title</h2>
          <button onClick={closeWithBack}>
            Close
          </button>
        </div>
      )}
    </>
  );
}
```

### With Multiple Overlays

```tsx
function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { closeWithBack: closeModal } = useOverlayBack({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
    overlayId: 'main-modal', // Unique ID
  });

  const { closeWithBack: closeDrawer } = useOverlayBack({
    isOpen: isDrawerOpen,
    onClose: () => setIsDrawerOpen(false),
    overlayId: 'side-drawer', // Unique ID
  });

  // ... rest of component
}
```

### With Next.js App Router

```tsx
'use client'; // Required for Next.js App Router

import { useState } from 'react';
import { useOverlayBack } from 'use-inapp-back';

export default function ModalComponent() {
  // ... implementation
}
```

## API

### `useOverlayBack(props: UseOverlayBackProps)`

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | ✅ | Whether the overlay is currently open |
| `onClose` | `() => void` | ✅ | Callback function to close the overlay |
| `overlayId` | `string` | ❌ | Unique identifier for the overlay (default: `'default-overlay'`) |

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `closeWithBack` | `() => void` | Function to close the overlay with back navigation |

## How It Works

1. When an overlay opens, the hook pushes a new history entry
2. If the user presses the back button, the `popstate` event triggers and closes the overlay
3. If the user closes via UI (X button), the hook automatically cleans up the history entry
4. On unmount, any remaining history entries are cleaned up automatically

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile in-app browsers (Instagram, Facebook, KakaoTalk, Line, etc.)
- ✅ iOS Safari and Chrome
- ✅ Android Chrome and Samsung Internet

## Use Cases

- Modal dialogs
- Bottom sheets
- Side drawers/sidebars
- Full-screen overlays
- Toast notifications with interaction
- Image lightboxes

## License

MIT © [rami0617](https://github.com/rami0617)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

Found a bug or have a feature request? Please open an issue at [GitHub Issues](https://github.com/rami0617/use-inapp-back/issues).
