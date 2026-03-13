import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => (
  <BaseNode nodeId={id} title="Math Node" inputs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} outputs={[{ id: 'result', label: 'Result' }]}>
    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>Performs arithmetic operations on incoming values.</p>
  </BaseNode>
);

