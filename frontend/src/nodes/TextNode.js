import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const fieldStyle = { display: 'grid', gap: 6, fontSize: 12, color: '#334155' };
const controlStyle = {
  width: '100%',
  minHeight: 96,
  padding: '10px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  resize: 'none',
  overflow: 'hidden',
  boxSizing: 'border-box',
  font: 'inherit',
  lineHeight: 1.5,
  color: '#0f172a',
  background: '#f8fafc',
};
const chipListStyle = { display: 'flex', flexWrap: 'wrap', gap: 6 };
const chipStyle = { padding: '4px 8px', borderRadius: 999, background: '#dbeafe', color: '#1d4ed8', fontSize: 11, fontWeight: 600 };
const helperStyle = { margin: 0, fontSize: 12, color: '#64748b' };
const variablePattern = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
const defaultText = '{{input}}';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text ?? defaultText);

  useEffect(() => {
    setText(data?.text ?? defaultText);
  }, [data?.text]);

  const variables = useMemo(() => {
    const matches = text.matchAll(variablePattern);
    return [...new Set(Array.from(matches, (match) => match[1]))];
  }, [text]);

  const nodeWidth = useMemo(() => {
    const longestLine = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    return Math.min(540, Math.max(280, longestLine * 7 + 160));
  }, [text]);

  useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [text]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, nodeWidth, text, updateNodeInternals, variables]);

  const handleChange = (event) => {
    const nextText = event.target.value;

    setText(nextText);
    updateNodeField(id, 'text', nextText);
  };

  return (
    <BaseNode
      nodeId={id}
      title="Text Node"
      inputs={variables.map((variable) => ({ id: variable, label: variable }))}
      outputs={[{ id: 'output', label: 'Text' }]}
      style={{ width: nodeWidth, minHeight: 220, transition: 'width 180ms ease, min-height 180ms ease' }}
    >
      <label style={fieldStyle}>
        Text
        <textarea
          ref={textareaRef}
          style={controlStyle}
          value={text}
          onChange={handleChange}
          placeholder="Generate a summary of {{article}} using {{model}}"
        />
      </label>
      <p style={helperStyle}>Use {'{{variableName}}'} placeholders to create input handles automatically.</p>
      {variables.length > 0 ? (
        <div style={chipListStyle}>
          {variables.map((variable) => (
            <span key={variable} style={chipStyle}>{variable}</span>
          ))}
        </div>
      ) : null}
    </BaseNode>
  );
};
