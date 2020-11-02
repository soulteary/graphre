import {
  range,
  sortBy
} from "lodash";

const idCounter: Record<string, number> = {};

export default {
  flattenDeep<T>(matrix: T[][]) {
    var result: T[] = [];
    for (var e of matrix) {
      result.push(...e);
    }
    return result;
  },
  has(object: any, key: string): boolean {
    return object != null && object.hasOwnProperty(key)
  },
  last<T>(array: T[]): T {
    const length = array == null ? 0 : array.length
    return length ? array[length - 1] : undefined
  },
  mapValues<T, U>(object: Record<string, T>, iteratee: (e: T, key?: string) => U) {
    object = Object(object)
    const result: Record<string, U> = {}
    Object.keys(object).forEach((key) => {
      result[key] = iteratee(object[key], key)
    })
    return result
  },
  minBy<T>(list: T[], fn: (e: T) => number): T {
    var minWeight = Number.POSITIVE_INFINITY;
    var minima = undefined;
    for (var e of list) {
      var weight = fn(e);
      if (weight < minWeight) {
        minWeight = weight;
        minima = e;
      }
    }
    return minima;
  },
  range,
  sortBy,
  uniqueId(prefix: string): string {
    if (!idCounter[prefix]) {
      idCounter[prefix] = 0
    }
    const id = ++idCounter[prefix]
    return `${prefix}${id}`
  },
  values<T>(object: Record<string, T>): T[] {
    return object ? Object.keys(object).map(e => object[e]) : [];
  },
  array<T>(count: number, factory: () => T): T[] {
    var output = []
    for(var i=0; i<count; i++) output.push(factory());
    return output;
  }
};
