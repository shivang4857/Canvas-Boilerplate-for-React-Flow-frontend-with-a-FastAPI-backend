const styles = {
  row: {
    display: 'grid',
    gap: 6,
  },
  label: {
    display: 'grid',
    gap: 4,
    fontSize: 11,
    color: 'rgba(226, 232, 240, 0.9)',
  },
  control: {
    width: '100%',
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid rgba(148, 163, 184, 0.25)',
    background: '#0b1220',
    color: '#e5e7eb',
    outline: 'none',
  },
  helper: {
    fontSize: 11,
    color: 'rgba(148, 163, 184, 0.9)',
    lineHeight: 1.3,
  },
};

export const FieldRow = ({ children }) => <div style={styles.row}>{children}</div>;

export const LabeledInput = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <input
        style={styles.control}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export const LabeledSelect = ({ label, value, onChange, options }) => {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <select style={styles.control} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export const LabeledTextarea = ({ label, value, onChange, placeholder, rows = 3 }) => {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <textarea
        style={{ ...styles.control, resize: 'none' }}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export const HelperText = ({ children }) => <div style={styles.helper}>{children}</div>;

