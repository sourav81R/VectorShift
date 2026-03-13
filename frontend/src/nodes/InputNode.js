import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const fieldStyle = { display: 'grid', gap: 6, fontSize: 12, color: '#334155' };
const controlStyle = { width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 8, boxSizing: 'border-box' };

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode nodeId={id} title="Input Node" outputs={[{ id: 'value', label: 'Value' }]}>
      <label style={fieldStyle}>
        Name
        <input style={controlStyle} value={data?.inputName ?? id.replace('customInput-', 'input_')} onChange={(event) => updateNodeField(id, 'inputName', event.target.value)} />
      </label>
      <label style={fieldStyle}>
        Type
        <select style={controlStyle} value={data?.inputType ?? 'Text'} onChange={(event) => updateNodeField(id, 'inputType', event.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

