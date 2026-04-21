import type { DragEvent } from 'react';

const NODE_TYPES = [
  { type: 'start', label: 'Start', icon: '🟢', desc: 'Entry point', color: '#f0fdf4', border: '#86efac' },
  { type: 'task', label: 'Task', icon: '📋', desc: 'Human task', color: '#eff6ff', border: '#93c5fd' },
  { type: 'approval', label: 'Approval', icon: '✅', desc: 'Approval step', color: '#fefce8', border: '#fde047' },
  { type: 'automated', label: 'Automated', icon: '⚡', desc: 'System action', color: '#fdf4ff', border: '#d8b4fe' },
  { type: 'end', label: 'End', icon: '🔴', desc: 'Completion', color: '#fff1f2', border: '#fda4af' },
];

export function NodeSidebar() {
  const onDragStart = (e: DragEvent, nodeType: string) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside
      style={{
        width: 200,
        background: '#0f0e17',
        borderRight: '1px solid #1e1d2e',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ color: '#a78bfa', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12, paddingLeft: 4 }}>
        NODE PALETTE
      </div>
      {NODE_TYPES.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          style={{
            background: n.color,
            border: `1.5px solid ${n.border}`,
            borderRadius: 10,
            padding: '9px 12px',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            transition: 'transform 0.1s, box-shadow 0.1s',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: 16 }}>{n.icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b' }}>{n.label}</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>{n.desc}</div>
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 'auto',
          color: '#4b4866',
          fontSize: 10,
          lineHeight: 1.6,
          padding: '12px 4px 0',
          borderTop: '1px solid #1e1d2e',
        }}
      >
        Drag nodes onto the canvas to build your workflow.
      </div>
    </aside>
  );
}
