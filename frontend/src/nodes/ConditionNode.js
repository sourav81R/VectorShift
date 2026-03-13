import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => (
  <BaseNode nodeId={id} title="Condition Node" icon="🔀" variant="condition" inputs={[{ id: 'value', label: 'Value' }, { id: 'rule', label: 'Rule' }]} outputs={[{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }]} style={{ minHeight: 160 }}>
    <p className="node-description">Routes flow based on a boolean condition.</p>
  </BaseNode>
);
