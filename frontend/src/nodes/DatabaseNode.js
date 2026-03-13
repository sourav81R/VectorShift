import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id }) => (
  <BaseNode nodeId={id} title="Database Node" icon="🗄" variant="database" inputs={[{ id: 'query', label: 'Query' }, { id: 'connection', label: 'Connection' }]} outputs={[{ id: 'rows', label: 'Rows' }]} style={{ minHeight: 160 }}>
    <p className="node-description">Executes queries and returns structured records.</p>
  </BaseNode>
);
