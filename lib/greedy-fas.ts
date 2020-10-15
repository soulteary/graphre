import _ from "./lodash";
import { Edge, Graph } from "graphlib";
import { List } from "./data/list";

/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */
var DEFAULT_WEIGHT_FN = (e: Edge) => (1);

export function greedyFAS(g: Graph<GraphNode, EdgeLabel>, weightFn: (e: Edge) => number): Edge[] {
  if (g.nodeCount() <= 1) {
    return [];
  }
  var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
  var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);

  // Expand multi-edges
  return _.flatten(results.map(function(e: Edge) {
    return g.outEdges(e.v, e.w);
  }), true);
}

function doGreedyFAS(g: Graph<FasNode, number>, buckets, zeroIdx): Edge[] {
  var results: Edge[] = [];
  var sources = buckets[buckets.length - 1];
  var sinks = buckets[0];

  var entry;
  while (g.nodeCount()) {
    while ((entry = sinks.dequeue()))   { removeNode(g, buckets, zeroIdx, entry); }
    while ((entry = sources.dequeue())) { removeNode(g, buckets, zeroIdx, entry); }
    if (g.nodeCount()) {
      for (var i = buckets.length - 2; i > 0; --i) {
        entry = buckets[i].dequeue();
        if (entry) {
          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
          break;
        }
      }
    }
  }

  return results;
}

function removeNode(g: Graph<FasNode, number>, buckets, zeroIdx, entry, collectPredecessors?): Edge[] {
  var results = collectPredecessors ? [] : undefined;

  for (var edge of g.inEdges(entry.v)) {
    var weight = g.edge(edge);
    var uEntry = g.node(edge.v);

    if (collectPredecessors) {
      results.push({ v: edge.v, w: edge.w });
    }

    uEntry.out -= weight;
    assignBucket(buckets, zeroIdx, uEntry);
  }

  for (var edge of g.outEdges(entry.v)) {
    var weight = g.edge(edge);
    var w = edge.w;
    var wEntry = g.node(w);
    wEntry["in"] -= weight;
    assignBucket(buckets, zeroIdx, wEntry);
  }

  g.removeNode(entry.v);

  return results;
}

interface FasNode {
  v: string;
  in: number;
  out: number;
}

function buildState(g: Graph<GraphNode, EdgeLabel>, weightFn: (e: Edge) => number) {
  var fasGraph = new Graph<FasNode, number>();
  var maxIn = 0;
  var maxOut = 0;

  for (var v of g.nodes()) {
    fasGraph.setNode(v, { v: v, "in": 0, out: 0 });
  }

  // Aggregate weights on nodes, but also sum the weights across multi-edges
  // into a single edge for the fasGraph.
  for (var e of g.edges()) {
    var prevWeight = fasGraph.edge(e.v, e.w) || 0;
    var weight = weightFn(e);
    var edgeWeight = prevWeight + weight;
    fasGraph.setEdge(e.v, e.w, edgeWeight);
    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
    maxIn  = Math.max(maxIn,  fasGraph.node(e.w)["in"]  += weight);
  }

  var buckets = _.range(maxOut + maxIn + 3).map(function() { return new List(); });
  var zeroIdx = maxIn + 1;

  for (var v of fasGraph.nodes()) {
    assignBucket(buckets, zeroIdx, fasGraph.node(v));
  }

  return { graph: fasGraph, buckets: buckets, zeroIdx: zeroIdx };
}

function assignBucket(buckets, zeroIdx, entry) {
  if (!entry.out) {
    buckets[0].enqueue(entry);
  } else if (!entry["in"]) {
    buckets[buckets.length - 1].enqueue(entry);
  } else {
    buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
  }
}
