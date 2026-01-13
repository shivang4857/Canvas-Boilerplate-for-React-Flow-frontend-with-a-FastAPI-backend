const styles = {
  card: {
    cursor: 'grab',
    width: '80px',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '6px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    background: '#fff',
    transition: 'all 0.15s ease',
    userSelect: 'none',
  },
  icon: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    borderRadius: '8px',
    background: '#f1f5f9',
    color: '#475569',
  },
  label: {
    fontSize: '11px',
    fontWeight: 500,
    color: '#475569',
  },
};

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={styles.card}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#6366f1';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={styles.icon}>{icon}</div>
      <span style={styles.label}>{label}</span>
    </div>
  );
};
