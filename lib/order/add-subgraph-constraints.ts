import type { Graph } from 'graphlib';

export function addSubgraphConstraints(g: Graph<GraphNode, EdgeLabel>, cg: Graph<GraphNode, EdgeLabel>, vs: string[]) {
  var prev = {},
    rootPrev;

  for (var v of vs) {
    var child = g.parent(v),
      parent,
      prevChild;
    while (child) {
      parent = g.parent(child);
      if (parent) {
        prevChild = prev[parent];
        prev[parent] = child;
      } else {
        prevChild = rootPrev;
        rootPrev = child;
      }
      if (prevChild && prevChild !== child) {
        cg.setEdge(prevChild, child);
        return;
      }
      child = parent;
    }
  }
}
