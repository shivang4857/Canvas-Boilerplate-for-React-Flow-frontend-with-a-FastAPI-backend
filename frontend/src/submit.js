import { useStore } from './store';

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
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const onSubmit = async () => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8000';

    try {
      const res = await fetch(`${baseUrl}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      window.alert(
        `Pipeline summary\n\n` +
          `Nodes: ${data.num_nodes}\n` +
          `Edges: ${data.num_edges}\n` +
          `DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (err) {
      window.alert(`Failed to submit pipeline.\n\n${err?.message ?? String(err)}`);
    }
  };

  return (
    <div style={styles.container}>
      <button
        type="submit"
        style={styles.button}
        onClick={onSubmit}
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
