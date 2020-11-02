import _ from '../lodash';
import { ConstraintGraph } from '../types';

interface ForsterEntry {
  v?: string
  barycenter?: number
  weight?: number
}

interface MappedEntry extends ForsterEntry {
  indegree: number
  in: MappedEntry[]
  out: MappedEntry[]
  vs: string[]
  i: number
  barycenter?: number
  weight?: number
  merged?: boolean
}

export interface XEntry {
  vs: string[]
  i: number
  barycenter: number
  weight: number
}

/*
 * Given a list of entries of the form {v, barycenter, weight} and a
 * constraint graph this function will resolve any conflicts between the
 * constraint graph and the barycenters for the entries. If the barycenters for
 * an entry would violate a constraint in the constraint graph then we coalesce
 * the nodes in the conflict into a new node that respects the contraint and
 * aggregates barycenter and weight information.
 *
 * This implementation is based on the description in Forster, "A Fast and
 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
 * differs in some specific details.
 *
 * Pre-conditions:
 *
 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
 *       no barycenter, then {v}.
 *
 * Returns:
 *
 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
 *    `vs` may either be a singleton or it may be an aggregation of nodes
 *    ordered such that they do not violate constraints from the constraint
 *    graph. The property `i` is the lowest original index of any of the
 *    elements in `vs`.
*/
export function resolveConflicts(entries: ForsterEntry[], cg: ConstraintGraph): XEntry[] {
  var mappedEntries: Record<string, MappedEntry> = {};
  _.forEach(entries, function(entry, i) {
    var tmp: MappedEntry = mappedEntries[entry.v] = {
      indegree: 0,
      "in": <MappedEntry[]> [],
      out: <MappedEntry[]> [],
      vs: [entry.v],
      i: i
    };
    if ((undefined !== entry.barycenter)) {
      tmp.barycenter = entry.barycenter;
      tmp.weight = entry.weight;
    }
  });

  _.forEach(cg.edges(), function(e) {
    var entryV = mappedEntries[e.v];
    var entryW = mappedEntries[e.w];
    if ((undefined !== entryV) && (undefined !== entryW)) {
      entryW.indegree++;
      entryV.out.push(mappedEntries[e.w]);
    }
  });

  var sourceSet = _.values(mappedEntries).filter((e) => !e.indegree);

  return doResolveConflicts(sourceSet);
}

export function doResolveConflicts(sourceSet: MappedEntry[]): XEntry[] {
  var entries = [];

  function handleIn(vEntry: MappedEntry) {
    return function(uEntry: MappedEntry) {
      if (uEntry.merged) {
        return;
      }
      if ((undefined === uEntry.barycenter) ||
          (undefined === vEntry.barycenter) ||
          uEntry.barycenter >= vEntry.barycenter) {
        mergeEntries(vEntry, uEntry);
      }
    };
  }

  function handleOut(vEntry: MappedEntry) {
    return function(wEntry: MappedEntry) {
      wEntry["in"].push(vEntry);
      if (--wEntry.indegree === 0) {
        sourceSet.push(wEntry);
      }
    };
  }

  while (sourceSet.length) {
    var entry = sourceSet.pop();
    entries.push(entry);
    _.forEach(entry["in"].reverse(), handleIn(entry));
    _.forEach(entry.out, handleOut(entry));
  }

  return entries.filter((e) => !e.merged).map(
    function(entry) {
      return _.pick(entry, ["vs", "i", "barycenter", "weight"]) as XEntry;
    });

}

export function mergeEntries(target: MappedEntry, source: MappedEntry) {
  var sum = 0;
  var weight = 0;

  if (target.weight) {
    sum += target.barycenter * target.weight;
    weight += target.weight;
  }

  if (source.weight) {
    sum += source.barycenter * source.weight;
    weight += source.weight;
  }

  target.vs = source.vs.concat(target.vs);
  target.barycenter = sum / weight;
  target.weight = weight;
  target.i = Math.min(source.i, target.i);
  source.merged = true;
}
