import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id }) => (
  <BaseNode nodeId={id} title="Database Node" inputs={[{ id: 'query', label: 'Query' }, { id: 'connection', label: 'Connection' }]} outputs={[{ id: 'rows', label: 'Rows' }]} style={{ minHeight: 160 }}>
    <p style={{ margin: 0, fontSize: 13, color: '#475569' }}>Executes queries and returns structured records.</p>
  </BaseNode>
);

