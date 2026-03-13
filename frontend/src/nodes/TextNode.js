import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const fieldStyle = { display: 'grid', gap: 6, fontSize: 12, color: '#334155' };
const controlStyle = { width: '100%', minHeight: 72, padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 8, resize: 'vertical', boxSizing: 'border-box' };

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode nodeId={id} title="Text Node" outputs={[{ id: 'output', label: 'Text' }]} style={{ minHeight: 180 }}>
      <label style={fieldStyle}>
        Text
        <textarea style={controlStyle} value={data?.text ?? '{{input}}'} onChange={(event) => updateNodeField(id, 'text', event.target.value)} />
      </label>
    </BaseNode>
  );
};

