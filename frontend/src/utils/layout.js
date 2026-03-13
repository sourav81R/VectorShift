import dagre from 'dagre';

const DEFAULT_NODE_WIDTH = 260;
const DEFAULT_NODE_HEIGHT = 180;

export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const graph = new dagre.graphlib.Graph();
  const isHorizontal = direction === 'LR';

  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: direction,
    nodesep: 56,
    ranksep: 96,
    marginx: 32,
    marginy: 32,
  });

  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: node.width || node.measured?.width || DEFAULT_NODE_WIDTH,
      height: node.height || node.measured?.height || DEFAULT_NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  return nodes.map((node) => {
    const positionedNode = graph.node(node.id);
    const width = node.width || node.measured?.width || DEFAULT_NODE_WIDTH;
    const height = node.height || node.measured?.height || DEFAULT_NODE_HEIGHT;

    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: positionedNode.x - width / 2,
        y: positionedNode.y - height / 2,
      },
    };
  });
};

