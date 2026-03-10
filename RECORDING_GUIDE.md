# Recording Guide for Demo GIFs

This guide will help you record demo GIFs for the README.

## Step 1: Run the Demo App

```bash
cd demo
npm run dev
```

The demo will be available at `http://localhost:5173`

## Step 2: Recording Tools

### Option A: Kap (macOS - Recommended)

1. **Install Kap:**
   ```bash
   brew install --cask kap
   ```

2. **Recording Settings:**
   - Format: GIF
   - FPS: 30
   - Quality: Medium
   - Size: 800x600 or smaller
   - Duration: 5-10 seconds per demo

3. **Record:**
   - Open Kap
   - Select the browser window area
   - Click "Start Recording"
   - Perform the demo action
   - Click "Stop Recording"

### Option B: LICEcap (Cross-platform)

1. **Download:** http://www.cockos.com/licecap/

2. **Recording Settings:**
   - FPS: 25-30
   - Max colors: 256
   - Size: Keep it under 5MB

3. **Record:**
   - Open LICEcap
   - Position the frame over the demo
   - Click "Record"
   - Perform actions
   - Click "Stop"

### Option C: ffmpeg (Command line)

If you have a screen recording in MP4 format, convert it to GIF:

```bash
# Install ffmpeg
brew install ffmpeg

# Convert MP4 to GIF
ffmpeg -i input.mp4 -vf "fps=30,scale=800:-1:flags=lanczos" -c:v gif output.gif

# Optimize GIF size
ffmpeg -i input.mp4 -vf "fps=15,scale=600:-1:flags=lanczos" -c:v gif -b:v 1M output.gif
```

## Step 3: What to Record

### Demo 1: Basic Modal
**Filename:** `demo-basic-modal.gif`
**Duration:** 5-7 seconds

**Actions:**
1. Click "Basic Modal" button
2. Modal opens
3. Wait 1 second
4. Press browser back button (show cursor)
5. Modal closes smoothly

**Tips:**
- Show the browser back button
- Keep cursor movements smooth
- Center the modal in frame

### Demo 2: Bottom Sheet
**Filename:** `demo-bottom-sheet.gif`
**Duration:** 5-7 seconds

**Actions:**
1. Click "Bottom Sheet" button
2. Sheet slides up from bottom
3. Wait 1 second
4. Press back button
5. Sheet slides down

**Tips:**
- Capture the full slide animation
- Mobile viewport size looks better
- Show the slide-up animation clearly

### Demo 3: Multiple Overlays
**Filename:** `demo-multiple-overlays.gif`
**Duration:** 10-12 seconds

**Actions:**
1. Click "Multiple Overlays"
2. Open modal → wait 0.5s
3. Open drawer → wait 0.5s
4. Open bottom sheet → wait 0.5s
5. Press back button → bottom sheet closes
6. Press back again → drawer closes
7. Press back again → modal closes

**Tips:**
- Show all three overlays stacked
- Demonstrate back button closing them in order
- May need to slow down or speed up recording

## Step 4: Optimize GIFs

### Using gifsicle (Recommended)

```bash
# Install gifsicle
brew install gifsicle

# Optimize GIF
gifsicle -O3 --colors 256 input.gif -o output.gif

# Resize if too large
gifsicle --resize-width 600 input.gif -o output.gif
```

### Using ImageOptim (macOS GUI)

1. Download: https://imageoptim.com/
2. Drag and drop GIFs
3. Automatic optimization

### Target Specifications

- **File size:** Under 5MB per GIF
- **Dimensions:** 600-800px width
- **Duration:** 5-10 seconds
- **FPS:** 25-30
- **Colors:** 256 or less

## Step 5: Add to README

### Create assets folder

```bash
mkdir -p assets
mv demo-*.gif assets/
```

### Update README.md

Add this section after the "Installation" section:

```markdown
## Demo

### Basic Modal
![Basic Modal Demo](./assets/demo-basic-modal.gif)

### Bottom Sheet
![Bottom Sheet Demo](./assets/demo-bottom-sheet.gif)

### Multiple Overlays
![Multiple Overlays Demo](./assets/demo-multiple-overlays.gif)
```

### Commit the assets

```bash
git add assets/
git commit -m "docs: add demo GIFs to README"
```

## Step 6: Alternative - Host on External Service

If GIF files are too large for the repo:

### Option A: Use GitHub Issues

1. Create a dummy issue in your repo
2. Drag and drop GIFs into the issue comment
3. GitHub will upload and provide URLs
4. Copy the URLs and use in README
5. Close the issue (or keep it)

Example:
```markdown
![Demo](https://user-images.githubusercontent.com/...)
```

### Option B: Use imgur

1. Go to https://imgur.com/upload
2. Upload GIFs
3. Get direct links
4. Use in README

## Tips for Better Recordings

1. **Clean Browser:** Remove extensions, bookmarks bar
2. **Consistent Timing:** Use same timing for all demos
3. **Smooth Cursor:** Move cursor smoothly and deliberately
4. **Highlight Action:** Pause slightly before clicking
5. **Mobile Simulation:** Use Chrome DevTools device toolbar (⌘+Shift+M)
6. **High DPI:** Record on Retina display for sharper quality
7. **Consistent Colors:** Use same browser theme
8. **No Distractions:** Close other apps, hide dock/taskbar

## Troubleshooting

### GIF is too large (>5MB)

1. Reduce resolution: Scale to 600px width
2. Reduce FPS: Use 15-20 fps instead of 30
3. Reduce colors: Use 128 colors instead of 256
4. Shorten duration: Keep under 10 seconds
5. Use lossy optimization: `gifsicle --lossy=80`

### GIF looks blurry

1. Record at higher resolution (2x) then scale down
2. Use lossless optimization
3. Increase colors to 256
4. Record on Retina display

### Animation is choppy

1. Increase FPS to 30
2. Use hardware acceleration in browser
3. Close other apps during recording
4. Record shorter clips

## Recommended Workflow

1. Run demo app: `cd demo && npm run dev`
2. Open in Chrome with DevTools device toolbar (iPhone 12 Pro)
3. Use Kap to record each demo (GIF format, 30fps)
4. Optimize with gifsicle: `gifsicle -O3 --colors 256 -o optimized.gif original.gif`
5. Check file size (should be <3MB each)
6. Move to assets folder
7. Update README.md
8. Commit and push

## Example Commands

```bash
# Complete workflow
cd demo && npm run dev &

# Record with Kap (GUI)
# ...

# Optimize all GIFs
for f in *.gif; do
  gifsicle -O3 --colors 256 "$f" -o "optimized-$f"
done

# Move to assets
mkdir -p ../assets
mv optimized-*.gif ../assets/

# Rename
cd ../assets
mv optimized-demo1.gif demo-basic-modal.gif
mv optimized-demo2.gif demo-bottom-sheet.gif
mv optimized-demo3.gif demo-multiple-overlays.gif
```

Happy recording! 🎬
