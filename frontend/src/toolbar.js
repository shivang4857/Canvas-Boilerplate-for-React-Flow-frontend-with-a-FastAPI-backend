import { DraggableNode } from './draggableNode';

const styles = {
  toolbar: {
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '12px 20px',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '12px',
  },
  tab: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#64748b',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  tabActive: {
    color: '#6366f1',
    background: '#eef2ff',
  },
  nodes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
};

export const PipelineToolbar = () => {
  return (
    <div style={styles.toolbar}>
      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...styles.tabActive }}>Nodes</button>
        <button style={styles.tab}>Logic</button>
        <button style={styles.tab}>Data</button>
        <button style={styles.tab}>AI</button>
      </div>
      <div style={styles.nodes}>
        <DraggableNode type='customInput' label='Input' icon='↓' />
        <DraggableNode type='customOutput' label='Output' icon='↑' />
        <DraggableNode type='llm' label='LLM' icon='🤖' />
        <DraggableNode type='text' label='Text' icon='📝' />
        <DraggableNode type='number' label='Number' icon='#' />
        <DraggableNode type='concat' label='Concat' icon='⊕' />
        <DraggableNode type='delay' label='Delay' icon='⏱' />
        <DraggableNode type='switch' label='Switch' icon='⑂' />
        <DraggableNode type='jsonParse' label='JSON' icon='{ }' />
      </div>
    </div>
  );
};
