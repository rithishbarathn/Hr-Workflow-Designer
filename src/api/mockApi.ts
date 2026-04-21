import { MOCK_AUTOMATIONS } from '../mocks/automations';
import type { AutomationAction, SimulateResult, WorkflowGraph } from '../types/workflow';
import { validateWorkflow, topologicalSort } from '../utils/validate';

export async function getAutomations(): Promise<AutomationAction[]> {
  await delay(200);
  return MOCK_AUTOMATIONS;
}

export async function simulateWorkflow(graph: WorkflowGraph): Promise<SimulateResult> {
  await delay(600);

  const validation = validateWorkflow(graph);
  if (!validation.valid) {
    return { success: false, steps: [], errors: validation.errors };
  }

  const sorted = topologicalSort(graph);
  const steps = sorted.map((node, i) => {
    const data = node.data as any;
    const title = data.title || data.endMessage || 'Node';
    return {
      nodeId: node.id,
      nodeTitle: title,
      nodeType: data.type,
      status: 'success' as const,
      message: getMockMessage(data),
      timestamp: new Date(Date.now() + i * 1200).toISOString(),
    };
  });

  return { success: true, steps, errors: [] };
}

function getMockMessage(data: any): string {
  switch (data.type) {
    case 'start': return `Workflow "${data.title}" initiated.`;
    case 'task': return `Task "${data.title}" assigned to ${data.assignee || 'Unassigned'}.`;
    case 'approval': return `Approval requested from ${data.approverRole || 'Manager'}. Threshold: ${data.autoApproveThreshold}%.`;
    case 'automated': return `Action "${data.actionId || 'none'}" executed with provided parameters.`;
    case 'end': return data.endMessage || 'Workflow completed.';
    default: return 'Step executed.';
  }
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
