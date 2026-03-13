import { NodeItem } from './NodeItem';
import { useStore } from '../store';

const sidebarNodes = [
  { type: 'customInput', label: 'Input Node', shortLabel: 'IN', accent: 'linear-gradient(135deg, #3b82f6, #60a5fa)', description: 'Add starting values or uploaded content.' },
  { type: 'customOutput', label: 'Output Node', shortLabel: 'OUT', accent: 'linear-gradient(135deg, #f97316, #fb923c)', description: 'Collect and expose the final result.' },
  { type: 'text', label: 'Text Node', shortLabel: 'TXT', accent: 'linear-gradient(135deg, #10b981, #34d399)', description: 'Template prompts with dynamic variables.' },
  { type: 'llm', label: 'LLM Node', shortLabel: 'LLM', accent: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', description: 'Generate responses from prompts and context.' },
  { type: 'math', label: 'Math Node', shortLabel: 'MTH', accent: 'linear-gradient(135deg, #ec4899, #f472b6)', description: 'Run lightweight arithmetic transforms.' },
  { type: 'database', label: 'Database Node', shortLabel: 'DB', accent: 'linear-gradient(135deg, #f59e0b, #fbbf24)', description: 'Read and shape structured records.' },
  { type: 'api', label: 'API Node', shortLabel: 'API', accent: 'linear-gradient(135deg, #06b6d4, #22d3ee)', description: 'Fetch or push data to external services.' },
];

export const Sidebar = ({ onNodeAdded }) => (
  <SidebarContent onNodeAdded={onNodeAdded} />
);

const SidebarContent = ({ onNodeAdded }) => {
  const addNode = useStore((state) => state.addNode);
  const getNodeID = useStore((state) => state.getNodeID);
  const nodeCount = useStore((state) => state.nodes.length);

  const addNodeFromSidebar = (type) => {
    const nodeId = getNodeID(type);
    addNode({
      id: nodeId,
      type,
      position: {
        x: 80 + (nodeCount % 2) * 48,
        y: 80 + nodeCount * 44,
      },
      data: {
        id: nodeId,
        nodeType: type,
      },
    });

    onNodeAdded?.();
  };

  return (
    <aside className="sidebar-card">
      <div>
        <div className="panel-eyebrow">Node Library</div>
        <h2 className="sidebar-title">Drag or tap components into the canvas</h2>
        <p className="sidebar-copy">
          On desktop, drag nodes into the workspace. On phones and tablets, tap a card to add it instantly and then arrange the flow.
        </p>
      </div>
      <div className="sidebar-grid">
        {sidebarNodes.map((node) => (
          <NodeItem key={node.type} {...node} onSelect={addNodeFromSidebar} />
        ))}
      </div>
    </aside>
  );
};
