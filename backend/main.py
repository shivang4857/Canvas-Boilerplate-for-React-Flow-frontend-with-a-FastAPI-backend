from collections import defaultdict, deque
from typing import Any, Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(node_ids: List[str], edges: List[Edge]) -> bool:
    graph: Dict[str, List[str]] = defaultdict(list)
    indegree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    node_set = set(node_ids)
    for e in edges:
        if e.source not in node_set or e.target not in node_set:
            continue
        graph[e.source].append(e.target)
        indegree[e.target] += 1

    q = deque([n for n, deg in indegree.items() if deg == 0])
    visited = 0

    while q:
        n = q.popleft()
        visited += 1
        for nxt in graph.get(n, []):
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                q.append(nxt)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload) -> Dict[str, Any]:
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    node_ids = [n.id for n in payload.nodes]
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag(node_ids, payload.edges),
    }
