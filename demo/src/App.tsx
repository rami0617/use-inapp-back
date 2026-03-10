import { useState } from 'react';
import BasicModal from './examples/BasicModal';
import BottomSheet from './examples/BottomSheet';
import MultipleOverlays from './examples/MultipleOverlays';
import './App.css';

function App() {
  const [activeDemo, setActiveDemo] = useState<'basic' | 'bottom' | 'multiple' | null>(null);

  return (
    <div className="app">
      <header className="header">
        <h1>use-inapp-back</h1>
        <p className="subtitle">
          React hook for managing browser history in overlays
        </p>
        <a
          href="https://github.com/rami0617/use-inapp-back"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub →
        </a>
      </header>

      <main className="main">
        <section className="demo-section">
          <h2>Interactive Demos</h2>
          <p className="description">
            Try the examples below. Open them and use your browser's back button
            (or swipe back on mobile) to close them.
          </p>

          <div className="demo-grid">
            <button
              className="demo-card"
              onClick={() => setActiveDemo('basic')}
            >
              <h3>📋 Basic Modal</h3>
              <p>Simple modal dialog with backdrop</p>
            </button>

            <button
              className="demo-card"
              onClick={() => setActiveDemo('bottom')}
            >
              <h3>📱 Bottom Sheet</h3>
              <p>Mobile-style bottom sheet</p>
            </button>

            <button
              className="demo-card"
              onClick={() => setActiveDemo('multiple')}
            >
              <h3>🎯 Multiple Overlays</h3>
              <p>Multiple overlays with unique IDs</p>
            </button>
          </div>
        </section>

        <section className="features-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li>✅ Native back button support for overlays</li>
            <li>✅ Multiple overlay support with unique IDs</li>
            <li>✅ Works with Next.js App Router</li>
            <li>✅ TypeScript support with full type definitions</li>
            <li>✅ Zero dependencies (only React peer dependency)</li>
            <li>✅ SSR safe</li>
          </ul>
        </section>

        <section className="installation-section">
          <h2>Installation</h2>
          <pre className="code-block">
            <code>npm install use-inapp-back</code>
          </pre>
        </section>
      </main>

      {activeDemo === 'basic' && <BasicModal onClose={() => setActiveDemo(null)} />}
      {activeDemo === 'bottom' && <BottomSheet onClose={() => setActiveDemo(null)} />}
      {activeDemo === 'multiple' && <MultipleOverlays onClose={() => setActiveDemo(null)} />}
    </div>
  );
}

export default App;
