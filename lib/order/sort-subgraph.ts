import _ from '../lodash';
import { Barycenter, barycenter } from "./barycenter";
import { resolveConflicts, XEntry } from "./resolve-conflicts";
import { sort, SortResult } from "./sort";
import { LayerGraph } from './build-layer-graph';
import { ConstraintGraph } from '../types';

export function sortSubgraph(g: LayerGraph, v: string, cg: ConstraintGraph, biasRight: boolean) {
  var movable = g.children(v);
  var node = g.node(v);
  var bl = node ? node.borderLeft : undefined;
  var br = node ? node.borderRight: undefined;
  var subgraphs: Record<string, SortResult> = {};

  if (bl) {
    movable = movable.filter((w) => w !== bl && w !== br);
  }

  var barycenters = barycenter(g, movable);
  for (var entry of barycenters) {
    if (g.children(entry.v).length) {
      var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
      subgraphs[entry.v] = subgraphResult;
      if (_.has(subgraphResult, "barycenter")) {
        mergeBarycenters(entry, subgraphResult);
      }
    }
  }

  var entries = resolveConflicts(barycenters, cg) as any;
  expandSubgraphs(entries, subgraphs);

  var result = sort(entries, biasRight);

  if (bl) {
    result.vs = _.flattenDeep([bl, result.vs, br]);
    if (g.predecessors(bl).length) {
      var blPred = g.node(g.predecessors(bl)[0]);
      var brPred = g.node(g.predecessors(br)[0]);
      if (!_.has(result, "barycenter")) {
        result.barycenter = 0;
        result.weight = 0;
      }
      result.barycenter = (result.barycenter * result.weight +
                           blPred.order + brPred.order) / (result.weight + 2);
      result.weight += 2;
    }
  }

  return result;
}

function expandSubgraphs(entries: XEntry[], subgraphs: Record<string, SortResult>) {
  for (var entry of entries) {
    entry.vs = _.flattenDeep(entry.vs.map(function(v) {
      if (subgraphs[v]) {
        return subgraphs[v].vs;
      }
      return v;
    }));
  }
}

function mergeBarycenters(target: Barycenter, other: SortResult) {
  if (!_.isUndefined(target.barycenter)) {
    target.barycenter = (target.barycenter * target.weight +
                         other.barycenter * other.weight) /
                        (target.weight + other.weight);
    target.weight += other.weight;
  } else {
    target.barycenter = other.barycenter;
    target.weight = other.weight;
  }
}
