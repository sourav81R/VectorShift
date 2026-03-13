import { BaseNode } from './BaseNode';

export const APINode = ({ id }) => (
  <BaseNode nodeId={id} title="API Node" variant="api" inputs={[{ id: 'request', label: 'Request' }, { id: 'auth', label: 'Auth' }]} outputs={[{ id: 'response', label: 'Response' }]}>
    <p className="node-description">Calls external services and forwards the payload.</p>
  </BaseNode>
);
