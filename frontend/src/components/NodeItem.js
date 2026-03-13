const cardStyle = {
  cursor: 'grab',
  padding: '12px 14px',
  borderRadius: 16,
  border: '1px solid #dbe3f0',
  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
  display: 'grid',
  gap: 4,
  transition: 'transform 160ms ease, box-shadow 160ms ease',
};

export const NodeItem = ({ type, label, icon, description }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={onDragStart}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = 'translateY(-2px)';
        event.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.12)';
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = 'translateY(0)';
        event.currentTarget.style.boxShadow = cardStyle.boxShadow;
      }}
      style={cardStyle}
      draggable
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontWeight: 700, color: '#0f172a' }}>{label}</span>
      </div>
      <span style={{ fontSize: 12, color: '#64748b', lineHeight: 1.45 }}>{description}</span>
    </div>
  );
};

