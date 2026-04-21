import { useWorkflowStore } from '../../store/workflowStore';
import { StartForm, TaskForm, ApprovalForm, AutomatedForm, EndForm } from './NodeForms';

const NODE_ICONS: Record<string, string> = {
  start: '🟢', task: '📋', approval: '✅', automated: '⚡', end: '🔴',
};
const NODE_LABELS: Record<string, string> = {
  start: 'Start Node', task: 'Task Node', approval: 'Approval Node', automated: 'Automated Step', end: 'End Node',
};

export function NodeFormPanel() {
  const { nodes, selectedNodeId, setSelectedNode, deleteNode } = useWorkflowStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside style={{ width: 260, background: '#0c0b18', borderLeft: '1px solid #1e1d2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>👆</div>
        <div style={{ color: '#4b4866', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
          Select a node on the canvas to configure it
        </div>
      </aside>
    );
  }

  const data = selectedNode.data;
  const nodeType = data.type as string;

  return (
    <aside style={{ width: 260, background: '#0c0b18', borderLeft: '1px solid #1e1d2e', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #1e1d2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{NODE_ICONS[nodeType]}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e2e0f0' }}>{NODE_LABELS[nodeType]}</div>
            <div style={{ fontSize: 10, color: '#4b4866' }}>ID: {selectedNode.id.slice(0, 8)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => deleteNode(selectedNode.id)} title="Delete node" style={{ background: '#1e1d2e', border: '1px solid #2d2b45', color: '#f87171', borderRadius: 6, cursor: 'pointer', padding: '4px 8px', fontSize: 13 }}>🗑</button>
          <button onClick={() => setSelectedNode(null)} style={{ background: '#1e1d2e', border: '1px solid #2d2b45', color: '#8b89a8', borderRadius: 6, cursor: 'pointer', padding: '4px 8px', fontSize: 13 }}>×</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {nodeType === 'start' && <StartForm id={selectedNode.id} data={data as any} />}
        {nodeType === 'task' && <TaskForm id={selectedNode.id} data={data as any} />}
        {nodeType === 'approval' && <ApprovalForm id={selectedNode.id} data={data as any} />}
        {nodeType === 'automated' && <AutomatedForm id={selectedNode.id} data={data as any} />}
        {nodeType === 'end' && <EndForm id={selectedNode.id} data={data as any} />}
      </div>
    </aside>
  );
}
