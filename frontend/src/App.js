import { useEffect, useState } from 'react';
import './styles/editor.css';
import { SubmitButton } from './submit';
import { PipelineCanvas } from './components/PipelineCanvas';
import { Sidebar } from './components/Sidebar';

function App() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

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

  return (
    <main className="app-shell">
      <div className="app-frame">
        <section className="hero-card">
          <div>
            <div className="hero-eyebrow">VectorShift Assessment</div>
            <h1 className="hero-title">Pipeline Builder</h1>
            <p className="hero-copy">
              Drag nodes from the library, connect them into a graph, and validate the pipeline with a FastAPI backend.
              The goal stays faithful to the assessment brief while presenting it like a polished internal developer tool.
            </p>
          </div>
          <div className="hero-chips">
            <span className="hero-chip">Node Abstraction</span>
            <span className="hero-chip">Dynamic Text Handles</span>
            <span className="hero-chip">Backend DAG Validation</span>
          </div>
        </section>
        <div className="editor-layout">
          <section className="workspace-grid">
            <Sidebar />
            <div className="builder-stack">
              <PipelineCanvas />
              <SubmitButton />
            </div>
          </section>
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
