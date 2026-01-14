const styles = {
  row: {
    display: 'grid',
    gap: '8px',
  },
  label: {
    display: 'grid',
    gap: '4px',
    fontSize: '11px',
    fontWeight: 500,
    color: '#64748b',
  },
  control: {
    width: '100%',
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    color: '#1e293b',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  },
  helper: {
    fontSize: '11px',
    color: '#94a3b8',
    lineHeight: 1.4,
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

export const LabeledTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  textareaRef,
  style,
}) => {
  return (
    <label style={styles.label}>
      <span>{label}</span>
      <textarea
        ref={textareaRef}
        style={{ ...styles.control, resize: 'none', ...(style ?? null) }}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export const HelperText = ({ children }) => <div style={styles.helper}>{children}</div>;
