// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '96px', 
          height: '64px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          backgroundColor: '#1C2536',
          border: '1px solid #334155',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
          justifyContent: 'center', 
          flexDirection: 'column'
        }} 
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  
