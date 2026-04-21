import type { Node, Edge } from '@xyflow/react';

export type WorkflowNode = Node<Record<string, unknown>>;
export type WorkflowEdge = Edge;

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulateStepResult {
  nodeId: string;
  nodeTitle: string;
  nodeType: string;
  status: 'success' | 'skipped' | 'error';
  message: string;
  timestamp: string;
}

export interface SimulateResult {
  success: boolean;
  steps: SimulateStepResult[];
  errors: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
