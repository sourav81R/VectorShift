import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => (
  <BaseNode nodeId={id} title="Condition Node" inputs={[{ id: 'value', label: 'Value' }, { id: 'rule', label: 'Rule' }]} outputs={[{ id: 'true', label: 'True' }, { id: 'false', label: 'False' }]} style={{ minHeight: 160 }}>
    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>Routes flow based on a boolean condition.</p>
  </BaseNode>
);

