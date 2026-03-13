import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { extractVariables } from '../utils/extractVariables';

const defaultText = '{{input}}';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const textareaRef = useRef(null);
  const [text, setText] = useState(data?.text ?? defaultText);

  useEffect(() => {
    setText(data?.text ?? defaultText);
  }, [data?.text]);

  const variables = useMemo(() => extractVariables(text), [text]);

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
      icon="📝"
      variant="text"
      inputs={variables.map((variable) => ({ id: variable, label: variable }))}
      outputs={[{ id: 'output', label: 'Text' }]}
      style={{ width: `min(${nodeWidth}px, calc(100vw - 84px))`, minHeight: 220, transition: 'width 180ms ease, min-height 180ms ease' }}
    >
      <label className="node-field">
        Text
        <textarea
          ref={textareaRef}
          className="node-control node-textarea"
          value={text}
          onChange={handleChange}
          placeholder="Generate a summary of {{article}} using {{model}}"
        />
      </label>
      <p className="node-helper">Use {'{{variableName}}'} placeholders to create input handles automatically.</p>
      {variables.length > 0 ? (
        <div className="node-chip-list">
          {variables.map((variable) => (
            <span key={variable} className="node-chip">{variable}</span>
          ))}
        </div>
      ) : null}
    </BaseNode>
  );
};
