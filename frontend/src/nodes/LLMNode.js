import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    nodeId={id}
    title="LLM Node"
    variant="llm"
    inputs={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]}
    outputs={[{ id: 'response', label: 'Response' }]}
  >
    <p className="node-description">Generates a response from instructions and prompt context.</p>
  </BaseNode>
);
