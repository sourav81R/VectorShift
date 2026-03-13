import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';
import { useStore } from '../store';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const renderHandles = (ports, type, position) =>
  ports.map((port, index) => {
    const isInput = type === 'target';
    const top = getHandleTop(index, ports.length);
    const labelStyle = {
      top,
      [isInput ? 'left' : 'right']: -86,
    };

    return (
      <Fragment key={`${type}-${port.id}`}>
        <Handle
          type={type}
          position={position}
          id={port.id}
          className="node-handle"
          style={{ top }}
        />
        <span className="node-handle-label" style={labelStyle}>{port.label || port.id}</span>
      </Fragment>
    );
  });

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
  nodeId,
  style,
  variant = 'default',
  icon,
}) => {
  const removeNode = useStore((state) => state.removeNode);

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    removeNode(nodeId);
  };

  return (
    <div className={`node-container node-${variant}`} style={style}>
      {renderHandles(inputs, 'target', Position.Left)}
      {renderHandles(outputs, 'source', Position.Right)}
      <div className="node-header">
        <div className="node-title-row">
          {icon ? <span className="node-icon" aria-hidden="true">{icon}</span> : null}
          <h3 className="node-title">{title}</h3>
        </div>
        <div className="node-actions">
          <span className="node-meta-id">{nodeId}</span>
          <button
            type="button"
            className="node-delete"
            onClick={handleDelete}
            aria-label={`Delete ${title}`}
          >
            <svg className="node-delete-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 3h6l1 2h4M5 5h14M8 9v8M12 9v8M16 9v8M6 5l1 15a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="node-body">{children}</div>
      <div className="node-meta">
        <span>{inputs.length} input{inputs.length === 1 ? '' : 's'}</span>
        <span>{outputs.length} output{outputs.length === 1 ? '' : 's'}</span>
      </div>
    </div>
  );
};
