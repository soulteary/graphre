import _ from '../lodash';
import { Graph } from 'graphlib';

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
*/
export function initOrder(g: Graph<GraphNode, EdgeLabel>): number[][] {
  var visited = {};
  var simpleNodes = g.nodes().filter(v => !g.children(v).length);
  var maxRank = _.max(simpleNodes.map(function(v) { return g.node(v).rank; }));
  var layers: number[][] = _.range(maxRank + 1).map(function() { return []; });

  function dfs(v) {
    if (_.has(visited, v)) return;
    visited[v] = true;
    var node = g.node(v);
    layers[node.rank].push(v);
    g.successors(v).forEach(dfs);
  }

  var orderedVs = _.sortBy(simpleNodes, function(v) { return g.node(v).rank; });
  orderedVs.forEach(dfs);

  return layers;
}
