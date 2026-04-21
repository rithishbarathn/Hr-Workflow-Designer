import { Field, Input, Textarea, Select, KVEditor, Toggle } from './FormFields';
import { useWorkflowStore } from '../../store/workflowStore';
import { useAutomations } from '../../hooks/useAutomations';
import type {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData,
} from '../../types/nodes';

const APPROVER_ROLES = [
  { value: 'Manager', label: 'Manager' },
  { value: 'HRBP', label: 'HRBP' },
  { value: 'Director', label: 'Director' },
  { value: 'CEO', label: 'CEO' },
];

export function StartForm({ id, data }: { id: string; data: StartNodeData }) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const u = (patch: Partial<StartNodeData>) => updateNodeData(id, patch as any);

  return (
    <>
      <Field label="Start Title" required>
        <Input value={data.title} onChange={(v) => u({ title: v })} placeholder="e.g. Onboarding Start" />
      </Field>
      <Field label="Metadata">
        <KVEditor pairs={data.metadata} onChange={(metadata) => u({ metadata })} />
      </Field>
    </>
  );
}

export function TaskForm({ id, data }: { id: string; data: TaskNodeData }) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const u = (patch: Partial<TaskNodeData>) => updateNodeData(id, patch as any);

  return (
    <>
      <Field label="Title" required>
        <Input value={data.title} onChange={(v) => u({ title: v })} placeholder="e.g. Collect documents" />
      </Field>
      <Field label="Description">
        <Textarea value={data.description} onChange={(v) => u({ description: v })} placeholder="What needs to be done..." />
      </Field>
      <Field label="Assignee">
        <Input value={data.assignee} onChange={(v) => u({ assignee: v })} placeholder="e.g. hr@company.com" />
      </Field>
      <Field label="Due Date">
        <Input value={data.dueDate} onChange={(v) => u({ dueDate: v })} type="date" />
      </Field>
      <Field label="Custom Fields">
        <KVEditor pairs={data.customFields} onChange={(customFields) => u({ customFields })} />
      </Field>
    </>
  );
}

export function ApprovalForm({ id, data }: { id: string; data: ApprovalNodeData }) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const u = (patch: Partial<ApprovalNodeData>) => updateNodeData(id, patch as any);

  return (
    <>
      <Field label="Title" required>
        <Input value={data.title} onChange={(v) => u({ title: v })} placeholder="e.g. Manager Approval" />
      </Field>
      <Field label="Approver Role">
        <Select
          value={data.approverRole}
          onChange={(v) => u({ approverRole: v })}
          options={APPROVER_ROLES}
          placeholder="Select role..."
        />
      </Field>
      <Field label="Auto-approve Threshold (%)">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type="range"
            min={0}
            max={100}
            value={data.autoApproveThreshold}
            onChange={(e) => u({ autoApproveThreshold: Number(e.target.value) })}
            style={{ flex: 1, accentColor: '#6366f1' }}
          />
          <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 600, minWidth: 36 }}>
            {data.autoApproveThreshold}%
          </span>
        </div>
      </Field>
    </>
  );
}

export function AutomatedForm({ id, data }: { id: string; data: AutomatedNodeData }) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const u = (patch: Partial<AutomatedNodeData>) => updateNodeData(id, patch as any);
  const { automations, loading } = useAutomations();

  const selected = automations.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    u({ actionId, actionParams: {} });
  };

  return (
    <>
      <Field label="Title" required>
        <Input value={data.title} onChange={(v) => u({ title: v })} placeholder="e.g. Send welcome email" />
      </Field>
      <Field label="Action">
        {loading ? (
          <div style={{ color: '#6b7280', fontSize: 12 }}>Loading actions...</div>
        ) : (
          <Select
            value={data.actionId}
            onChange={handleActionChange}
            options={automations.map((a) => ({ value: a.id, label: a.label }))}
            placeholder="Select an action..."
          />
        )}
      </Field>
      {selected && selected.params.length > 0 && (
        <Field label="Parameters">
          {selected.params.map((param) => (
            <div key={param} style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 10, color: '#8b89a8', display: 'block', marginBottom: 3 }}>
                {param.toUpperCase()}
              </label>
              <input
                value={data.actionParams?.[param] || ''}
                onChange={(e) => u({ actionParams: { ...data.actionParams, [param]: e.target.value } })}
                placeholder={`Enter ${param}...`}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 7,
                  border: '1.5px solid #2d2b45',
                  background: '#16152a',
                  color: '#e2e0f0',
                  fontSize: 12,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </Field>
      )}
    </>
  );
}

export function EndForm({ id, data }: { id: string; data: EndNodeData }) {
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);
  const u = (patch: Partial<EndNodeData>) => updateNodeData(id, patch as any);

  return (
    <>
      <Field label="End Message">
        <Textarea value={data.endMessage} onChange={(v) => u({ endMessage: v })} placeholder="e.g. Onboarding complete!" rows={2} />
      </Field>
      <Field label="Show Summary">
        <Toggle
          checked={data.showSummary}
          onChange={(v) => u({ showSummary: v })}
          label="Display workflow summary on completion"
        />
      </Field>
    </>
  );
}
