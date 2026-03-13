import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode nodeId={id} title="Output Node" icon="📤" variant="output" inputs={[{ id: 'value', label: 'Value' }]}>
      <label className="node-field">
        Name
        <input className="node-control" value={data?.outputName ?? id.replace('customOutput-', 'output_')} onChange={(event) => updateNodeField(id, 'outputName', event.target.value)} />
      </label>
      <label className="node-field">
        Format
        <select className="node-control" value={data?.outputType ?? 'Text'} onChange={(event) => updateNodeField(id, 'outputType', event.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
