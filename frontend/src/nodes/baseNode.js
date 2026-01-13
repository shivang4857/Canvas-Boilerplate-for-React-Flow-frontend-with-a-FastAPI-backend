import { Handle, Position } from 'reactflow';

const styles = {
  container: {
    borderRadius: 12,
    border: '2px solid #6366f1',
    background: '#ffffff',
    color: '#1e293b',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    overflow: 'visible',
  },
  header: {
    padding: '10px 12px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    borderRadius: '6px',
    background: '#eef2ff',
    color: '#6366f1',
    flexShrink: 0,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e293b',
    margin: 0,
  },
  subtitle: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px',
  },
  body: {
    padding: '12px',
    fontSize: '12px',
    display: 'grid',
    gap: '10px',
  },
  handle: {
    width: '12px',
    height: '12px',
    border: '2px solid #fff',
    boxShadow: '0 0 0 1px #6366f1',
    background: '#6366f1',
  },
  handleTarget: {
    background: '#6366f1',
  },
};

export const BaseNode = ({
  title,
  icon,
  subtitle,
  width = 240,
  minHeight = 80,
  handles = [],
  children,
}) => {
  return (
    <div style={{ ...styles.container, width, minHeight }}>
      <div style={styles.header}>
        {icon && <div style={styles.icon}>{icon}</div>}
        <div style={styles.titleBlock}>
          <div style={styles.title}>{title}</div>
          {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
        </div>
      </div>

      <div style={styles.body}>{children}</div>

      {handles.map((h) => {
        const position = h.position ?? (h.side === 'left' ? Position.Left : Position.Right);
        const baseStyle = {
          ...styles.handle,
          ...(h.type === 'target' ? styles.handleTarget : null),
          ...(h.style ?? null),
        };

        return (
          <Handle
            key={h.id}
            id={h.id}
            type={h.type}
            position={position}
            style={baseStyle}
          />
        );
      })}
    </div>
  );
};
