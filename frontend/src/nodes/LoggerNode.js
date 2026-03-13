import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id }) => (
  <BaseNode nodeId={id} title="Logger Node" inputs={[{ id: 'entry', label: 'Entry' }]} outputs={[{ id: 'next', label: 'Next' }]}>
    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>Records pipeline state for debugging and audits.</p>
  </BaseNode>
);

