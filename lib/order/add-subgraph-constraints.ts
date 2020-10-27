import { DagreGraph } from '../types';
import { LayerGraph } from './build-layer-graph';
import _ from '../lodash';

export function addSubgraphConstraints(g: LayerGraph, cg: DagreGraph, vs: string[]) {
  var prev: Record<string, string> = {};
  var rootPrev: string;

  _.forEach(vs, function(v) {
    var child = g.parent(v);
    var parent: string;
    var prevChild: string;
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
  });
}
