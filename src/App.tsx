import { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { NodeSidebar } from './components/sidebar/NodeSidebar';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodeFormPanel } from './components/forms/NodeFormPanel';
import { SandboxPanel } from './components/sandbox/SandboxPanel';
import { useWorkflowStore } from './store/workflowStore';
import { serializeWorkflow } from './utils/validate';

function TopBtn({
  onClick, icon, label, danger,
}: { onClick: () => void; icon: string; label: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: '#1e1d35', border: '1px solid #2d2b45',
        color: danger ? '#f87171' : '#8b89a8',
        borderRadius: 7, cursor: 'pointer', padding: '5px 11px',
        fontSize: 11, fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: 5,
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#2d2b45'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#1e1d35'; }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span> {label}
    </button>
  );
}

function MainLayout() {
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const { nodes, edges, clearWorkflow } = useWorkflowStore();

  const handleExport = () => {
    const json = serializeWorkflow({ nodes, edges });
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const graph = JSON.parse(ev.target?.result as string);
          useWorkflowStore.setState({ nodes: graph.nodes, edges: graph.edges, selectedNodeId: null });
        } catch {
          alert('Invalid workflow JSON');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0918', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>
      {/* Top Bar */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, background: '#0f0e17', borderBottom: '1px solid #1e1d2e', flexShrink: 0, gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#6366f1,#a78bfa)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚙</div>
          <span style={{ color: '#e2e0f0', fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>HR Workflow Designer</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#6366f1', background: '#6366f115', border: '1px solid #6366f140', borderRadius: 4, padding: '2px 6px', letterSpacing: 1 }}>TREDENCE</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <TopBtn onClick={handleImport} icon="📂" label="Import" />
          <TopBtn onClick={handleExport} icon="💾" label="Export" />
          <TopBtn onClick={clearWorkflow} icon="🗑" label="Clear" danger />
          <button
            onClick={() => setSandboxOpen((o) => !o)}
            style={{ background: sandboxOpen ? '#6366f1' : '#1e1d35', border: '1px solid ' + (sandboxOpen ? '#6366f1' : '#2d2b45'), color: sandboxOpen ? '#fff' : '#a78bfa', borderRadius: 7, cursor: 'pointer', padding: '5px 14px', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            ⚙ {sandboxOpen ? 'Hide' : 'Open'} Sandbox
          </button>
        </div>
        <div style={{ fontSize: 11, color: '#4b4866' }}>
          {nodes.length} node{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
        </div>
      </header>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <NodeSidebar />
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <WorkflowCanvas />
          {sandboxOpen && <SandboxPanel onClose={() => setSandboxOpen(false)} />}
        </div>
        <NodeFormPanel />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <MainLayout />
    </ReactFlowProvider>
  );
}
