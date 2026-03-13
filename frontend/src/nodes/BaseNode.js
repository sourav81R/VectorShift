import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/node.css';

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const renderHandles = (ports, type, position) =>
  ports.map((port, index) => {
    const isInput = type === 'target';
    const top = getHandleTop(index, ports.length);
    const labelStyle = {
      top,
      [isInput ? 'left' : 'right']: 18,
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
}) => (
  <div className={`node-container node-${variant}`} style={style}>
    {renderHandles(inputs, 'target', Position.Left)}
    {renderHandles(outputs, 'source', Position.Right)}
    <div className="node-header">
      <h3 className="node-title">{title}</h3>
      <span className="node-meta-id">{nodeId}</span>
    </div>
    <div className="node-body">{children}</div>
    <div className="node-meta">
      <span>{inputs.length} input{inputs.length === 1 ? '' : 's'}</span>
      <span>{outputs.length} output{outputs.length === 1 ? '' : 's'}</span>
    </div>
  </div>
);
