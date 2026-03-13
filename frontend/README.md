# VectorShift Pipeline Builder

This project is a full-stack implementation of the VectorShift frontend technical assessment.

It includes:

- a React + React Flow pipeline editor
- reusable node abstractions for fast node creation
- a responsive UI for desktop, tablet, and mobile devices
- a FastAPI backend that analyzes the submitted pipeline graph

## Tech Stack

- Frontend: React, Create React App, React Flow, Zustand, Dagre
- Backend: FastAPI, Pydantic

## Project Structure

```text
VectorShift/
├── backend/
│   ├── graph_utils.py
│   ├── main.py
│   ├── models.py
│   └── __init__.py
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── NodeItem.js
    │   │   ├── PipelineCanvas.js
    │   │   └── Sidebar.js
    │   ├── nodes/
    │   │   ├── APINode.js
    │   │   ├── BaseNode.js
    │   │   ├── ConditionNode.js
    │   │   ├── DatabaseNode.js
    │   │   ├── InputNode.js
    │   │   ├── LLMNode.js
    │   │   ├── LoggerNode.js
    │   │   ├── MathNode.js
    │   │   ├── OutputNode.js
    │   │   └── TextNode.js
    │   ├── styles/
    │   │   ├── editor.css
    │   │   └── node.css
    │   ├── utils/
    │   │   └── layout.js
    │   ├── App.js
    │   ├── index.js
    │   ├── store.js
    │   └── submit.js
    ├── package.json
    └── README.md
```

## Features

### Frontend editor

- drag-and-drop pipeline builder using React Flow
- reusable `BaseNode` abstraction
- built-in node library
- additional custom nodes:
  - Math Node
  - API Node
  - Condition Node
  - Database Node
  - Logger Node
- auto layout powered by Dagre
- minimap, zoom controls, fit view, and grid background
- responsive layout for desktop, tablet, and mobile
- mobile node-adding flow with a bottom-sheet library

### Text node enhancements

- auto-expanding textarea
- dynamic width/height growth based on content
- variable detection using `{{variableName}}`
- dynamic input handles generated from detected variables

### Backend integration

- frontend submits current nodes and edges to FastAPI
- backend returns:
  - `num_nodes`
  - `num_edges`
  - `is_dag`
- DAG detection uses DFS cycle detection
- CORS enabled for local frontend development

## How It Works

1. Add nodes from the sidebar or mobile bottom-sheet library.
2. Connect nodes inside the React Flow canvas.
3. Use `Auto Layout` to organize the graph.
4. Click `Submit`.
5. The frontend sends the pipeline graph to `POST /pipelines/parse`.
6. The backend analyzes the graph and returns node count, edge count, and DAG status.
7. The frontend shows the result in an alert.

## Running The Project

### 1. Start the backend

Open a terminal in `backend/`:

```powershell
cd D:\VectorShift\backend
python -m uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### 2. Start the frontend

Open another terminal in `frontend/`:

```powershell
cd D:\VectorShift\frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

## API

### `POST /pipelines/parse`

Request body:

```json
{
  "nodes": [
    { "id": "input-1" },
    { "id": "text-1" },
    { "id": "llm-1" }
  ],
  "edges": [
    { "source": "input-1", "target": "text-1" },
    { "source": "text-1", "target": "llm-1" }
  ]
}
```

Response:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

## Node Abstraction

The shared node UI lives in `src/nodes/BaseNode.js`.

It provides:

- shared container layout
- shared header and metadata
- configurable input handles
- configurable output handles
- reusable content area for node-specific controls

This makes new nodes quick to add and keeps the styling consistent.

## Responsive Design Notes

The editor is designed to work across screen sizes:

- Desktop: sidebar + submit panel + full canvas
- Tablet: stacked layout with larger action controls
- Mobile: floating `Add Nodes` button and bottom-sheet library
- Touch devices: larger hit targets for handles, buttons, and controls

## Useful Commands

```powershell
# frontend
npm start
npm run build

# backend
python -m uvicorn main:app --reload
```

## Current Status

This codebase currently satisfies the main assessment goals:

- node abstraction
- additional node creation
- unified styling
- dynamic text node behavior
- frontend to backend submission
- backend DAG analysis
- responsive and touch-friendly editor UX
