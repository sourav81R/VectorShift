import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode nodeId={id} title="Input Node" variant="input" outputs={[{ id: 'value', label: 'Value' }]}>
      <label className="node-field">
        Name
        <input className="node-control" value={data?.inputName ?? id.replace('customInput-', 'input_')} onChange={(event) => updateNodeField(id, 'inputName', event.target.value)} />
      </label>
      <label className="node-field">
        Type
        <select className="node-control" value={data?.inputType ?? 'Text'} onChange={(event) => updateNodeField(id, 'inputType', event.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
