import { SubmitButton } from './submit';
import { PipelineCanvas } from './components/PipelineCanvas';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 1480, margin: '0 auto', display: 'grid', gap: 20 }}>
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
            Drag nodes from the sidebar into the canvas, connect them, and organize the graph with one-click layout tools.
          </p>
        </section>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px minmax(0, 1fr)',
            gap: 20,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'grid', gap: 20 }}>
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
