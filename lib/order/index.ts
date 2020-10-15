import _ from '../lodash';
import { initOrder } from "./init-order";
import { crossCount } from "./cross-count";
import { sortSubgraph } from "./sort-subgraph";
import { buildLayerGraph } from "./build-layer-graph";
import { addSubgraphConstraints } from "./add-subgraph-constraints";
import { Graph } from "graphlib";
import { buildLayerMatrix, maxRank } from "../util";

export { addSubgraphConstraints } from "./add-subgraph-constraints";
export { barycenter } from './barycenter';
export { buildLayerGraph } from "./build-layer-graph";
export { crossCount } from "./cross-count";
export { initOrder } from "./init-order";
export { resolveConflicts } from './resolve-conflicts';
export { sortSubgraph } from "./sort-subgraph";
export { sort } from './sort';

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
export function order(g: Graph<GraphNode, EdgeLabel>) {
  var maximumRank = maxRank(g),
    downLayerGraphs = buildLayerGraphs(g, _.range(1, maximumRank + 1), "inEdges"),
    upLayerGraphs = buildLayerGraphs(g, _.range(maximumRank - 1, -1, -1), "outEdges");

  var layering = initOrder(g);
  assignOrder(g, layering);

  var bestCC = Number.POSITIVE_INFINITY,
    best;

  for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);

    layering = buildLayerMatrix(g);
    var cc = crossCount(g, layering);
    if (cc < bestCC) {
      lastBest = 0;
      best = _.cloneDeep(layering);
      bestCC = cc;
    }
  }

  assignOrder(g, best);
}

function buildLayerGraphs(g: Graph<GraphNode, EdgeLabel>, ranks: number[], relationship: 'inEdges'|'outEdges'): Array<Graph<GraphNode, EdgeLabel>> {
  return ranks.map(function(rank) {
    return buildLayerGraph(g, rank, relationship);
  });
}

function sweepLayerGraphs(layerGraphs: Array<Graph<GraphNode, EdgeLabel>>, biasRight) {
  var cg = new Graph<GraphNode, EdgeLabel>();
  for (var lg of layerGraphs) {
    var root = lg.graph().root;
    var sorted = sortSubgraph(lg, root, cg, biasRight);
    sorted.vs.map(function(v, i) {
      lg.node(v).order = i;
    });
    addSubgraphConstraints(lg, cg, sorted.vs);
  }
}

function assignOrder(g: Graph<GraphNode, EdgeLabel>, layering) {
  for (var layer of layering) {
    layer.map(function(v, i) {
      g.node(v).order = i;
    });
  }
}