import { NodeItem } from './NodeItem';

const sidebarNodes = [
  { type: 'customInput', label: 'Input Node', icon: '📥', description: 'Add starting values or uploaded content.' },
  { type: 'customOutput', label: 'Output Node', icon: '📤', description: 'Collect and expose the final result.' },
  { type: 'text', label: 'Text Node', icon: '📝', description: 'Template prompts with dynamic variables.' },
  { type: 'llm', label: 'LLM Node', icon: '🤖', description: 'Generate responses from prompts and context.' },
  { type: 'math', label: 'Math Node', icon: '➗', description: 'Run lightweight arithmetic transforms.' },
  { type: 'database', label: 'Database Node', icon: '🗄', description: 'Read and shape structured records.' },
  { type: 'api', label: 'API Node', icon: '🌐', description: 'Fetch or push data to external services.' },
];

export const Sidebar = () => (
  <aside
    style={{
      padding: 20,
      borderRadius: 24,
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
      display: 'grid',
      gap: 16,
      alignContent: 'start',
    }}
  >
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>
        Node Library
      </div>
      <h2 style={{ margin: '8px 0 0', fontSize: 20, color: '#0f172a' }}>Drag components into the canvas</h2>
      <p style={{ margin: '8px 0 0', color: '#64748b', lineHeight: 1.5 }}>
        Build pipelines by dragging nodes into the workspace, then connect them to define the data flow.
      </p>
    </div>
    <div style={{ display: 'grid', gap: 12 }}>
      {sidebarNodes.map((node) => (
        <NodeItem key={node.type} {...node} />
      ))}
    </div>
  </aside>
);

