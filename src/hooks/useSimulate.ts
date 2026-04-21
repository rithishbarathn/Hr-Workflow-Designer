import { useState } from 'react';
import { simulateWorkflow } from '../api/mockApi';
import type { SimulateResult } from '../types/workflow';
import type { WorkflowGraph } from '../types/workflow';

export function useSimulate() {
  const [result, setResult] = useState<SimulateResult | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async (graph: WorkflowGraph) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await simulateWorkflow(graph);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => setResult(null);

  return { result, loading, run, reset };
}
