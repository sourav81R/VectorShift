const buildAdjacency = (nodes, edges) => {
  const adjacency = new Map(nodes.map((node) => [node.id, new Set()]));

  edges.forEach((edge) => {
    if (adjacency.has(edge.source) && adjacency.has(edge.target)) {
      adjacency.get(edge.source).add(edge.target);
      adjacency.get(edge.target).add(edge.source);
    }
  });

  return adjacency;
};

const findDisconnectedNodes = (nodes, edges) => {
  if (nodes.length === 0) {
    return [];
  }

  const adjacency = buildAdjacency(nodes, edges);
  const visited = new Set();
  const queue = [nodes[0].id];

  while (queue.length > 0) {
    const current = queue.shift();

    if (visited.has(current)) {
      continue;
    }

    visited.add(current);
    adjacency.get(current)?.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    });
  }

  return nodes.filter((node) => !visited.has(node.id)).map((node) => node.id);
};

export const validatePipeline = (nodes, edges) => {
  const errors = [];
  const warnings = [];

  if (nodes.length === 0) {
    errors.push('Add at least one node before submitting the pipeline.');
  }

  if (edges.length === 0) {
    errors.push('Connect at least one edge so the backend can analyze the graph.');
  }

  if (nodes.length > 0 && edges.length > 0) {
    const disconnectedNodes = findDisconnectedNodes(nodes, edges);

    if (disconnectedNodes.length > 0) {
      warnings.push(`Disconnected nodes detected: ${disconnectedNodes.join(', ')}.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

