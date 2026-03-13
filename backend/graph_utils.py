from collections import defaultdict

try:
    from .models import PipelineEdge
except ImportError:
    from models import PipelineEdge


def is_dag(node_ids: list[str], edges: list[PipelineEdge]) -> bool:
    adjacency: dict[str, list[str]] = defaultdict(list)
    visited: set[str] = set()
    active_path: set[str] = set()

    for node_id in node_ids:
        adjacency[node_id]

    for edge in edges:
        adjacency[edge.source].append(edge.target)
        adjacency[edge.target]

    def dfs(node_id: str) -> bool:
        visited.add(node_id)
        active_path.add(node_id)

        for neighbor in adjacency[node_id]:
            if neighbor not in visited:
                if not dfs(neighbor):
                    return False
            elif neighbor in active_path:
                return False

        active_path.remove(node_id)
        return True

    for node_id in adjacency:
        if node_id not in visited and not dfs(node_id):
            return False

    return True
