import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => (
  <BaseNode nodeId={id} title="API Node" inputs={[{ id: 'request', label: 'Request' }, { id: 'auth', label: 'Auth' }]} outputs={[{ id: 'response', label: 'Response' }]}>
    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>Calls external services and forwards the payload.</p>
  </BaseNode>
);

