import type { Graph } from 'graphlib';

export interface Barycenter {
  v: string,
  barycenter?: number,
  weight?: number
}

export function barycenter(g: Graph<GraphNode, EdgeLabel>, movable: string[]): Barycenter[] {
  return movable.map(function(v: string) {
    var inV = g.inEdges(v);
    if (!inV['length']) {
      return { v: v };
    } else {
      var result = inV.reduce(function(acc, e) {
        var edge = g.edge(e),
          nodeU = g.node(e.v);
        return {
          sum: acc.sum + (edge.weight * nodeU.order),
          weight: acc.weight + edge.weight
        };
      }, { sum: 0, weight: 0 });

      return {
        v: v,
        barycenter: result.sum / result.weight,
        weight: result.weight
      };
    }
  });
}

