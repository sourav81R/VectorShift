import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id }) => (
  <BaseNode nodeId={id} title="Logger Node" variant="logger" inputs={[{ id: 'entry', label: 'Entry' }]} outputs={[{ id: 'next', label: 'Next' }]}>
    <p className="node-description">Records pipeline state for debugging and audits.</p>
  </BaseNode>
);
