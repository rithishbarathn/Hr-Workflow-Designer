import type { WorkflowGraph, ValidationResult, WorkflowNode } from '../types/workflow';

export function validateWorkflow(graph: WorkflowGraph): ValidationResult {
  const errors: string[] = [];
  const { nodes, edges } = graph;

  if (nodes.length === 0) {
    errors.push('Workflow has no nodes.');
    return { valid: false, errors };
  }

  const startNodes = nodes.filter((n) => n.data.type === 'start');
  const endNodes = nodes.filter((n) => n.data.type === 'end');

  if (startNodes.length === 0) errors.push('Workflow must have a Start node.');
  if (startNodes.length > 1) errors.push('Workflow can only have one Start node.');
  if (endNodes.length === 0) errors.push('Workflow must have an End node.');

  const connectedIds = new Set([
    ...edges.map((e) => e.source),
    ...edges.map((e) => e.target),
  ]);

  const orphans = nodes.filter(
    (n) => !connectedIds.has(n.id) && nodes.length > 1
  );
  if (orphans.length > 0) {
    const names = orphans.map((n) => (n.data.title as string) || n.id).join(', ');
    errors.push(`Disconnected nodes: ${names}`);
  }

  if (hasCycle(graph)) {
    errors.push('Workflow contains a cycle.');
  }

  return { valid: errors.length === 0, errors };
}

function hasCycle(graph: WorkflowGraph): boolean {
  const adj = new Map<string, string[]>();
  graph.nodes.forEach((n) => adj.set(n.id, []));
  graph.edges.forEach((e) => adj.get(e.source)?.push(e.target));

  const visited = new Set<string>();
  const inStack = new Set<string>();

  function dfs(id: string): boolean {
    visited.add(id);
    inStack.add(id);
    for (const neighbor of adj.get(id) || []) {
      if (!visited.has(neighbor) && dfs(neighbor)) return true;
      if (inStack.has(neighbor)) return true;
    }
    inStack.delete(id);
    return false;
  }

  for (const node of graph.nodes) {
    if (!visited.has(node.id) && dfs(node.id)) return true;
  }
  return false;
}

export function topologicalSort(graph: WorkflowGraph): WorkflowNode[] {
  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  graph.nodes.forEach((n) => {
    adj.set(n.id, []);
    inDegree.set(n.id, 0);
  });

  graph.edges.forEach((e) => {
    adj.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
  });

  const queue = graph.nodes.filter((n) => inDegree.get(n.id) === 0);
  const result: WorkflowNode[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighborId of adj.get(node.id) || []) {
      const deg = (inDegree.get(neighborId) || 1) - 1;
      inDegree.set(neighborId, deg);
      if (deg === 0) {
        const neighbor = graph.nodes.find((n) => n.id === neighborId);
        if (neighbor) queue.push(neighbor);
      }
    }
  }

  return result;
}

export function serializeWorkflow(graph: WorkflowGraph): string {
  return JSON.stringify(graph, null, 2);
}
