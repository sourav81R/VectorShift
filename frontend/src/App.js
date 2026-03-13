import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gap: 20 }}>
        <section
          style={{
            padding: '20px 24px',
            borderRadius: 20,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08)',
          }}
        >
          <h1 style={{ margin: 0, fontSize: 28, color: '#0f172a' }}>Pipeline Builder</h1>
          <p style={{ margin: '8px 0 0', color: '#475569' }}>
            Drag nodes from the toolbar into the canvas, then connect them to build a flow.
          </p>
        </section>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </main>
  );
}

export default App;
