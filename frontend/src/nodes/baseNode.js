import { Handle, Position } from 'reactflow';

const styles = {
  container: {
    borderRadius: 10,
    border: '1px solid #0b1220',
    background: '#0f172a',
    color: '#e5e7eb',
    boxShadow: '0 6px 20px rgba(2, 6, 23, 0.35)',
    overflow: 'hidden',
  },
  header: {
    padding: '8px 10px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.2,
  },
  body: {
    padding: 10,
    fontSize: 12,
    display: 'grid',
    gap: 8,
  },
  handle: {
    width: 10,
    height: 10,
    border: '2px solid #0b1220',
    background: '#60a5fa',
  },
  handleTarget: {
    background: '#22c55e',
  },
};

export const BaseNode = ({
  title,
  width = 220,
  minHeight = 80,
  handles = [],
  children,
}) => {
  return (
    <div style={{ ...styles.container, width, minHeight }}>
      <div style={styles.header}>
        <span>{title}</span>
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

