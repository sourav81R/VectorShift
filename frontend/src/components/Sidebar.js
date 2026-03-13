import { NodeItem } from './NodeItem';
import { nodeRegistry, primaryNodeTypes } from '../nodes/nodeRegistry';
import { useStore } from '../store';

const sidebarNodes = primaryNodeTypes.map((type) => nodeRegistry[type]);

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
