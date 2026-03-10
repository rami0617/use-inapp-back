import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry point
  entry: ['src/index.ts'],

  // Output formats
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations
  dts: true,

  // Code splitting for better tree-shaking
  splitting: false,

  // Generate source maps for debugging
  sourcemap: true,

  // Clean output directory before build
  clean: true,

  // Minify output
  minify: false, // Keep readable for library debugging

  // External dependencies (don't bundle React)
  external: ['react', 'react-dom'],

  // Preserve 'use client' directive for Next.js compatibility
  banner: {
    js: "'use client';",
  },

  // Target modern browsers and Node
  target: 'es2018',

  // Output file naming
  outDir: 'dist',
});
