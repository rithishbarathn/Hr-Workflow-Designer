import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '../store/workflowStore';
import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from './nodes/CustomNodes';

const nodeTypes: NodeTypes = {
  start: StartNode as any,
  task: TaskNode as any,
  approval: ApprovalNode as any,
  automated: AutomatedNode as any,
  end: EndNode as any,
};

const DEFAULT_DATA: Record<string, Record<string, unknown>> = {
  start:     { type: 'start',     title: 'Start',          metadata: [] },
  task:      { type: 'task',      title: 'New Task',        description: '', assignee: '', dueDate: '', customFields: [] },
  approval:  { type: 'approval',  title: 'Approval',        approverRole: 'Manager', autoApproveThreshold: 0 },
  automated: { type: 'automated', title: 'Automated Step',  actionId: '', actionParams: {} },
  end:       { type: 'end',       endMessage: 'Workflow Complete', showSummary: false },
};

let idCounter = 1;
const getId = () => `node_${Date.now()}_${idCounter++}`;

export function WorkflowCanvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNode } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = useState<any>(null);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !rfInstance) return;

    const bounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!bounds) return;

    const position = rfInstance.screenToFlowPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode = { id: getId(), type, position, data: { ...DEFAULT_DATA[type] } };
    addNode(newNode);
    setSelectedNode(newNode.id);
  }, [rfInstance, addNode, setSelectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1, height: '100%', minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_e, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        fitView
        style={{ background: '#0a0918' }}
        defaultEdgeOptions={{ animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }}
      >
        <Background color="#1e1d2e" gap={24} size={1} />
        <Controls style={{ background: '#0f0e17', border: '1px solid #1e1d2e', borderRadius: 8 }} />
        <MiniMap
          style={{ background: '#0f0e17', border: '1px solid #1e1d2e', borderRadius: 8 }}
          nodeColor="#6366f1"
          maskColor="rgba(10,9,24,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
