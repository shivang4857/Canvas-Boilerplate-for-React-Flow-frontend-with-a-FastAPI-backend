### VectorShift Frontend Technical Assessment

This project is a small **pipeline builder** (drag nodes onto a canvas, connect them with edges) built with **React + React Flow** and a simple **FastAPI** backend.

### How to run (step-by-step)

#### 1) Frontend

```bash
cd frontend
npm install
npm start
```

- App runs at `http://localhost:3000`

#### 2) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

- API runs at `http://localhost:8000`

#### 3) Full integration test

1. Start backend (`uvicorn ...`)
2. Start frontend (`npm start`)
3. Build a pipeline (drag nodes, connect edges)
4. Click **Submit Pipeline**
5. You’ll see an alert with:
   - number of nodes
   - number of edges
   - whether the graph is a DAG

Optional:
- Set a different API base URL:

```bash
export REACT_APP_API_BASE_URL="http://localhost:8000"
```

### What was implemented (Phases 1–4)

#### Phase 1 — Node abstraction

Goal: avoid copy/pasting node UI by using a shared abstraction.

What was done:
- **Created `BaseNode`** (shared node shell: header/body + handle rendering)
  - `frontend/src/nodes/baseNode.js`
- **Created field helpers** (shared form controls)
  - `frontend/src/nodes/fields.js`
- **Refactored existing nodes** to use the abstraction
  - `frontend/src/nodes/inputNode.js`
  - `frontend/src/nodes/outputNode.js`
  - `frontend/src/nodes/llmNode.js`
  - `frontend/src/nodes/textNode.js`
- **Added 5 additional nodes** to demonstrate the abstraction
  - `frontend/src/nodes/numberNode.js`
  - `frontend/src/nodes/concatNode.js`
  - `frontend/src/nodes/delayNode.js`
  - `frontend/src/nodes/switchNode.js`
  - `frontend/src/nodes/jsonParseNode.js`
- **Wired new nodes into the app**
  - `frontend/src/ui.js` (register `nodeTypes`)
  - `frontend/src/toolbar.js` (add draggable items)

#### Phase 2 — Styling

Goal: apply a clean, consistent UI inspired by VectorShift.

What was done:
- Global theme + ReactFlow styling (handles, edges, minimap, controls)
  - `frontend/src/index.css`
- Styled toolbar (tabs + node palette)
  - `frontend/src/toolbar.js`
  - `frontend/src/draggableNode.js`
- Styled nodes and form fields to match the same design system
  - `frontend/src/nodes/baseNode.js`
  - `frontend/src/nodes/fields.js`
- Styled submit button
  - `frontend/src/submit.js`

#### Phase 3 — Text node logic

Goal:
1) Text node auto-resizes as content grows.
2) Variables like `{{input_0.text}}` create left-side input handles.

What was done:
- Text node uses a textarea, auto-measures its height, and adjusts node width/height.
- Parses variables in the form `{{name}}` and `{{name.field}}` (valid JS identifier path).
- Generates a left `target` handle for each unique variable.
- Removes edges connected to handles that disappeared (when a variable is deleted).

Files:
- `frontend/src/nodes/textNode.js`
- `frontend/src/nodes/fields.js`
- `frontend/src/store.js` (edge pruning helper)

#### Phase 4 — Backend integration

Goal: send pipeline graph to backend and show summary alert.

What was done:
- Frontend:
  - `frontend/src/submit.js` now sends `{ nodes, edges }` to the backend and shows an alert with results.
- Backend:
  - `backend/main.py` now exposes `POST /pipelines/parse`
  - Response format:
    - `{ num_nodes: int, num_edges: int, is_dag: bool }`
  - DAG check uses topological sort (Kahn’s algorithm).
  - CORS enabled for `http://localhost:3000` and `http://127.0.0.1:3000`.

### Notes / common issues

- If `Submit Pipeline` fails:
  - ensure backend is running on port `8000`
  - ensure frontend is running on port `3000`
  - check the browser console/network tab for the error text

