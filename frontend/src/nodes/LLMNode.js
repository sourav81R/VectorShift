import { BaseNode } from './BaseNode';

const noteStyle = { margin: 0, fontSize: 13, lineHeight: 1.5, color: '#475569' };

export const LLMNode = ({ id }) => (
  <BaseNode
    nodeId={id}
    title="LLM Node"
    inputs={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]}
    outputs={[{ id: 'response', label: 'Response' }]}
  >
    <p style={noteStyle}>Generates a response from instructions and prompt context.</p>
  </BaseNode>
);

