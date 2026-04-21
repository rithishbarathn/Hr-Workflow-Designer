import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { useSimulate } from '../../hooks/useSimulate';
import { validateWorkflow, serializeWorkflow } from '../../utils/validate';
import type { SimulateStepResult } from '../../types/workflow';

const STATUS_COLOR: Record<string, string> = {
  success: '#34d399',
  error: '#f87171',
  skipped: '#fbbf24',
};

const STATUS_ICON: Record<string, string> = {
  success: '✓',
  error: '✗',
  skipped: '⚡',
};

const TYPE_ICON: Record<string, string> = {
  start: '🟢',
  task: '📋',
  approval: '✅',
  automated: '⚡',
  end: '🔴',
};

function StepRow({ step, index }: { step: SimulateStepResult; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderLeft: `2px solid ${STATUS_COLOR[step.status]}`,
        paddingLeft: 12,
        marginBottom: 10,
        cursor: 'pointer',
      }}
      onClick={() => setOpen((o) => !o)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: '#4b4866', minWidth: 18 }}>{index + 1}.</span>
        <span style={{ fontSize: 13 }}>{TYPE_ICON[step.nodeType]}</span>
        <span style={{ fontSize: 12, color: '#e2e0f0', fontWeight: 600, flex: 1 }}>{step.nodeTitle}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: STATUS_COLOR[step.status],
            background: STATUS_COLOR[step.status] + '20',
            padding: '2px 7px',
            borderRadius: 10,
          }}
        >
          {STATUS_ICON[step.status]} {step.status}
        </span>
      </div>
      {open && (
        <div style={{ marginTop: 6, fontSize: 11, color: '#8b89a8', lineHeight: 1.6 }}>
          {step.message}
        </div>
      )}
    </div>
  );
}

export function SandboxPanel({ onClose }: { onClose: () => void }) {
  const { nodes, edges } = useWorkflowStore((s) => ({ nodes: s.nodes, edges: s.edges }));
  const { result, loading, run, reset } = useSimulate();
  const [tab, setTab] = useState<'log' | 'json'>('log');

  const graph = { nodes, edges };
  const validation = validateWorkflow(graph);

  const handleRun = () => {
    reset();
    run(graph);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 200,
        right: 260,
        height: 300,
        background: '#0c0b18',
        borderTop: '1px solid #1e1d2e',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'DM Sans', sans-serif",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          borderBottom: '1px solid #1e1d2e',
        }}
      >
        <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>⚙ Sandbox</span>

        {/* Tabs */}
        {['log', 'json'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            style={{
              background: tab === t ? '#1e1d35' : 'transparent',
              border: tab === t ? '1px solid #2d2b45' : '1px solid transparent',
              color: tab === t ? '#e2e0f0' : '#4b4866',
              borderRadius: 6,
              cursor: 'pointer',
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {t === 'log' ? 'Execution Log' : 'JSON'}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Validation status */}
        {!validation.valid && (
          <div style={{ fontSize: 10, color: '#f87171', display: 'flex', alignItems: 'center', gap: 4 }}>
            ⚠ {validation.errors.length} issue{validation.errors.length > 1 ? 's' : ''}
          </div>
        )}

        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            background: loading ? '#2d2b45' : '#6366f1',
            border: 'none',
            color: '#fff',
            borderRadius: 7,
            cursor: loading ? 'not-allowed' : 'pointer',
            padding: '5px 14px',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {loading ? '⏳ Running...' : '▶ Run Workflow'}
        </button>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#4b4866',
            cursor: 'pointer',
            fontSize: 16,
            padding: '2px 6px',
          }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {tab === 'log' ? (
          <>
            {/* Validation errors */}
            {!validation.valid && (
              <div style={{ marginBottom: 12 }}>
                {validation.errors.map((err, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 11,
                      color: '#f87171',
                      background: '#f8717110',
                      border: '1px solid #f8717130',
                      borderRadius: 6,
                      padding: '5px 10px',
                      marginBottom: 4,
                    }}
                  >
                    ⚠ {err}
                  </div>
                ))}
              </div>
            )}

            {!result && !loading && (
              <div style={{ color: '#4b4866', fontSize: 12, textAlign: 'center', paddingTop: 40 }}>
                Click "Run Workflow" to simulate execution
              </div>
            )}

            {loading && (
              <div style={{ color: '#a78bfa', fontSize: 12, textAlign: 'center', paddingTop: 40 }}>
                ⏳ Simulating workflow...
              </div>
            )}

            {result && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: result.success ? '#34d399' : '#f87171',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {result.success ? '✓ Workflow executed successfully' : '✗ Workflow failed'}
                  <span style={{ color: '#4b4866', fontWeight: 400 }}>
                    — {result.steps.length} steps
                  </span>
                </div>

                {result.errors.map((err, i) => (
                  <div key={i} style={{ fontSize: 11, color: '#f87171', marginBottom: 8 }}>
                    ⚠ {err}
                  </div>
                ))}

                {result.steps.map((step, i) => (
                  <StepRow key={step.nodeId} step={step} index={i} />
                ))}
              </>
            )}
          </>
        ) : (
          <pre
            style={{
              fontSize: 10,
              color: '#8b89a8',
              lineHeight: 1.6,
              margin: 0,
              overflowX: 'auto',
            }}
          >
            {serializeWorkflow(graph)}
          </pre>
        )}
      </div>
    </div>
  );
}
