# 🧩 HR Workflow Designer

A visual drag-and-drop HR workflow builder that lets teams design, simulate, and export automated HR processes — no code required.

![TypeScript](https://img.shields.io/badge/TypeScript-94.7%25-blue?logo=typescript)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)

---

## 🚀 Live Demo

> Coming soon — deploy link will be added here

---

## 📌 What is this?

HR teams often struggle with complex approval chains, onboarding processes, and task routing. **HR Workflow Designer** provides a visual canvas where anyone can build, configure, and simulate these workflows without writing a single line of code.

---

## ✨ Features

- 🖱️ **Drag & Drop Canvas** — Build workflows visually using 5 node types: `Start`, `Task`, `Approval`, `Automated Step`, `End`
- ⚙️ **Per-Node Configuration** — Dynamic forms for each node type with custom fields
- 🤖 **Automated Steps** — Loads actions from API and renders dynamic parameter fields
- 🧪 **Sandbox Simulation** — Validates workflow graph, simulates execution, and shows step-by-step log + JSON view
- 📤 **Export / Import** — Save and load workflows as JSON files
- 🗺️ **MiniMap + Zoom Controls** — Navigate large workflows easily

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| React Flow | Visual node canvas |
| Zustand | State management |
| CSS Modules | Styling |

---

## 📁 Project Structure

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

---

## ⚡ Getting Started

```bash
# Clone the repository
git clone https://github.com/rithishbarathn/Hr-Workflow-Designer.git

# Navigate into the project
cd Hr-Workflow-Designer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧠 Design Decisions

- **Zustand over Context** — simpler state management, no provider boilerplate
- **Local mock functions over JSON Server** — zero config, no extra process needed
- **Topological sort** for correct simulation execution order
- **`Record<string, unknown>`** for React Flow node data to satisfy generic constraints

---

## 🔮 Roadmap

- [ ] Undo / Redo support
- [ ] Visual validation errors on nodes (red border highlight)
- [ ] Auto-layout using Dagre
- [ ] Node templates library
- [ ] Backend persistence (FastAPI + PostgreSQL)
- [ ] Live deployment

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Rithish Barathn** — [GitHub](https://github.com/rithishbarathn)
