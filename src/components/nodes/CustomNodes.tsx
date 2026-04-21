import type { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import type {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData,
} from '../../types/nodes';

export function StartNode({ data, selected }: NodeProps) {
  const d = data as unknown as StartNodeData;
  return (
    <BaseNode
      selected={selected}
      icon="🟢"
      label={d.title || 'Start'}
      subtitle="Workflow entry point"
      color="#f0fdf4"
      borderColor="#86efac"
      showTarget={false}
    />
  );
}

export function TaskNode({ data, selected }: NodeProps) {
  const d = data as unknown as TaskNodeData;
  return (
    <BaseNode
      selected={selected}
      icon="📋"
      label={d.title || 'Task'}
      subtitle={d.assignee ? `Assignee: ${d.assignee}` : d.description || 'Human task'}
      color="#eff6ff"
      borderColor="#93c5fd"
    />
  );
}

export function ApprovalNode({ data, selected }: NodeProps) {
  const d = data as unknown as ApprovalNodeData;
  return (
    <BaseNode
      selected={selected}
      icon="✅"
      label={d.title || 'Approval'}
      subtitle={d.approverRole ? `Approver: ${d.approverRole}` : 'Approval step'}
      color="#fefce8"
      borderColor="#fde047"
    />
  );
}

export function AutomatedNode({ data, selected }: NodeProps) {
  const d = data as unknown as AutomatedNodeData;
  return (
    <BaseNode
      selected={selected}
      icon="⚡"
      label={d.title || 'Automated Step'}
      subtitle={d.actionId ? `Action: ${d.actionId}` : 'System action'}
      color="#fdf4ff"
      borderColor="#d8b4fe"
    />
  );
}

export function EndNode({ data, selected }: NodeProps) {
  const d = data as unknown as EndNodeData;
  return (
    <BaseNode
      selected={selected}
      icon="🔴"
      label={d.endMessage || 'End'}
      subtitle="Workflow complete"
      color="#fff1f2"
      borderColor="#fda4af"
      showSource={false}
    />
  );
}
