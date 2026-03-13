// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { APINode } from './nodes/APINode';
import { ConditionNode } from './nodes/ConditionNode';
import { DatabaseNode } from './nodes/DatabaseNode';
import { InputNode } from './nodes/InputNode';
import { LLMNode } from './nodes/LLMNode';
import { LoggerNode } from './nodes/LoggerNode';
import { MathNode } from './nodes/MathNode';
import { OutputNode } from './nodes/OutputNode';
import { TextNode } from './nodes/TextNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  api: APINode,
  condition: ConditionNode,
  database: DatabaseNode,
  logger: LoggerNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(useShallow(selector));

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          if (!reactFlowInstance || !reactFlowWrapper.current) {
            return;
          }
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [addNode, getNodeID, reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <section
            style={{
                padding: '18px',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)'
            }}
        >
        <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>Canvas</div>
        <div ref={reactFlowWrapper} style={{ width: '100%', height: '70vh', borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color="#cbd5e1" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        {nodes.length === 0 ? (
            <p style={{ margin: '12px 0 0', color: '#64748b', fontSize: '14px' }}>
                Drop a node into the canvas to start building your pipeline.
            </p>
        ) : null}
        </section>
    )
}
