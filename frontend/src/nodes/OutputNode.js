import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const fieldStyle = { display: 'grid', gap: 6, fontSize: 12, color: '#334155' };
const controlStyle = { width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box' };

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode nodeId={id} title="Output Node" inputs={[{ id: 'value', label: 'Value' }]}>
      <label style={fieldStyle}>
        Name
        <input style={controlStyle} value={data?.outputName ?? id.replace('customOutput-', 'output_')} onChange={(event) => updateNodeField(id, 'outputName', event.target.value)} />
      </label>
      <label style={fieldStyle}>
        Format
        <select style={controlStyle} value={data?.outputType ?? 'Text'} onChange={(event) => updateNodeField(id, 'outputType', event.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};

