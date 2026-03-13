import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => (
  <BaseNode nodeId={id} title="Math Node" variant="math" inputs={[{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }]} outputs={[{ id: 'result', label: 'Result' }]}>
    <p className="node-description">Performs arithmetic operations on incoming values.</p>
  </BaseNode>
);
