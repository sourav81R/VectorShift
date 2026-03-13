// toolbar.js

import { DraggableNode } from './draggableNode';

const toolbarNodes = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'math', label: 'Math' },
    { type: 'api', label: 'API' },
    { type: 'condition', label: 'Condition' },
    { type: 'database', label: 'Database' },
    { type: 'logger', label: 'Logger' },
];

export const PipelineToolbar = () => {

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
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>Nodes</div>
            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {toolbarNodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
            </div>
        </section>
    );
};
