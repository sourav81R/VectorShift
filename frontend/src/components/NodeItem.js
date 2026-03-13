export const NodeItem = ({ type, label, shortLabel, accent, description }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="node-item"
      onDragStart={onDragStart}
      draggable
    >
      <div className="node-item-header">
        <span className="node-item-badge" style={{ background: accent }}>
          {shortLabel}
        </span>
        <span className="node-item-label">{label}</span>
      </div>
      <span className="node-item-description">{description}</span>
    </div>
  );
};
