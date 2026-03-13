import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { useShallow } from 'zustand/react/shallow';

import { useStore } from '../store';
import { APINode } from '../nodes/APINode';
import { ConditionNode } from '../nodes/ConditionNode';
import { DatabaseNode } from '../nodes/DatabaseNode';
import { InputNode } from '../nodes/InputNode';
import { LLMNode } from '../nodes/LLMNode';
import { LoggerNode } from '../nodes/LoggerNode';
import { MathNode } from '../nodes/MathNode';
import { OutputNode } from '../nodes/OutputNode';
import { TextNode } from '../nodes/TextNode';
import { getLayoutedElements } from '../utils/layout';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  text: TextNode,
  llm: LLMNode,
  math: MathNode,
  database: DatabaseNode,
  api: APINode,
  condition: ConditionNode,
  logger: LoggerNode,
};

const typeColors = {
  customInput: '#3b82f6',
  customOutput: '#f97316',
  text: '#10b981',
  llm: '#8b5cf6',
  math: '#ec4899',
  database: '#f59e0b',
  api: '#06b6d4',
  condition: '#ef4444',
  logger: '#64748b',
};

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

const getNodeColor = (node) => typeColors[node.type] || '#64748b';

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
    <section
      style={{
        padding: 20,
        borderRadius: 24,
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
        display: 'grid',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>
            Workspace
          </div>
          <h2 style={{ margin: '6px 0 0', fontSize: 22, color: '#0f172a' }}>Pipeline canvas</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => autoLayout('TB')} style={actionButtonStyle}>Auto Layout</button>
          <button type="button" onClick={fitCanvas} style={actionButtonStyle}>Fit View</button>
        </div>
      </div>
      <div
        ref={reactFlowWrapper}
        style={{
          height: '72vh',
          minHeight: 560,
          borderRadius: 22,
          overflow: 'hidden',
          border: '1px solid #dbe3f0',
          background: 'linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)',
        }}
      >
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
      </div>
      <p style={{ margin: 0, color: '#64748b', lineHeight: 1.5 }}>
        Drag nodes from the sidebar, connect them in the canvas, and use Auto Layout to quickly organize larger pipelines.
      </p>
    </section>
  );
};
