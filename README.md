<<<<<<< HEAD
# HR Workflow Designer — Tredence Case Study

A visual drag-and-drop HR workflow builder.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Architecture

```
src/
├── components/
│   ├── nodes/          # 5 custom React Flow node components
│   ├── forms/          # NodeFormPanel + per-node forms + shared FormFields
│   ├── sidebar/        # Draggable node palette
│   ├── sandbox/        # Simulate panel + execution log
│   └── WorkflowCanvas.tsx
├── store/workflowStore.ts   # Zustand store
├── hooks/                   # useSimulate, useAutomations
├── api/mockApi.ts           # GET /automations, POST /simulate (local mocks)
├── utils/validate.ts        # validateWorkflow, topologicalSort, serializeWorkflow
└── types/                   # nodes.ts, workflow.ts
```

## Features

- Drag & drop 5 node types: Start, Task, Approval, Automated Step, End
- Per-node config forms with dynamic fields
- Automated Step loads actions from mock API + renders dynamic param fields
- Sandbox panel: validates graph, simulates execution, shows step log + JSON view
- Export/Import workflow as JSON
- MiniMap + zoom controls

## Design Decisions

- **Zustand** over Context — simpler, no provider boilerplate
- **Local mock functions** over JSON Server — zero config, no extra process
- **`Record<string, unknown>`** for React Flow node data (satisfies generic constraint), cast to specific types in forms
- **Topological sort** for simulation execution order

## What I'd Add With More Time

- Undo/redo
- Visual validation errors on nodes (red border)
- Auto-layout (Dagre)
- Node templates
- Backend persistence (FastAPI + PostgreSQL)
=======
# Hr-Workflow-Designer
>>>>>>> 1cb45f441d59f478042485c23944c6deed134167
