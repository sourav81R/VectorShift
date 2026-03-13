import { useEffect, useState } from 'react';
import './styles/editor.css';
import { SubmitButton } from './submit';
import { PipelineCanvas } from './components/PipelineCanvas';
import { Sidebar } from './components/Sidebar';

function App() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLibraryOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLibraryOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLibraryOpen]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    const nextTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <main className="app-shell">
      <div className="app-frame">
        <section className="hero-card">
          <div className="hero-content">
            <div className="hero-eyebrow">VectorShift Assessment</div>
            <h1 className="hero-title">Pipeline Builder</h1>
            <p className="hero-copy">
              Drag nodes from the library, connect them into a graph, and validate the pipeline with a FastAPI backend.
              The goal stays faithful to the assessment brief while presenting it like a polished internal developer tool.
            </p>
          </div>
          <div className="hero-chips hero-chips--right">
            <span className="hero-chip">Node Abstraction</span>
            <span className="hero-chip">Dynamic Text Handles</span>
            <span className="hero-chip">Backend DAG Validation</span>
          </div>
          <button
            type="button"
            className={`hero-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
            aria-label="Toggle dark mode"
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            <span className="hero-toggle-text">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            <span className="hero-toggle-track">
              <svg className="hero-toggle-icon hero-toggle-icon--sun" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93m14.14 14.14-1.414-1.414M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg className="hero-toggle-icon hero-toggle-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hero-toggle-thumb" />
            </span>
          </button>
        </section>
        <div className="editor-layout">
          <div className="builder-stack">
            <PipelineCanvas />
            <SubmitButton />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mobile-library-trigger"
        onClick={() => setIsLibraryOpen(true)}
      >
        Add Nodes
      </button>
      <div
        className={`mobile-library-backdrop ${isLibraryOpen ? 'is-open' : ''}`}
        onClick={() => setIsLibraryOpen(false)}
      />
      <aside
        className={`mobile-library-sheet ${isLibraryOpen ? 'is-open' : ''}`}
        aria-hidden={!isLibraryOpen}
      >
        <div className="mobile-library-sheet-handle" />
        <div className="mobile-library-sheet-header">
          <div>
            <div className="panel-eyebrow">Mobile Library</div>
            <h2 className="sidebar-title">Add nodes quickly</h2>
          </div>
          <button
            type="button"
            className="mobile-library-close"
            onClick={() => setIsLibraryOpen(false)}
            aria-label="Close node library"
          >
            Close
          </button>
        </div>
        <Sidebar onNodeAdded={() => setIsLibraryOpen(false)} />
      </aside>
    </main>
  );
}

export default App;
