const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 20px',
    borderTop: '1px solid #e2e8f0',
    background: '#fff',
  },
  button: {
    padding: '10px 32px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
  },
};

export const SubmitButton = () => {
  return (
    <div style={styles.container}>
      <button
        type="submit"
        style={styles.button}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.3)';
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
