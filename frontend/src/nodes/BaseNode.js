import { Fragment } from 'react';
import { Handle, Position } from 'reactflow';

const containerStyle = {
  position: 'relative',
  width: 240,
  minHeight: 140,
  padding: '16px 18px 14px',
  border: '1px solid #cbd5e1',
  borderRadius: 14,
  background: '#ffffff',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 12,
};

const titleStyle = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: '#0f172a',
};

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};

const metaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 8,
  fontSize: 11,
  color: '#64748b',
};

const handleStyle = {
  width: 12,
  height: 12,
  background: '#2563eb',
  border: '2px solid #ffffff',
};

const getHandleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

const renderHandles = (ports, type, position) =>
  ports.map((port, index) => {
    const isInput = type === 'target';
    const top = getHandleTop(index, ports.length);
    const labelStyle = {
      position: 'absolute',
      top,
      [isInput ? 'left' : 'right']: 18,
      transform: 'translateY(-50%)',
      fontSize: 11,
      color: '#475569',
      pointerEvents: 'none',
    };

    return (
      <Fragment key={`${type}-${port.id}`}>
        <Handle
          type={type}
          position={position}
          id={port.id}
          style={{ ...handleStyle, top }}
        />
        <span style={labelStyle}>{port.label || port.id}</span>
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
}) => (
  <div style={{ ...containerStyle, ...style }}>
    {renderHandles(inputs, 'target', Position.Left)}
    {renderHandles(outputs, 'source', Position.Right)}
    <div style={headerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <span style={{ fontSize: 11, color: '#94a3b8' }}>{nodeId}</span>
    </div>
    <div style={bodyStyle}>{children}</div>
    <div style={metaStyle}>
      <span>{inputs.length} input{inputs.length === 1 ? '' : 's'}</span>
      <span>{outputs.length} output{outputs.length === 1 ? '' : 's'}</span>
    </div>
  </div>
);

