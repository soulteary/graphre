import _ from '../lodash';
import * as util from "../util";
import { XEntry } from './resolve-conflicts';

export interface SortResult {
  vs: string[]
  barycenter?: number
  weight?: number
}

export function sort(entries: XEntry[], biasRight: boolean): SortResult {
  var parts = util.partition(entries, function(entry) {
    return _.has(entry, "barycenter");
  });
  var sortable = parts.lhs;
  var unsortable = _.sortBy(parts.rhs, function(entry: XEntry) { return -entry.i; });
  var vss: string[][] = [];
  var sum = 0;
  var weight = 0;
  var vsIndex = 0;

  sortable.sort(compareWithBias(!!biasRight));

  vsIndex = consumeUnsortable(vss, unsortable, vsIndex);

  for (var entry of sortable) {
    vsIndex += entry.vs.length;
    vss.push(entry.vs);
    sum += entry.barycenter * entry.weight;
    weight += entry.weight;
    vsIndex = consumeUnsortable(vss, unsortable, vsIndex);
  }

  var result: SortResult = { vs: _.flattenDeep(vss) };
  if (weight) {
    result.barycenter = sum / weight;
    result.weight = weight;
  }
  return result;
}

interface Unsortable<T> { i: number, vs: T }
function consumeUnsortable<T>(vs: T[], unsortable: Array<Unsortable<T>>, index: number): number {
  var last: Unsortable<T>;
  while (unsortable.length && (last = _.last(unsortable)).i <= index) {
    unsortable.pop();
    vs.push(last.vs);
    index++;
  }
  return index;
}

function compareWithBias(bias: boolean) {
  return function(entryV: XEntry, entryW: XEntry) {
    if (entryV.barycenter < entryW.barycenter) {
      return -1;
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1;
    }

    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
  };
}
