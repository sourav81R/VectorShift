import './styles/editor.css';
import { SubmitButton } from './submit';
import { PipelineCanvas } from './components/PipelineCanvas';
import { Sidebar } from './components/Sidebar';

function App() {
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
          <div className="sidebar-stack">
            <Sidebar />
            <SubmitButton />
          </div>
          <PipelineCanvas />
        </div>
      </div>
    </main>
  );
}

export default App;
