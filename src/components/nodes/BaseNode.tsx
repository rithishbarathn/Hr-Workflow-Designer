import { Handle, Position } from '@xyflow/react';
import type { ReactNode } from 'react';

interface BaseNodeProps {
  selected: boolean;
  icon: string;
  label: string;
  subtitle?: string;
  color: string;
  borderColor: string;
  showSource?: boolean;
  showTarget?: boolean;
  children?: ReactNode;
}

export function BaseNode({
  selected,
  icon,
  label,
  subtitle,
  color,
  borderColor,
  showSource = true,
  showTarget = true,
  children,
}: BaseNodeProps) {
  return (
    <div
      style={{
        background: color,
        border: `2px solid ${selected ? '#6366f1' : borderColor}`,
        borderRadius: 12,
        minWidth: 180,
        maxWidth: 220,
        boxShadow: selected
          ? '0 0 0 3px rgba(99,102,241,0.25), 0 4px 20px rgba(0,0,0,0.15)'
          : '0 2px 8px rgba(0,0,0,0.12)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
      }}
    >
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: '#6366f1', width: 10, height: 10, border: '2px solid #fff' }}
        />
      )}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1e1b4b', letterSpacing: 0.2 }}>
              {label}
            </div>
            {subtitle && (
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ background: '#6366f1', width: 10, height: 10, border: '2px solid #fff' }}
        />
      )}
    </div>
  );
}
