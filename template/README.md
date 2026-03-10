# use-inapp-back Templates

This folder contains ready-to-use examples demonstrating how to use the `use-inapp-back` hook in real-world scenarios.

## Available Templates

### 1. BasicModal.tsx
A simple modal dialog example that demonstrates the basic usage of `useOverlayBack`.

**Features:**
- Opens a centered modal dialog
- Closes with back button, backdrop click, or close button
- Basic styling with inline CSS

**Usage:**
```tsx
import BasicModal from './template/BasicModal';

function App() {
  return <BasicModal />;
}
```

### 2. BottomSheet.tsx
A mobile-style bottom sheet that slides up from the bottom of the screen.

**Features:**
- Slides up animation
- Drag handle indicator
- Multiple menu options
- Commonly used in mobile apps

**Usage:**
```tsx
import BottomSheet from './template/BottomSheet';

function App() {
  return <BottomSheet />;
}
```

### 3. MultipleOverlays.tsx
Demonstrates managing multiple overlays simultaneously with unique IDs.

**Features:**
- Modal, side drawer, and bottom sheet in one example
- Each overlay has a unique ID
- Back button closes the most recently opened overlay
- Shows proper z-index stacking

**Usage:**
```tsx
import MultipleOverlays from './template/MultipleOverlays';

function App() {
  return <MultipleOverlays />;
}
```

## How to Use These Templates

1. **Copy the template file** to your project
2. **Install the package**:
   ```bash
   npm install use-inapp-back
   ```
3. **Import and use** the component
4. **Customize** the styling and content to match your needs

## Customization Tips

### Styling
All examples use inline styles for simplicity. You can easily convert them to:
- CSS modules
- Styled-components
- Tailwind CSS
- Your preferred styling solution

### Animations
The templates include basic CSS animations. You can enhance them with:
- Framer Motion
- React Spring
- CSS transitions
- Your animation library of choice

### Accessibility
Consider adding:
- `aria-modal="true"` to modal containers
- `role="dialog"` to overlay content
- Focus management (trap focus inside modal)
- Escape key handler
- Screen reader announcements

## Example: Converting to Tailwind CSS

```tsx
// Before (inline styles)
<div style={{ backgroundColor: 'white', padding: '32px' }}>
  ...
</div>

// After (Tailwind CSS)
<div className="bg-white p-8">
  ...
</div>
```

## Example: Adding Framer Motion

```tsx
import { motion } from 'framer-motion';
import { useOverlayBack } from 'use-inapp-back';

function AnimatedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { closeWithBack } = useOverlayBack({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal content */}
        </motion.div>
      )}
    </>
  );
}
```

## Need Help?

- Check the main [README](../README.md) for API documentation
- Open an issue on [GitHub](https://github.com/rami0617/use-inapp-back/issues)
- Review the source code for detailed comments

## Contributing

Have a useful template to share? Feel free to submit a pull request!
