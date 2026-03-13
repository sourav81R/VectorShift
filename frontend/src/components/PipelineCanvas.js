import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import { nodeRegistry } from '../nodes/nodeRegistry';
import { useStore } from '../store';
import { getLayoutedElements } from '../utils/layout';

import 'reactflow/dist/style.css';

const nodeTypes = Object.fromEntries(
  Object.entries(nodeRegistry).map(([type, metadata]) => [type, metadata.component]),
);

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  setNodes: state.setNodes,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: {
    stroke: '#6366f1',
    strokeWidth: 2.4,
  },
};

const actionButtonStyle = {
  padding: '10px 16px',
  borderRadius: 999,
  border: '1px solid #c7d2fe',
  background: '#eef2ff',
  color: '#4338ca',
  fontWeight: 700,
  cursor: 'pointer',
};

const getNodeColor = (node) => nodeRegistry[node.type]?.color || '#64748b';

export const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(useShallow(selector));

  const minimapStyle = useMemo(() => ({
    background: '#ffffff',
    border: '1px solid #dbe3f0',
    borderRadius: 16,
  }), []);

  const getInitNodeData = useCallback((nodeId, type) => ({
    id: nodeId,
    nodeType: type,
  }), []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    if (!reactFlowInstance || !reactFlowWrapper.current) {
      return;
    }

    const payload = event.dataTransfer.getData('application/reactflow');
    if (!payload) {
      return;
    }

    const { nodeType } = JSON.parse(payload);
    if (!nodeType) {
      return;
    }

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const nodeId = getNodeID(nodeType);

    addNode({
      id: nodeId,
      type: nodeType,
      position,
      data: getInitNodeData(nodeId, nodeType),
    });
  }, [addNode, getInitNodeData, getNodeID, reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const autoLayout = useCallback((direction = 'LR') => {
    if (nodes.length === 0) {
      return;
    }

    setNodes(getLayoutedElements(nodes, edges, direction));

    window.requestAnimationFrame(() => {
      reactFlowInstance?.fitView({ padding: 0.2, duration: 500 });
    });
  }, [edges, nodes, reactFlowInstance, setNodes]);

  const fitCanvas = useCallback(() => {
    reactFlowInstance?.fitView({ padding: 0.2, duration: 500 });
  }, [reactFlowInstance]);

  return (
    <section className="canvas-card">
      <div className="canvas-toolbar">
        <div>
          <div className="panel-eyebrow">Workspace</div>
          <h2 className="canvas-title">Pipeline canvas</h2>
          <p className="canvas-copy">Lay out your graph, inspect large flows with the minimap, and keep the structure readable as it grows.</p>
        </div>
        <div className="canvas-actions">
          <button type="button" onClick={() => autoLayout('TB')} style={actionButtonStyle} className="canvas-action">Auto Layout</button>
          <button type="button" onClick={fitCanvas} style={actionButtonStyle} className="canvas-action">Fit View</button>
        </div>
      </div>
      <div ref={reactFlowWrapper} className="canvas-shell">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={{ stroke: '#818cf8', strokeWidth: 3 }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          snapGrid={[20, 20]}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="#d8e2f0" />
          <Controls position="top-right" showInteractive={false} />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            nodeBorderRadius={14}
            nodeStrokeWidth={(node) => (node.selected ? 3 : 2)}
            nodeColor={getNodeColor}
            nodeStrokeColor={(node) => getNodeColor(node)}
            maskColor="rgba(15, 23, 42, 0.05)"
            style={minimapStyle}
          />
        </ReactFlow>
        {nodes.length === 0 ? (
          <div className="canvas-empty">
            Drop a node from the library to begin. Once your graph grows, use Auto Layout and Fit View to keep everything readable.
          </div>
        ) : null}
      </div>
      <p className="canvas-copy" style={{ margin: 0 }}>
        Drag nodes from the sidebar, connect them in the canvas, and use Auto Layout to quickly organize larger pipelines.
      </p>
    </section>
  );
};
