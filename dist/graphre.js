'use strict';



class List {
    constructor() {
        var sentinel = {};
        sentinel._next = sentinel._prev = sentinel;
        this._sentinel = sentinel;
    }
    dequeue() {
        var sentinel = this._sentinel;
        var entry = sentinel._prev;
        if (entry !== sentinel) {
            unlink(entry);
            return entry;
        }
        return undefined;
    }
    ;
    enqueue(entry) {
        var sentinel = this._sentinel;
        var item = entry;
        if (item._prev && item._next) {
            unlink(item);
        }
        item._next = sentinel._next;
        sentinel._next._prev = item;
        sentinel._next = item;
        item._prev = sentinel;
    }
    ;
    toString() {
        var strs = [];
        var sentinel = this._sentinel;
        var curr = sentinel._prev;
        while (curr !== sentinel) {
            strs.push(JSON.stringify(curr, filterOutLinks));
            curr = curr._prev;
        }
        return "[" + strs.join(", ") + "]";
    }
    ;
}
function unlink(entry) {
    entry._prev._next = entry._next;
    entry._next._prev = entry._prev;
    delete entry._next;
    delete entry._prev;
}
function filterOutLinks(k, v) {
    if (k !== "_next" && k !== "_prev") {
        return v;
    }
}

var list = /*#__PURE__*/Object.freeze({
    __proto__: null,
    List: List
});

const idCounter = {};
function flattenDeep(matrix) {
    var result = [];
    for (var e of matrix) {
        result.push(...e);
    }
    return result;
}
function has(object, key) {
    return object != null && object.hasOwnProperty(key);
}
function last(array) {
    const length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
}
function mapValues(object, iteratee) {
    object = Object(object);
    const result = {};
    Object.keys(object).forEach((key) => {
        result[key] = iteratee(object[key], key);
    });
    return result;
}
function minBy(list, fn) {
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
}
function range(start, end) {
    var step = (start < end ? 1 : -1);
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = new Array(length);
    while (length--) {
        result[++index] = start;
        start += step;
    }
    return result;
}
function sortBy(list, fn) {
    return list.slice().sort((a, b) => fn(a) - fn(b));
}
function uniqueId(prefix) {
    if (!idCounter[prefix]) {
        idCounter[prefix] = 0;
    }
    const id = ++idCounter[prefix];
    return `${prefix}${id}`;
}
function values(object) {
    return object ? Object.keys(object).map(e => object[e]) : [];
}
function array(count, factory) {
    var output = [];
    for (var i = 0; i < count; i++)
        output.push(factory());
    return output;
}
function isUndefined(item) {
    return undefined === item;
}
function each(obj, action) {
    for (var key of Object.keys(obj)) {
        action(obj[key], key);
    }
}
function isEmpty(obj) {
    return 0 === Object.keys(obj).length;
}
function union(a, b) {
    var output = [...a];
    for (var item of b) {
        if (output.indexOf(item) === -1) {
            output.push(item);
        }
    }
    return output;
}

function initOrder(g) {
    var visited = {};
    var simpleNodes = g.nodes().filter(v => !g.children(v).length);
    var maxRank = Math.max(...simpleNodes.map(v => g.node(v).rank));
    var layers = array(maxRank + 1, () => []);
    function dfs(v) {
        if (has(visited, v))
            return;
        visited[v] = true;
        var node = g.node(v);
        layers[node.rank].push(v);
        g.successors(v).forEach(dfs);
    }
    var orderedVs = sortBy(simpleNodes, (v) => g.node(v).rank);
    orderedVs.forEach(dfs);
    return layers;
}

function crossCount(g, layering) {
    var cc = 0;
    for (var i = 1; i < layering.length; ++i) {
        cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
    }
    return cc;
}
function twoLayerCrossCount(g, northLayer, southLayer) {
    var southPos = {};
    for (var i = 0; i < southLayer.length; i++) {
        southPos[southLayer[i]] = i;
    }
    var southEntries = flattenDeep(northLayer.map(function (v) {
        return sortBy(g.outEdges(v).map(function (e) {
            return { pos: southPos[e.w], weight: g.edge(e).weight };
        }), e => e.pos);
    }));
    var firstIndex = 1;
    while (firstIndex < southLayer.length)
        firstIndex <<= 1;
    var treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    var tree = array(treeSize, () => 0);
    var cc = 0;
    southEntries.forEach(function (entry) {
        var index = entry.pos + firstIndex;
        tree[index] += entry.weight;
        var weightSum = 0;
        while (index > 0) {
            if (index % 2) {
                weightSum += tree[index + 1];
            }
            index = (index - 1) >> 1;
            tree[index] += entry.weight;
        }
        cc += entry.weight * weightSum;
    });
    return cc;
}

function barycenter(g, movable) {
    if (!movable)
        return [];
    return movable.map(function (v) {
        var inV = g.inEdges(v);
        if (!inV['length']) {
            return { v: v };
        }
        else {
            var result = inV.reduce(function (acc, e) {
                var edge = g.edge(e);
                var nodeU = g.node(e.v);
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

function resolveConflicts(entries, cg) {
    var mappedEntries = {};
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var tmp = mappedEntries[entry.v] = {
            indegree: 0,
            "in": [],
            out: [],
            vs: [entry.v],
            i: i
        };
        if ((undefined !== entry.barycenter)) {
            tmp.barycenter = entry.barycenter;
            tmp.weight = entry.weight;
        }
    }
    for (var e of cg.edges()) {
        var entryV = mappedEntries[e.v];
        var entryW = mappedEntries[e.w];
        if ((undefined !== entryV) && (undefined !== entryW)) {
            entryW.indegree++;
            entryV.out.push(mappedEntries[e.w]);
        }
    }
    var sourceSet = values(mappedEntries).filter((e) => !e.indegree);
    return doResolveConflicts(sourceSet);
}
function doResolveConflicts(sourceSet) {
    var entries = [];
    function handleIn(vEntry) {
        return function (uEntry) {
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
    function handleOut(vEntry) {
        return function (wEntry) {
            wEntry["in"].push(vEntry);
            if (--wEntry.indegree === 0) {
                sourceSet.push(wEntry);
            }
        };
    }
    while (sourceSet.length) {
        var entry = sourceSet.pop();
        entries.push(entry);
        entry["in"].reverse().forEach(handleIn(entry));
        entry.out.forEach(handleOut(entry));
    }
    return entries.filter((e) => !e.merged).map(function (entry) {
        var xentry = { vs: entry.vs, i: entry.i };
        if ('barycenter' in entry)
            xentry.barycenter = entry.barycenter;
        if ('weight' in entry)
            xentry.weight = entry.weight;
        return xentry;
    });
}
function mergeEntries(target, source) {
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

var DEFAULT_EDGE_NAME = "\x00";
var GRAPH_NODE = "\x00";
var EDGE_KEY_DELIM = "\x01";
class Graph {
    constructor(opts = {}) {
        this._label = undefined;
        this._nodeCount = 0;
        this._edgeCount = 0;
        this._isDirected = has(opts, "directed") ? opts.directed : true;
        this._isMultigraph = has(opts, "multigraph") ? opts.multigraph : false;
        this._isCompound = has(opts, "compound") ? opts.compound : false;
        this._defaultNodeLabelFn = () => (undefined);
        this._defaultEdgeLabelFn = () => (undefined);
        this._nodes = {};
        if (this._isCompound) {
            this._parent = {};
            this._children = {};
            this._children[GRAPH_NODE] = {};
        }
        this._in = {};
        this._preds = {};
        this._out = {};
        this._sucs = {};
        this._edgeObjs = {};
        this._edgeLabels = {};
    }
    isDirected() {
        return this._isDirected;
    }
    isMultigraph() {
        return this._isMultigraph;
    }
    isCompound() {
        return this._isCompound;
    }
    setGraph(label) {
        this._label = label;
        return this;
    }
    graph() {
        return this._label;
    }
    ;
    setDefaultNodeLabel(newDefault) {
        function isConstant(x) { return 'function' !== typeof x; }
        if (isConstant(newDefault)) {
            this._defaultNodeLabelFn = () => (newDefault);
        }
        else {
            this._defaultNodeLabelFn = newDefault;
        }
        return this;
    }
    nodeCount() {
        return this._nodeCount;
    }
    nodes() {
        return Object.keys(this._nodes);
    }
    sources() {
        var self = this;
        return this.nodes().filter(function (v) {
            return isEmpty(self._in[v]);
        });
    }
    sinks() {
        var self = this;
        return this.nodes().filter((v) => isEmpty(self._out[v]));
    }
    setNodes(vs, value) {
        var self = this;
        for (var v of vs) {
            if (value !== undefined) {
                self.setNode(v, value);
            }
            else {
                self.setNode(v);
            }
        }
        return this;
    }
    setNode(v, value) {
        if (has(this._nodes, v)) {
            if (arguments.length > 1) {
                this._nodes[v] = value;
            }
            return this;
        }
        this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
        if (this._isCompound) {
            this._parent[v] = GRAPH_NODE;
            this._children[v] = {};
            this._children[GRAPH_NODE][v] = true;
        }
        this._in[v] = {};
        this._preds[v] = {};
        this._out[v] = {};
        this._sucs[v] = {};
        ++this._nodeCount;
        return this;
    }
    node(v) {
        return this._nodes[v];
    }
    hasNode(v) {
        return has(this._nodes, v);
    }
    removeNode(v) {
        var self = this;
        if (has(this._nodes, v)) {
            var removeEdge = (e) => { self.removeEdge(this._edgeObjs[e]); };
            delete this._nodes[v];
            if (this._isCompound) {
                this._removeFromParentsChildList(v);
                delete this._parent[v];
                for (var child of this.children(v)) {
                    self.setParent(child);
                }
                delete this._children[v];
            }
            for (var key of Object.keys(this._in[v]))
                removeEdge(key);
            delete this._in[v];
            delete this._preds[v];
            for (var key of Object.keys(this._out[v]))
                removeEdge(key);
            delete this._out[v];
            delete this._sucs[v];
            --this._nodeCount;
        }
        return this;
    }
    setParent(v, parent) {
        if (!this._isCompound) {
            throw new Error("Cannot set parent in a non-compound graph");
        }
        if (undefined === parent) {
            parent = GRAPH_NODE;
        }
        else {
            parent += "";
            for (var ancestor = parent; !isUndefined(ancestor); ancestor = this.parent(ancestor)) {
                if (ancestor === v) {
                    throw new Error(`Setting ${parent} as parent of ${v} would create a cycle`);
                }
            }
            this.setNode(parent);
        }
        this.setNode(v);
        this._removeFromParentsChildList(v);
        this._parent[v] = parent;
        this._children[parent][v] = true;
        return this;
    }
    _removeFromParentsChildList(v) {
        delete this._children[this._parent[v]][v];
    }
    parent(v) {
        if (this._isCompound) {
            var parent = this._parent[v];
            if (parent !== GRAPH_NODE) {
                return parent;
            }
        }
        return undefined;
    }
    children(v) {
        if (isUndefined(v)) {
            v = GRAPH_NODE;
        }
        if (this._isCompound) {
            var children = this._children[v];
            if (children) {
                return Object.keys(children);
            }
            return undefined;
        }
        else if (v === GRAPH_NODE) {
            return this.nodes();
        }
        else if (this.hasNode(v)) {
            return [];
        }
        return undefined;
    }
    predecessors(v) {
        var predsV = this._preds[v];
        if (predsV) {
            return Object.keys(predsV);
        }
        return undefined;
    }
    successors(v) {
        var sucsV = this._sucs[v];
        if (sucsV) {
            return Object.keys(sucsV);
        }
        return undefined;
    }
    neighbors(v) {
        var preds = this.predecessors(v);
        if (preds) {
            return union(preds, this.successors(v));
        }
        return undefined;
    }
    isLeaf(v) {
        var neighbors;
        if (this.isDirected()) {
            neighbors = this.successors(v);
        }
        else {
            neighbors = this.neighbors(v);
        }
        return neighbors.length === 0;
    }
    filterNodes(filter) {
        var copy = new Graph({
            directed: this._isDirected,
            multigraph: this._isMultigraph,
            compound: this._isCompound
        });
        copy.setGraph(this.graph());
        var self = this;
        each(this._nodes, function (value, v) {
            if (filter(v)) {
                copy.setNode(v, value);
            }
        });
        each(this._edgeObjs, function (e) {
            if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
                copy.setEdge(e, self.edge(e));
            }
        });
        var parents = {};
        function findParent(v) {
            var parent = self.parent(v);
            if (parent === undefined || copy.hasNode(parent)) {
                parents[v] = parent;
                return parent;
            }
            else if (parent in parents) {
                return parents[parent];
            }
            else {
                return findParent(parent);
            }
        }
        if (this._isCompound) {
            for (var v of copy.nodes()) {
                copy.setParent(v, findParent(v));
            }
        }
        return copy;
    }
    ;
    setDefaultEdgeLabel(newDefault) {
        function isConstant(x) { return 'function' !== typeof x; }
        if (isConstant(newDefault)) {
            this._defaultEdgeLabelFn = () => (newDefault);
        }
        else {
            this._defaultEdgeLabelFn = newDefault;
        }
        return this;
    }
    edgeCount() {
        return this._edgeCount;
    }
    edges() {
        return Object.values(this._edgeObjs);
    }
    setPath(vs, value) {
        var self = this;
        var args = arguments;
        vs.reduce(function (v, w) {
            if (args.length > 1) {
                self.setEdge(v, w, value);
            }
            else {
                self.setEdge(v, w);
            }
            return w;
        });
        return this;
    }
    ;
    setEdge(v, w, value, name) {
        var valueSpecified = false;
        var arg0 = v;
        if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
            v = arg0.v;
            w = arg0.w;
            name = arg0.name;
            if (arguments.length === 2) {
                value = arguments[1];
                valueSpecified = true;
            }
        }
        else {
            v = arg0;
            w = arguments[1];
            name = arguments[3];
            if (arguments.length > 2) {
                value = arguments[2];
                valueSpecified = true;
            }
        }
        v = "" + v;
        w = "" + w;
        if (!isUndefined(name)) {
            name = "" + name;
        }
        var e = edgeArgsToId(this._isDirected, v, w, name);
        if (has(this._edgeLabels, e)) {
            if (valueSpecified) {
                this._edgeLabels[e] = value;
            }
            return this;
        }
        if (!isUndefined(name) && !this._isMultigraph) {
            throw new Error("Cannot set a named edge when isMultigraph = false");
        }
        this.setNode(v);
        this.setNode(w);
        this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);
        var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
        v = edgeObj.v;
        w = edgeObj.w;
        Object.freeze(edgeObj);
        this._edgeObjs[e] = edgeObj;
        incrementOrInitEntry(this._preds[w], v);
        incrementOrInitEntry(this._sucs[v], w);
        this._in[w][e] = edgeObj;
        this._out[v][e] = edgeObj;
        this._edgeCount++;
        return this;
    }
    edge(v, w, name) {
        var e = (('object' === typeof v)
            ? edgeObjToId(this._isDirected, v)
            : edgeArgsToId(this._isDirected, v, w, name));
        return this._edgeLabels[e];
    }
    hasEdge(v, w, name) {
        var e = (arguments.length === 1
            ? edgeObjToId(this._isDirected, arguments[0])
            : edgeArgsToId(this._isDirected, v, w, name));
        return has(this._edgeLabels, e);
    }
    removeEdge(v, w, name) {
        var e = (('object' === typeof v)
            ? edgeObjToId(this._isDirected, v)
            : edgeArgsToId(this._isDirected, v, w, name));
        var edge = this._edgeObjs[e];
        if (edge) {
            v = edge.v;
            w = edge.w;
            delete this._edgeLabels[e];
            delete this._edgeObjs[e];
            decrementOrRemoveEntry(this._preds[w], v);
            decrementOrRemoveEntry(this._sucs[v], w);
            delete this._in[w][e];
            delete this._out[v][e];
            this._edgeCount--;
        }
        return this;
    }
    inEdges(v, u) {
        var inV = this._in[v];
        if (inV) {
            var edges = Object.values(inV);
            if (!u) {
                return edges;
            }
            return edges.filter(function (edge) { return edge.v === u; });
        }
        return undefined;
    }
    outEdges(v, w) {
        var outV = this._out[v];
        if (outV) {
            var edges = Object.values(outV);
            if (!w) {
                return edges;
            }
            return edges.filter(function (edge) { return edge.w === w; });
        }
        return undefined;
    }
    nodeEdges(v, w) {
        var inEdges = this.inEdges(v, w);
        if (inEdges) {
            return inEdges.concat(this.outEdges(v, w));
        }
        return undefined;
    }
    ;
}
class GraphLike extends Graph {
}
function incrementOrInitEntry(map, k) {
    if (map[k]) {
        map[k]++;
    }
    else {
        map[k] = 1;
    }
}
function decrementOrRemoveEntry(map, k) {
    if (!--map[k]) {
        delete map[k];
    }
}
function edgeArgsToId(isDirected, v_, w_, name) {
    var v = "" + v_;
    var w = "" + w_;
    if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +
        (isUndefined(name) ? DEFAULT_EDGE_NAME : name);
}
function edgeArgsToObj(isDirected, v_, w_, name) {
    var v = "" + v_;
    var w = "" + w_;
    if (!isDirected && v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    var edgeObj = { v: v, w: w };
    if (name) {
        edgeObj.name = name;
    }
    return edgeObj;
}
function edgeObjToId(isDirected, edgeObj) {
    return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

function addDummyNode(g, type, attrs, name) {
    var v;
    do {
        v = uniqueId(name);
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
}
function simplify(g) {
    var simplified = new Graph().setGraph(g.graph());
    for (var v of g.nodes()) {
        simplified.setNode(v, g.node(v));
    }
    for (var e of g.edges()) {
        var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    }
    return simplified;
}
function asNonCompoundGraph(g) {
    var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    for (var v of g.nodes()) {
        if (!g.children(v).length) {
            simplified.setNode(v, g.node(v));
        }
    }
    for (var e of g.edges()) {
        simplified.setEdge(e, g.edge(e));
    }
    return simplified;
}
function successorWeights(g) {
    var result = {};
    for (var v of g.nodes()) {
        var sucs = {};
        for (var e of g.outEdges(v)) {
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
        }
        result[v] = sucs;
    }
    return result;
}
function predecessorWeights(g) {
    var result = {};
    for (var v of g.nodes()) {
        var preds = {};
        for (var e of g.inEdges(v)) {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        }
        result[v] = preds;
    }
    return result;
}
function intersectRect(rect, point) {
    var x = rect.x;
    var y = rect.y;
    var dx = point.x - x;
    var dy = point.y - y;
    var w = rect.width / 2;
    var h = rect.height / 2;
    if (!dx && !dy) {
        throw new Error("Not possible to find intersection inside of the rectangle");
    }
    var sx, sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        if (dy < 0) {
            h = -h;
        }
        sx = h * dx / dy;
        sy = h;
    }
    else {
        if (dx < 0) {
            w = -w;
        }
        sx = w;
        sy = w * dy / dx;
    }
    return { x: x + sx, y: y + sy };
}
function buildLayerMatrix(g) {
    var layering = array(maxRank(g) + 1, () => []);
    for (var v of g.nodes()) {
        var node = g.node(v);
        var rank = node.rank;
        if ((undefined !== rank)) {
            layering[rank][node.order] = v;
        }
    }
    return layering;
}
function normalizeRanks(g) {
    var min = Math.min(...g.nodes().map(v => g.node(v).rank).filter(e => undefined !== e));
    for (var v of g.nodes()) {
        var node = g.node(v);
        if (has(node, "rank")) {
            node.rank -= min;
        }
    }
}
function removeEmptyRanks(g) {
    var offset = Math.min(...g.nodes().map(v => g.node(v).rank).filter(e => undefined !== e));
    var layers = [];
    for (var v of g.nodes()) {
        var rank = g.node(v).rank - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    }
    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor;
    for (var i = 0; i < layers.length; i++) {
        var vs = layers[i];
        if ((undefined === vs) && i % nodeRankFactor !== 0) {
            --delta;
        }
        else if (delta && (vs != undefined)) {
            for (var v of vs) {
                g.node(v).rank += delta;
            }
        }
    }
}
function addBorderNode(g, prefix, rank, order) {
    var node = {
        width: 0,
        height: 0
    };
    if (arguments.length >= 4) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
}
function maxRank(g) {
    var ranks = g.nodes().map(v => g.node(v).rank).filter(e => undefined !== e);
    return Math.max(...ranks);
}
function partition(collection, fn) {
    var lhs = [];
    var rhs = [];
    for (var value of collection) {
        if (fn(value)) {
            lhs.push(value);
        }
        else {
            rhs.push(value);
        }
    }
    return { lhs, rhs };
}
function time(name, fn) {
    var start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log(name + " time: " + (Date.now() - start) + "ms");
    }
}
function notime(name, fn) {
    return fn();
}

var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addDummyNode: addDummyNode,
    simplify: simplify,
    asNonCompoundGraph: asNonCompoundGraph,
    successorWeights: successorWeights,
    predecessorWeights: predecessorWeights,
    intersectRect: intersectRect,
    buildLayerMatrix: buildLayerMatrix,
    normalizeRanks: normalizeRanks,
    removeEmptyRanks: removeEmptyRanks,
    addBorderNode: addBorderNode,
    maxRank: maxRank,
    partition: partition,
    time: time,
    notime: notime
});

function sort(entries, biasRight) {
    var parts = partition(entries, function (entry) {
        return has(entry, "barycenter");
    });
    var sortable = parts.lhs;
    var unsortable = sortBy(parts.rhs, (entry) => -entry.i);
    var vss = [];
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
    var result = { vs: flattenDeep(vss) };
    if (weight) {
        result.barycenter = sum / weight;
        result.weight = weight;
    }
    return result;
}
function consumeUnsortable(vs, unsortable, index) {
    var lastItem;
    while (unsortable.length && (lastItem = last(unsortable)).i <= index) {
        unsortable.pop();
        vs.push(lastItem.vs);
        index++;
    }
    return index;
}
function compareWithBias(bias) {
    return function (entryV, entryW) {
        if (entryV.barycenter < entryW.barycenter) {
            return -1;
        }
        else if (entryV.barycenter > entryW.barycenter) {
            return 1;
        }
        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
    };
}

function sortSubgraph(g, v, cg, biasRight) {
    var movable = g.children(v);
    var node = g.node(v);
    var bl = node ? node.borderLeft : undefined;
    var br = node ? node.borderRight : undefined;
    var subgraphs = {};
    if (bl) {
        movable = movable.filter((w) => w !== bl && w !== br);
    }
    var barycenters = barycenter(g, movable);
    for (var entry of barycenters) {
        if (g.children(entry.v).length) {
            var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
            subgraphs[entry.v] = subgraphResult;
            if (has(subgraphResult, "barycenter")) {
                mergeBarycenters(entry, subgraphResult);
            }
        }
    }
    var entries = resolveConflicts(barycenters, cg);
    expandSubgraphs(entries, subgraphs);
    var result = sort(entries, biasRight);
    if (bl) {
        result.vs = ([bl, ...result.vs, br]);
        if (g.predecessors(bl).length) {
            var blPred = g.node(g.predecessors(bl)[0]);
            var brPred = g.node(g.predecessors(br)[0]);
            if (!has(result, "barycenter")) {
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
function expandSubgraphs(entries, subgraphs) {
    for (var entry of entries) {
        entry.vs = flattenDeep(entry.vs.map(function (v) {
            if (subgraphs[v]) {
                return subgraphs[v].vs;
            }
            return [v];
        }));
    }
}
function mergeBarycenters(target, other) {
    if ((undefined !== target.barycenter)) {
        target.barycenter = (target.barycenter * target.weight +
            other.barycenter * other.weight) /
            (target.weight + other.weight);
        target.weight += other.weight;
    }
    else {
        target.barycenter = other.barycenter;
        target.weight = other.weight;
    }
}

function buildLayerGraph(g, rank, relationship) {
    var root = createRootNode(g);
    var result = new Graph({ compound: true }).setGraph({ root: root })
        .setDefaultNodeLabel(v => g.node(v));
    for (var v of g.nodes()) {
        var node = g.node(v);
        var parent = g.parent(v);
        if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
            result.setNode(v);
            result.setParent(v, parent || root);
            for (var e of g[relationship](v)) {
                var u = e.v === v ? e.w : e.v;
                var edge = result.edge(u, v);
                var weight = (undefined !== edge) ? edge.weight : 0;
                result.setEdge(u, v, { weight: g.edge(e).weight + weight });
            }
            if (has(node, "minRank")) {
                result.setNode(v, {
                    borderLeft: node.borderLeft[rank],
                    borderRight: node.borderRight[rank]
                });
            }
        }
    }
    return result;
}
function createRootNode(g) {
    var v;
    while (g.hasNode((v = uniqueId("_root"))))
        ;
    return v;
}

function addSubgraphConstraints(g, cg, vs) {
    var prev = {};
    var rootPrev;
    for (var v of vs) {
        (function () {
            var child = g.parent(v);
            var prevChild;
            while (child) {
                var parent = g.parent(child);
                if (parent) {
                    prevChild = prev[parent];
                    prev[parent] = child;
                }
                else {
                    prevChild = rootPrev;
                    rootPrev = child;
                }
                if (prevChild && prevChild !== child) {
                    cg.setEdge(prevChild, child);
                    return;
                }
                child = parent;
            }
        })();
    }
}

function order(g) {
    var maximumRank = maxRank(g);
    var downLayerGraphs = buildLayerGraphs(g, range(1, maximumRank + 1), "inEdges");
    var upLayerGraphs = buildLayerGraphs(g, range(maximumRank - 1, -1), "outEdges");
    var layering = initOrder(g);
    assignOrder(g, layering);
    var bestCC = Number.POSITIVE_INFINITY;
    var best;
    for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
        layering = buildLayerMatrix(g);
        var cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = layering.map(layer => layer.slice(0));
            bestCC = cc;
        }
    }
    assignOrder(g, best);
}
function buildLayerGraphs(g, ranks, relationship) {
    return ranks.map(rank => buildLayerGraph(g, rank, relationship));
}
function sweepLayerGraphs(layerGraphs, biasRight) {
    var cg = new Graph();
    for (var lg of layerGraphs) {
        var root = lg.graph().root;
        var sorted = sortSubgraph(lg, root, cg, biasRight);
        sorted.vs.map(function (v, i) {
            lg.node(v).order = i;
        });
        addSubgraphConstraints(lg, cg, sorted.vs);
    }
}
function assignOrder(g, layering) {
    for (var layer of layering) {
        layer.map(function (v, i) {
            g.node(v).order = i;
        });
    }
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    order: order,
    addSubgraphConstraints: addSubgraphConstraints,
    barycenter: barycenter,
    buildLayerGraph: buildLayerGraph,
    crossCount: crossCount,
    initOrder: initOrder,
    resolveConflicts: resolveConflicts,
    sortSubgraph: sortSubgraph,
    sort: sort
});

function findType1Conflicts(g, layering) {
    var conflicts = {};
    function visitLayer(prevLayer, layer) {
        var k0 = 0;
        var scanPos = 0;
        var prevLayerLength = prevLayer.length;
        var lastNode = last(layer);
        for (var i = 0; i < layer.length; i++) {
            var v = layer[i];
            var w = findOtherInnerSegmentNode(g, v);
            var k1 = w ? g.node(w).order : prevLayerLength;
            if (w || v === lastNode) {
                for (var scanNode of layer.slice(scanPos, i + 1)) {
                    for (var u of g.predecessors(scanNode)) {
                        var uLabel = g.node(u);
                        var uPos = uLabel.order;
                        if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
                            addConflict(conflicts, u, scanNode);
                        }
                    }
                }
                scanPos = i + 1;
                k0 = k1;
            }
        }
        return layer;
    }
    layering.reduce(visitLayer);
    return conflicts;
}
function findType2Conflicts(g, layering) {
    var conflicts = {};
    function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
        var v;
        for (var i of range(southPos, southEnd)) {
            v = south[i];
            if (g.node(v).dummy) {
                for (var u of g.predecessors(v)) {
                    var uNode = g.node(u);
                    if (uNode.dummy &&
                        (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
                        addConflict(conflicts, u, v);
                    }
                }
            }
        }
    }
    function visitLayer(north, south) {
        var prevNorthPos = -1;
        var nextNorthPos;
        var southPos = 0;
        for (var i = 0; i < south.length; i++) {
            var southLookahead = i;
            var v = south[i];
            if (v === undefined)
                continue;
            if (g.node(v).dummy === "border") {
                var predecessors = g.predecessors(v);
                if (predecessors.length) {
                    nextNorthPos = g.node(predecessors[0]).order;
                    scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
                    southPos = southLookahead;
                    prevNorthPos = nextNorthPos;
                }
            }
            scan(south, southPos, south.length, nextNorthPos, north.length);
        }
        return south;
    }
    layering.reduce(visitLayer);
    return conflicts;
}
function findOtherInnerSegmentNode(g, v) {
    if (g.node(v).dummy) {
        for (var u of g.predecessors(v)) {
            if (g.node(u).dummy) {
                return u;
            }
        }
    }
    return undefined;
}
function addConflict(conflicts, v, w) {
    if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    var conflictsV = conflicts[v];
    if (!conflictsV) {
        conflicts[v] = conflictsV = {};
    }
    conflictsV[w] = true;
}
function hasConflict(conflicts, v, w) {
    if (v > w) {
        var tmp = v;
        v = w;
        w = tmp;
    }
    return has(conflicts[v], w);
}
function verticalAlignment(g, layering, conflicts, neighborFn) {
    var root = {};
    var align = {};
    var pos = {};
    for (var layer of layering) {
        for (var order = 0; order < layer.length; order++) {
            var v = layer[order];
            root[v] = v;
            align[v] = v;
            pos[v] = order;
        }
    }
    for (var layer of layering) {
        var prevIdx = -1;
        for (var v of layer) {
            var ws = neighborFn(v);
            if (ws.length) {
                ws = sortBy(ws, w => pos[w]);
                var mp = (ws.length - 1) / 2;
                for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
                    var w = ws[i];
                    if (align[v] === v &&
                        prevIdx < pos[w] &&
                        !hasConflict(conflicts, v, w)) {
                        align[w] = v;
                        align[v] = root[v] = root[w];
                        prevIdx = pos[w];
                    }
                }
            }
        }
    }
    return { root: root, align: align };
}
function horizontalCompaction(g, layering, root, align, reverseSep) {
    var xs = {};
    var blockG = buildBlockGraph(g, layering, root, reverseSep);
    var borderType = reverseSep ? "borderLeft" : "borderRight";
    function iterate(setXsFunc, nextNodesFunc) {
        var stack = blockG.nodes();
        var elem = stack.pop();
        var visited = {};
        while (elem) {
            if (visited[elem]) {
                setXsFunc(elem);
            }
            else {
                visited[elem] = true;
                stack.push(elem);
                stack = stack.concat(nextNodesFunc(elem));
            }
            elem = stack.pop();
        }
    }
    function pass1(elem) {
        xs[elem] = blockG.inEdges(elem).reduce(function (acc, e) {
            return Math.max(acc, xs[e.v] + blockG.edge(e));
        }, 0);
    }
    function pass2(elem) {
        var min = blockG.outEdges(elem).reduce(function (acc, e) {
            return Math.min(acc, xs[e.w] - blockG.edge(e));
        }, Number.POSITIVE_INFINITY);
        var node = g.node(elem);
        if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
            xs[elem] = Math.max(xs[elem], min);
        }
    }
    iterate(pass1, (s) => blockG.predecessors(s));
    iterate(pass2, (s) => blockG.successors(s));
    for (var key of Object.keys(align)) {
        var v = align[key];
        xs[v] = xs[root[v]];
    }
    return xs;
}
function buildBlockGraph(g, layering, root, reverseSep) {
    var blockGraph = new Graph();
    var graphLabel = g.graph();
    var sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
    for (var layer of layering) {
        var u = null;
        for (var v of layer) {
            var vRoot = root[v];
            blockGraph.setNode(vRoot);
            if (u) {
                var uRoot = root[u];
                var prevMax = blockGraph.edge(uRoot, vRoot);
                blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }
            u = v;
        }
    }
    return blockGraph;
}
function findSmallestWidthAlignment(g, xss) {
    return minBy(values(xss), function (xs) {
        var max = Number.NEGATIVE_INFINITY;
        var min = Number.POSITIVE_INFINITY;
        for (var v in xs) {
            var x = xs[v];
            var halfWidth = width(g, v) / 2;
            max = Math.max(x + halfWidth, max);
            min = Math.min(x - halfWidth, min);
        }
        return max - min;
    });
}
function alignCoordinates(xss, alignTo) {
    var alignToVals = values(alignTo);
    var alignToMin = Math.min(...alignToVals);
    var alignToMax = Math.max(...alignToVals);
    for (var alignment of ['ul', 'ur', 'dl', 'dr']) {
        var horiz = alignment[1];
        var xs = xss[alignment];
        if (xs === alignTo)
            continue;
        var xsVals = values(xs);
        var delta = horiz === "l" ? alignToMin - Math.min(...xsVals) : alignToMax - Math.max(...xsVals);
        if (delta) {
            xss[alignment] = mapValues(xs, x => x + delta);
        }
    }
}
function balance(xss, align) {
    return mapValues(xss.ul, function (ignore, v) {
        if (align) {
            return xss[align.toLowerCase()][v];
        }
        else {
            var xs = sortBy([xss.ul[v], xss.ur[v], xss.dl[v], xss.dr[v]], e => e);
            return (xs[1] + xs[2]) / 2;
        }
    });
}
function positionX(g) {
    var layering = buildLayerMatrix(g);
    var conflicts = Object.assign(Object.assign({}, findType1Conflicts(g, layering)), findType2Conflicts(g, layering));
    var xss = { ul: {}, ur: {}, dl: {}, dr: {} };
    var adjustedLayering;
    for (var vert of ["u", "d"]) {
        adjustedLayering = vert === "u" ? layering : layering.map(e => e).reverse();
        for (var horiz of ["l", "r"]) {
            if (horiz === "r") {
                adjustedLayering = adjustedLayering.map((inner) => inner.map(e => e).reverse());
            }
            var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
            var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
            if (horiz === "r") {
                xs = mapValues(xs, (x) => -x);
            }
            xss[(vert + horiz)] = xs;
        }
    }
    var smallestWidth = findSmallestWidthAlignment(g, xss);
    alignCoordinates(xss, smallestWidth);
    return balance(xss, g.graph().align);
}
function sep(nodeSep, edgeSep, reverseSep) {
    return function (g, v, w) {
        var vLabel = g.node(v);
        var wLabel = g.node(w);
        var sum = 0;
        var delta;
        sum += vLabel.width / 2;
        if (has(vLabel, "labelpos")) {
            switch (vLabel.labelpos.toLowerCase()) {
                case "l":
                    delta = -vLabel.width / 2;
                    break;
                case "r":
                    delta = vLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += wLabel.width / 2;
        if (has(wLabel, "labelpos")) {
            switch (wLabel.labelpos.toLowerCase()) {
                case "l":
                    delta = wLabel.width / 2;
                    break;
                case "r":
                    delta = -wLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        return sum;
    };
}
function width(g, v) {
    return g.node(v).width;
}

var bk = /*#__PURE__*/Object.freeze({
    __proto__: null,
    findType1Conflicts: findType1Conflicts,
    findType2Conflicts: findType2Conflicts,
    findOtherInnerSegmentNode: findOtherInnerSegmentNode,
    addConflict: addConflict,
    hasConflict: hasConflict,
    verticalAlignment: verticalAlignment,
    horizontalCompaction: horizontalCompaction,
    findSmallestWidthAlignment: findSmallestWidthAlignment,
    alignCoordinates: alignCoordinates,
    balance: balance,
    positionX: positionX,
    sep: sep,
    width: width
});

function position(g) {
    g = asNonCompoundGraph(g);
    positionY(g);
    var posx = positionX(g);
    for (var v in posx) {
        g.node(v).x = posx[v];
    }
}
function positionY(g) {
    var layering = buildLayerMatrix(g);
    var rankSep = g.graph().ranksep;
    var prevY = 0;
    for (var layer of layering) {
        var maxHeight = Math.max(...layer.map(v => g.node(v).height));
        for (var v of layer) {
            g.node(v).y = prevY + maxHeight / 2;
        }
        prevY += maxHeight + rankSep;
    }
}

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    bk: bk,
    position: position
});

function longestPath(g) {
    var visited = {};
    function dfs(v) {
        var label = g.node(v);
        if (has(visited, v)) {
            return label.rank;
        }
        visited[v] = true;
        var rank = Math.min(...g.outEdges(v).map((e) => dfs(e.w) - g.edge(e).minlen));
        if (rank === Number.POSITIVE_INFINITY ||
            rank === undefined ||
            rank === null) {
            rank = 0;
        }
        return (label.rank = rank);
    }
    g.sources().forEach(dfs);
}
function slack(g, e) {
    return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}

function feasibleTree(g) {
    var t = new Graph({ directed: false });
    var start = g.nodes()[0];
    var size = g.nodeCount();
    t.setNode(start, {});
    var edge, delta;
    while (tightTree(g) < size) {
        edge = findMinSlackEdge(g);
        delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
        shiftRanks(g, delta);
    }
    return t;
    function tightTree(g) {
        function dfs(v) {
            for (var e of g.nodeEdges(v)) {
                var edgeV = e.v;
                var w = (v === edgeV) ? e.w : edgeV;
                if (!t.hasNode(w) && !slack(g, e)) {
                    t.setNode(w, {});
                    t.setEdge(v, w, {});
                    dfs(w);
                }
            }
        }
        t.nodes().forEach(dfs);
        return t.nodeCount();
    }
    function findMinSlackEdge(g) {
        return minBy(g.edges(), function (e) {
            if (t.hasNode(e.v) !== t.hasNode(e.w)) {
                return slack(g, e);
            }
            return undefined;
        });
    }
    function shiftRanks(g, delta) {
        for (var v of t.nodes()) {
            g.node(v).rank += delta;
        }
    }
}

function components(g) {
    var visited = {};
    var cmpts = [];
    var cmpt;
    function dfs(v) {
        if (v in visited)
            return;
        visited[v] = true;
        cmpt.push(v);
        for (var a of g.successors(v))
            dfs(a);
        for (var b of g.predecessors(v))
            dfs(b);
    }
    for (var v of g.nodes()) {
        cmpt = [];
        dfs(v);
        if (cmpt.length) {
            cmpts.push(cmpt);
        }
    }
    return cmpts;
}

class PriorityQueue {
    constructor() {
        this._arr = [];
        this._keyIndices = {};
    }
    size() {
        return this._arr.length;
    }
    ;
    keys() {
        return this._arr.map(function (x) { return x.key; });
    }
    ;
    has(key) {
        return (key in this._keyIndices);
    }
    ;
    priority(key) {
        var index = this._keyIndices[key];
        if (index !== undefined) {
            return this._arr[index].priority;
        }
        return undefined;
    }
    ;
    min() {
        if (this.size() === 0) {
            throw new Error("Queue underflow");
        }
        return this._arr[0].key;
    }
    ;
    add(key, priority) {
        var keyIndices = this._keyIndices;
        key = String(key);
        if (!(key in keyIndices)) {
            var arr = this._arr;
            var index = arr.length;
            keyIndices[key] = index;
            arr.push({ key: key, priority: priority });
            this._decrease(index);
            return true;
        }
        return false;
    }
    ;
    removeMin() {
        this._swap(0, this._arr.length - 1);
        var min = this._arr.pop();
        delete this._keyIndices[min.key];
        this._heapify(0);
        return min.key;
    }
    ;
    decrease(key, priority) {
        var index = this._keyIndices[key];
        if (priority > this._arr[index].priority) {
            throw new Error("New priority is greater than current priority. " +
                "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
        }
        this._arr[index].priority = priority;
        this._decrease(index);
    }
    ;
    _heapify(i) {
        var arr = this._arr;
        var l = 2 * i;
        var r = l + 1;
        var largest = i;
        if (l < arr.length) {
            largest = arr[l].priority < arr[largest].priority ? l : largest;
            if (r < arr.length) {
                largest = arr[r].priority < arr[largest].priority ? r : largest;
            }
            if (largest !== i) {
                this._swap(i, largest);
                this._heapify(largest);
            }
        }
    }
    ;
    _decrease(index) {
        var arr = this._arr;
        var priority = arr[index].priority;
        var parent;
        while (index !== 0) {
            parent = index >> 1;
            if (arr[parent].priority < priority) {
                break;
            }
            this._swap(index, parent);
            index = parent;
        }
    }
    ;
    _swap(i, j) {
        var arr = this._arr;
        var keyIndices = this._keyIndices;
        var origArrI = arr[i];
        var origArrJ = arr[j];
        arr[i] = origArrJ;
        arr[j] = origArrI;
        keyIndices[origArrJ.key] = i;
        keyIndices[origArrI.key] = j;
    }
    ;
}

var DEFAULT_WEIGHT_FUNC = () => 1;
function dijkstra(g, source, weightFn, edgeFn) {
    return runDijkstra(g, String(source), weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) { return g.outEdges(v); });
}
function runDijkstra(g, source, weightFn, edgeFn) {
    var results = {};
    var pq = new PriorityQueue();
    var v;
    var vEntry;
    var updateNeighbors = function (edge) {
        var w = edge.v !== v ? edge.v : edge.w;
        var wEntry = results[w];
        var weight = weightFn(edge);
        var distance = vEntry.distance + weight;
        if (weight < 0) {
            throw new Error("dijkstra does not allow negative edge weights. " +
                "Bad edge: " + edge + " Weight: " + weight);
        }
        if (distance < wEntry.distance) {
            wEntry.distance = distance;
            wEntry.predecessor = v;
            pq.decrease(w, distance);
        }
    };
    g.nodes().forEach(function (v) {
        var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
        results[v] = { distance: distance };
        pq.add(v, distance);
    });
    while (pq.size() > 0) {
        v = pq.removeMin();
        vEntry = results[v];
        if (vEntry.distance === Number.POSITIVE_INFINITY) {
            break;
        }
        edgeFn(v).forEach(updateNeighbors);
    }
    return results;
}

function dijkstraAll(g, weightFunc, edgeFunc) {
    var acc = {};
    for (var item of g.nodes()) {
        acc[item] = dijkstra(g, item, weightFunc, edgeFunc);
    }
    return acc;
}

function tarjan(g) {
    var index = 0;
    var stack = [];
    var visited = {};
    var results = [];
    function dfs(v) {
        var entry = visited[v] = {
            onStack: true,
            lowlink: index,
            index: index++
        };
        stack.push(v);
        g.successors(v).forEach(function (w) {
            if (!(w in visited)) {
                dfs(w);
                entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
            }
            else if (visited[w].onStack) {
                entry.lowlink = Math.min(entry.lowlink, visited[w].index);
            }
        });
        if (entry.lowlink === entry.index) {
            var cmpt = [];
            var w;
            do {
                w = stack.pop();
                visited[w].onStack = false;
                cmpt.push(w);
            } while (v !== w);
            results.push(cmpt);
        }
    }
    g.nodes().forEach(function (v) {
        if (!(v in visited)) {
            dfs(v);
        }
    });
    return results;
}

function findCycles(g) {
    return tarjan(g).filter(function (cmpt) {
        return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
    });
}

var DEFAULT_WEIGHT_FUNC$1 = () => 1;
function floydWarshall(g, weightFn, edgeFn) {
    return runFloydWarshall(g, weightFn || DEFAULT_WEIGHT_FUNC$1, edgeFn || function (v) { return g.outEdges(v); });
}
function runFloydWarshall(g, weightFn, edgeFn) {
    var results = {};
    var nodes = g.nodes();
    nodes.forEach(function (v) {
        results[v] = {};
        results[v][v] = { distance: 0 };
        nodes.forEach(function (w) {
            if (v !== w) {
                results[v][w] = { distance: Number.POSITIVE_INFINITY };
            }
        });
        edgeFn(v).forEach(function (edge) {
            var w = edge.v === v ? edge.w : edge.v;
            var d = weightFn(edge);
            results[v][w] = { distance: d, predecessor: v };
        });
    });
    nodes.forEach(function (k) {
        var rowK = results[k];
        nodes.forEach(function (i) {
            var rowI = results[i];
            nodes.forEach(function (j) {
                var ik = rowI[k];
                var kj = rowK[j];
                var ij = rowI[j];
                var altDistance = ik.distance + kj.distance;
                if (altDistance < ij.distance) {
                    ij.distance = altDistance;
                    ij.predecessor = kj.predecessor;
                }
            });
        });
    });
    return results;
}

class CycleException extends Error {
}
function topsort(g) {
    var visited = {};
    var stack = {};
    var results = [];
    function visit(node) {
        if (node in stack) {
            throw new CycleException();
        }
        if (!(node in visited)) {
            stack[node] = true;
            visited[node] = true;
            for (var item of g.predecessors(node)) {
                visit(item);
            }
            delete stack[node];
            results.push(node);
        }
    }
    for (var item of g.sinks()) {
        visit(item);
    }
    if (Object.keys(visited).length !== g.nodeCount()) {
        throw new CycleException();
    }
    return results;
}

function isAcyclic(g) {
    try {
        topsort(g);
    }
    catch (e) {
        if (e instanceof CycleException) {
            return false;
        }
        throw e;
    }
    return true;
}

function dfs(g, vs, order) {
    var nodes = (!Array.isArray(vs)) ? [vs] : vs;
    var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
    var acc = [];
    var visited = {};
    for (var v of nodes) {
        if (!g.hasNode(v)) {
            throw new Error("Graph does not have node: " + v);
        }
        doDfs(g, v, order === "post", visited, navigation, acc);
    }
    return acc;
}
function doDfs(g, v, postorder, visited, navigation, acc) {
    if (!(v in visited)) {
        visited[v] = true;
        if (!postorder) {
            acc.push(v);
        }
        for (var w of navigation(v)) {
            doDfs(g, w, postorder, visited, navigation, acc);
        }
        if (postorder) {
            acc.push(v);
        }
    }
}

function postorder(g, vs) {
    return dfs(g, vs, "post");
}

function preorder(g, vs) {
    return dfs(g, vs, "pre");
}

function prim(g, weightFunc) {
    var result = new GraphLike({});
    var parents = {};
    var pq = new PriorityQueue();
    var v;
    function updateNeighbors(edge) {
        var w = edge.v === v ? edge.w : edge.v;
        var pri = pq.priority(w);
        if (pri !== undefined) {
            var edgeWeight = weightFunc(edge);
            if (edgeWeight < pri) {
                parents[w] = v;
                pq.decrease(w, edgeWeight);
            }
        }
    }
    if (g.nodeCount() === 0) {
        return result;
    }
    for (v of g.nodes()) {
        pq.add(v, Number.POSITIVE_INFINITY);
        result.setNode(v);
    }
    pq.decrease(g.nodes()[0], 0);
    var init = false;
    while (pq.size() > 0) {
        v = pq.removeMin();
        if ((v in parents)) {
            result.setEdge(v, parents[v]);
        }
        else if (init) {
            throw new Error("Input graph is not connected: " + g);
        }
        else {
            init = true;
        }
        g.nodeEdges(v).forEach(updateNeighbors);
    }
    return result;
}

var alg = /*#__PURE__*/Object.freeze({
    __proto__: null,
    components: components,
    dijkstra: dijkstra,
    dijkstraAll: dijkstraAll,
    findCycles: findCycles,
    floydWarshall: floydWarshall,
    isAcyclic: isAcyclic,
    postorder: postorder,
    preorder: preorder,
    prim: prim,
    tarjan: tarjan,
    topsort: topsort
});

networkSimplex.initLowLimValues = initLowLimValues;
networkSimplex.initCutValues = initCutValues;
networkSimplex.calcCutValue = calcCutValue;
networkSimplex.leaveEdge = leaveEdge;
networkSimplex.enterEdge = enterEdge;
networkSimplex.exchangeEdges = exchangeEdges;
function networkSimplex(g) {
    g = simplify(g);
    longestPath(g);
    var t = feasibleTree(g);
    initLowLimValues(t);
    initCutValues(t, g);
    var e, f;
    while ((e = leaveEdge(t))) {
        f = enterEdge(t, g, e);
        exchangeEdges(t, g, e, f);
    }
}
function initCutValues(t, g) {
    var vs = postorder(t, t.nodes());
    vs = vs.slice(0, vs.length - 1);
    for (var v of vs) {
        assignCutValue(t, g, v);
    }
}
function assignCutValue(t, g, child) {
    var childLab = t.node(child);
    var parent = childLab.parent;
    t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
}
function calcCutValue(t, g, child) {
    var childLab = t.node(child);
    var parent = childLab.parent;
    var childIsTail = true;
    var graphEdge = g.edge(child, parent);
    var cutValue = 0;
    if (!graphEdge) {
        childIsTail = false;
        graphEdge = g.edge(parent, child);
    }
    cutValue = graphEdge.weight;
    for (var e of g.nodeEdges(child)) {
        var isOutEdge = e.v === child;
        var other = isOutEdge ? e.w : e.v;
        if (other !== parent) {
            var pointsToHead = isOutEdge === childIsTail;
            var otherWeight = g.edge(e).weight;
            cutValue += pointsToHead ? otherWeight : -otherWeight;
            if (isTreeEdge(t, child, other)) {
                var otherCutValue = t.edge(child, other).cutvalue;
                cutValue += pointsToHead ? -otherCutValue : otherCutValue;
            }
        }
    }
    return cutValue;
}
function initLowLimValues(tree, root) {
    if (arguments.length < 2) {
        root = tree.nodes()[0];
    }
    dfsAssignLowLim(tree, {}, 1, root);
}
function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
    var low = nextLim;
    var label = tree.node(v);
    visited[v] = true;
    for (var w of tree.neighbors(v)) {
        if (!has(visited, w)) {
            nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
        }
    }
    label.low = low;
    label.lim = nextLim++;
    if (parent) {
        label.parent = parent;
    }
    else {
        delete label.parent;
    }
    return nextLim;
}
function leaveEdge(tree) {
    for (var e of tree.edges()) {
        if (tree.edge(e).cutvalue < 0) {
            return e;
        }
    }
    return undefined;
}
function enterEdge(t, g, edge) {
    var v = edge.v;
    var w = edge.w;
    if (!g.hasEdge(v, w)) {
        v = edge.w;
        w = edge.v;
    }
    var vLabel = t.node(v);
    var wLabel = t.node(w);
    var tailLabel = vLabel;
    var flip = false;
    if (vLabel.lim > wLabel.lim) {
        tailLabel = wLabel;
        flip = true;
    }
    var candidates = g.edges().filter(function (edge) {
        return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
            flip !== isDescendant(t, t.node(edge.w), tailLabel);
    });
    return minBy(candidates, (edge) => slack(g, edge));
}
function exchangeEdges(t, g, e, f) {
    var v = e.v;
    var w = e.w;
    t.removeEdge(v, w);
    t.setEdge(f.v, f.w, {});
    initLowLimValues(t);
    initCutValues(t, g);
    updateRanks(t, g);
}
function findRoot(t, g) {
    for (var v of t.nodes())
        if (!g.node(v).parent)
            return v;
    return undefined;
}
function updateRanks(t, g) {
    var root = findRoot(t, g);
    var vs = preorder(t, root);
    vs = vs.slice(1);
    for (var v of vs) {
        var parent = t.node(v).parent;
        var edge = g.edge(v, parent);
        var flipped = false;
        if (!edge) {
            edge = g.edge(parent, v);
            flipped = true;
        }
        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
    }
}
function isTreeEdge(tree, u, v) {
    return tree.hasEdge(u, v);
}
function isDescendant(tree, vLabel, rootLabel) {
    return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
}

function rank(g) {
    switch (g.graph().ranker) {
        case "network-simplex":
            networkSimplexRanker(g);
            break;
        case "tight-tree":
            tightTreeRanker(g);
            break;
        case "longest-path":
            longestPathRanker(g);
            break;
        default: networkSimplexRanker(g);
    }
}
var longestPathRanker = longestPath;
function tightTreeRanker(g) {
    longestPath(g);
    feasibleTree(g);
}
function networkSimplexRanker(g) {
    networkSimplex(g);
}

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    rank: rank,
    tightTreeRanker: tightTreeRanker,
    networkSimplexRanker: networkSimplexRanker,
    networkSimplex: networkSimplex,
    feasibleTree: feasibleTree,
    longestPath: longestPath
});

var DEFAULT_WEIGHT_FN = (e) => (1);
function greedyFAS(g, weightFn) {
    if (g.nodeCount() <= 1) {
        return [];
    }
    var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
    var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    return flattenDeep(results.map((e) => g.outEdges(e.v, e.w)));
}
function doGreedyFAS(g, buckets, zeroIdx) {
    var results = [];
    var sources = buckets[buckets.length - 1];
    var sinks = buckets[0];
    var entry;
    while (g.nodeCount()) {
        while ((entry = sinks.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        while ((entry = sources.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
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
function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
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
function buildState(g, weightFn) {
    var fasGraph = new Graph();
    var maxIn = 0;
    var maxOut = 0;
    for (var v of g.nodes()) {
        fasGraph.setNode(v, { v: v, "in": 0, out: 0 });
    }
    for (var e of g.edges()) {
        var prevWeight = fasGraph.edge(e.v, e.w) || 0;
        var weight = weightFn(e);
        var edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
        maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
    }
    var buckets = array(maxOut + maxIn + 3, () => new List());
    var zeroIdx = maxIn + 1;
    for (var v of fasGraph.nodes()) {
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
    }
    return { graph: fasGraph, buckets: buckets, zeroIdx: zeroIdx };
}
function assignBucket(buckets, zeroIdx, entry) {
    if (!entry.out) {
        buckets[0].enqueue(entry);
    }
    else if (!entry["in"]) {
        buckets[buckets.length - 1].enqueue(entry);
    }
    else {
        buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
    }
}

var acyclic = { run, undo };
function run(g) {
    var fas = (g.graph().acyclicer === "greedy"
        ? greedyFAS(g, weightFn(g))
        : dfsFAS(g));
    for (var e of fas) {
        var label = g.edge(e);
        g.removeEdge(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, uniqueId("rev"));
    }
    function weightFn(g) {
        return function (e) {
            return g.edge(e).weight;
        };
    }
}
function dfsFAS(g) {
    var fas = [];
    var stack = {};
    var visited = {};
    function dfs(v) {
        if (has(visited, v)) {
            return;
        }
        visited[v] = true;
        stack[v] = true;
        for (var e of g.outEdges(v)) {
            if (has(stack, e.w)) {
                fas.push(e);
            }
            else {
                dfs(e.w);
            }
        }
        delete stack[v];
    }
    g.nodes().forEach(dfs);
    return fas;
}
function undo(g) {
    for (var e of g.edges()) {
        var label = g.edge(e);
        if (label.reversed) {
            g.removeEdge(e);
            var forwardName = label.forwardName;
            delete label.reversed;
            delete label.forwardName;
            g.setEdge(e.w, e.v, label, forwardName);
        }
    }
}

function addBorderSegments(g) {
    function dfs(v) {
        var children = g.children(v);
        var node = g.node(v);
        if (children.length) {
            children.forEach(dfs);
        }
        if (has(node, "minRank")) {
            node.borderLeft = [];
            node.borderRight = [];
            for (var rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; ++rank) {
                addBorderNode$1(g, "borderLeft", "_bl", v, node, rank);
                addBorderNode$1(g, "borderRight", "_br", v, node, rank);
            }
        }
    }
    g.children().forEach(dfs);
}
function addBorderNode$1(g, prop, prefix, sg, sgNode, rank) {
    var label = { width: 0, height: 0, rank: rank, borderType: prop };
    var prev = sgNode[prop][rank - 1];
    var curr = addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);
    if (prev) {
        g.setEdge(prev, curr, { weight: 1 });
    }
}

var coordinateSystem = { adjust, undo: undo$1 };
function adjust(g) {
    var rankDir = g.graph().rankdir.toLowerCase();
    if (rankDir === "lr" || rankDir === "rl") {
        swapWidthHeight(g);
    }
}
function undo$1(g) {
    var rankDir = g.graph().rankdir.toLowerCase();
    if (rankDir === "bt" || rankDir === "rl") {
        reverseY(g);
    }
    if (rankDir === "lr" || rankDir === "rl") {
        swapXY(g);
        swapWidthHeight(g);
    }
}
function swapWidthHeight(g) {
    for (var v of g.nodes()) {
        swapWidthHeightOne(g.node(v));
    }
    for (var e of g.edges()) {
        swapWidthHeightOne(g.edge(e));
    }
}
function swapWidthHeightOne(attrs) {
    var w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
}
function reverseY(g) {
    for (var v of g.nodes()) {
        reverseYOne(g.node(v));
    }
    for (var e of g.edges()) {
        var edge = g.edge(e);
        edge.points.forEach(reverseYOne);
        if (has(edge, "y")) {
            reverseYOne(edge);
        }
    }
}
function reverseYOne(attrs) {
    attrs.y = -attrs.y;
}
function swapXY(g) {
    for (var v of g.nodes()) {
        swapXYOne(g.node(v));
    }
    for (var e of g.edges()) {
        var edge = g.edge(e);
        edge.points.forEach(swapXYOne);
        if (has(edge, "x")) {
            swapXYOne(edge);
        }
    }
}
function swapXYOne(attrs) {
    var x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
}

function debugOrdering(g) {
    var layerMatrix = buildLayerMatrix(g);
    var h = new Graph({ compound: true, multigraph: true }).setGraph({});
    for (var v of g.nodes()) {
        h.setNode(v, { label: v });
        h.setParent(v, "layer" + g.node(v).rank);
    }
    for (var e of g.edges()) {
        h.setEdge(e.v, e.w, {}, e.name);
    }
    var i = 0;
    for (var layer of layerMatrix) {
        var layerV = "layer" + i;
        i++;
        h.setNode(layerV, { rank: "same" });
        layer.reduce(function (u, v) {
            h.setEdge(u.toString(), v, { style: "invis" });
            return v;
        });
    }
    return h;
}

var debug = /*#__PURE__*/Object.freeze({
    __proto__: null,
    debugOrdering: debugOrdering
});

var normalize = { run: run$1, undo: undo$2 };
function run$1(g) {
    g.graph().dummyChains = [];
    for (var edge of g.edges()) {
        normalizeEdge(g, edge);
    }
}
function normalizeEdge(g, e) {
    var v = e.v;
    var vRank = g.node(v).rank;
    var w = e.w;
    var wRank = g.node(w).rank;
    var name = e.name;
    var edgeLabel = g.edge(e);
    var labelRank = edgeLabel.labelRank;
    if (wRank === vRank + 1)
        return;
    g.removeEdge(e);
    var dummy;
    var attrs;
    var i;
    for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
        edgeLabel.points = [];
        attrs = {
            width: 0,
            height: 0,
            edgeLabel: edgeLabel,
            edgeObj: e,
            rank: vRank
        };
        dummy = addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            attrs.dummy = "edge-label";
            attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
        if (i === 0) {
            g.graph().dummyChains.push(dummy);
        }
        v = dummy;
    }
    g.setEdge(v, w, { weight: edgeLabel.weight }, name);
}
function undo$2(g) {
    for (var v of g.graph().dummyChains) {
        var node = g.node(v);
        var origLabel = node.edgeLabel;
        var w;
        g.setEdge(node.edgeObj, origLabel);
        while (node.dummy) {
            w = g.successors(v)[0];
            g.removeNode(v);
            origLabel.points.push({ x: node.x, y: node.y });
            if (node.dummy === "edge-label") {
                origLabel.x = node.x;
                origLabel.y = node.y;
                origLabel.width = node.width;
                origLabel.height = node.height;
            }
            v = w;
            node = g.node(v);
        }
    }
}

function parentDummyChains(g) {
    var postorderNums = postorder$1(g);
    for (var v of g.graph().dummyChains) {
        var node = g.node(v);
        var edgeObj = node.edgeObj;
        var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        var path = pathData.path;
        var lca = pathData.lca;
        var pathIdx = 0;
        var pathV = path[pathIdx];
        var ascending = true;
        while (v !== edgeObj.w) {
            node = g.node(v);
            if (ascending) {
                while ((pathV = path[pathIdx]) !== lca &&
                    g.node(pathV).maxRank < node.rank) {
                    pathIdx++;
                }
                if (pathV === lca) {
                    ascending = false;
                }
            }
            if (!ascending) {
                while (pathIdx < path.length - 1 &&
                    g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
                    pathIdx++;
                }
                pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            v = g.successors(v)[0];
        }
    }
}
function findPath(g, postorderNums, v, w) {
    var vPath = [];
    var wPath = [];
    var low = Math.min(postorderNums[v].low, postorderNums[w].low);
    var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
    var parent;
    var lca;
    parent = v;
    do {
        parent = g.parent(parent);
        vPath.push(parent);
    } while (parent &&
        (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
    lca = parent;
    parent = w;
    while ((parent = g.parent(parent)) !== lca) {
        wPath.push(parent);
    }
    return { path: vPath.concat(wPath.reverse()), lca: lca };
}
function postorder$1(g) {
    var result = {};
    var lim = 0;
    function dfs(v) {
        var low = lim;
        g.children(v).forEach(dfs);
        result[v] = { low: low, lim: lim++ };
    }
    g.children().forEach(dfs);
    return result;
}

var nestingGraph = { run: run$2, cleanup };
function run$2(g) {
    var root = addDummyNode(g, "root", {}, "_root");
    var depths = treeDepths(g);
    var height = Math.max(...values(depths)) - 1;
    var nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;
    for (var e of g.edges()) {
        g.edge(e).minlen *= nodeSep;
    }
    var weight = sumWeights(g) + 1;
    for (var child of g.children()) {
        dfs$1(g, root, nodeSep, weight, height, depths, child);
    }
    g.graph().nodeRankFactor = nodeSep;
}
function dfs$1(g, root, nodeSep, weight, height, depths, v) {
    var children = g.children(v);
    if (!children.length) {
        if (v !== root) {
            g.setEdge(root, v, { weight: 0, minlen: nodeSep });
        }
        return;
    }
    var top = addBorderNode(g, "_bt");
    var bottom = addBorderNode(g, "_bb");
    var label = g.node(v);
    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;
    for (var child of children) {
        dfs$1(g, root, nodeSep, weight, height, depths, child);
        var childNode = g.node(child);
        var childTop = childNode.borderTop ? childNode.borderTop : child;
        var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        var thisWeight = childNode.borderTop ? weight : 2 * weight;
        var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
            weight: thisWeight,
            minlen: minlen,
            nestingEdge: true
        });
        g.setEdge(childBottom, bottom, {
            weight: thisWeight,
            minlen: minlen,
            nestingEdge: true
        });
    }
    if (!g.parent(v)) {
        g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
    }
}
function treeDepths(g) {
    var depths = {};
    function dfs(v, depth) {
        var children = g.children(v);
        if (children && children.length) {
            for (var child of children) {
                dfs(child, depth + 1);
            }
        }
        depths[v] = depth;
    }
    for (var child of g.children()) {
        dfs(child, 1);
    }
    return depths;
}
function sumWeights(g) {
    return g.edges().reduce((acc, e) => acc + g.edge(e).weight, 0);
}
function cleanup(g) {
    var graphLabel = g.graph();
    g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;
    for (var e of g.edges()) {
        var edge = g.edge(e);
        if (edge.nestingEdge) {
            g.removeEdge(e);
        }
    }
}

function isEdgeProxy(node) {
    return node.dummy == 'edge-proxy';
}
function isSelfEdge(node) {
    return node.dummy == 'selfedge';
}
function layout(g, opts) {
    var time$1 = opts && opts.debugTiming ? time : notime;
    time$1("layout", function () {
        var layoutGraph = time$1("  buildLayoutGraph", function () { return buildLayoutGraph(g); });
        time$1("  runLayout", function () { runLayout(layoutGraph, time$1); });
        time$1("  updateInputGraph", function () { updateInputGraph(g, layoutGraph); });
    });
}
function runLayout(g, time) {
    time("    makeSpaceForEdgeLabels", function () { makeSpaceForEdgeLabels(g); });
    time("    removeSelfEdges", function () { removeSelfEdges(g); });
    time("    acyclic", function () { acyclic.run(g); });
    time("    nestingGraph.run", function () { nestingGraph.run(g); });
    time("    rank", function () { rank(asNonCompoundGraph(g)); });
    time("    injectEdgeLabelProxies", function () { injectEdgeLabelProxies(g); });
    time("    removeEmptyRanks", function () { removeEmptyRanks(g); });
    time("    nestingGraph.cleanup", function () { nestingGraph.cleanup(g); });
    time("    normalizeRanks", function () { normalizeRanks(g); });
    time("    assignRankMinMax", function () { assignRankMinMax(g); });
    time("    removeEdgeLabelProxies", function () { removeEdgeLabelProxies(g); });
    time("    normalize.run", function () { normalize.run(g); });
    time("    parentDummyChains", function () { parentDummyChains(g); });
    time("    addBorderSegments", function () { addBorderSegments(g); });
    time("    order", function () { order(g); });
    time("    insertSelfEdges", function () { insertSelfEdges(g); });
    time("    adjustCoordinateSystem", function () { coordinateSystem.adjust(g); });
    time("    position", function () { position(g); });
    time("    positionSelfEdges", function () { positionSelfEdges(g); });
    time("    removeBorderNodes", function () { removeBorderNodes(g); });
    time("    normalize.undo", function () { normalize.undo(g); });
    time("    fixupEdgeLabelCoords", function () { fixupEdgeLabelCoords(g); });
    time("    undoCoordinateSystem", function () { coordinateSystem.undo(g); });
    time("    translateGraph", function () { translateGraph(g); });
    time("    assignNodeIntersects", function () { assignNodeIntersects(g); });
    time("    reversePoints", function () { reversePointsForReversedEdges(g); });
    time("    acyclic.undo", function () { acyclic.undo(g); });
}
function updateInputGraph(inputGraph, layoutGraph) {
    for (var v of inputGraph.nodes()) {
        var inputLabel = inputGraph.node(v);
        var layoutLabel = layoutGraph.node(v);
        if (inputLabel) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
            if (layoutGraph.children(v).length) {
                inputLabel.width = layoutLabel.width;
                inputLabel.height = layoutLabel.height;
            }
        }
    }
    for (var e of inputGraph.edges()) {
        var inputEdgeLabel = inputGraph.edge(e);
        var layoutEdgeLabel = layoutGraph.edge(e);
        inputEdgeLabel.points = layoutEdgeLabel.points;
        if (has(layoutEdgeLabel, "x")) {
            inputEdgeLabel.x = layoutEdgeLabel.x;
            inputEdgeLabel.y = layoutEdgeLabel.y;
        }
    }
    inputGraph.graph().width = layoutGraph.graph().width;
    inputGraph.graph().height = layoutGraph.graph().height;
}
var tb = 'tb';
var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: tb };
var edgeDefaults = {
    minlen: 1, weight: 1, width: 0, height: 0,
    labeloffset: 10, labelpos: "r"
};
function buildLayoutGraph(inputGraph) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var g = new Graph({ multigraph: true, compound: true });
    var graph = canonicalize(inputGraph.graph());
    var layoutGraphConfig = {
        nodesep: ((_a = graph.nodesep) !== null && _a !== void 0 ? _a : graphDefaults.nodesep),
        edgesep: ((_b = graph.edgesep) !== null && _b !== void 0 ? _b : graphDefaults.edgesep),
        ranksep: ((_c = graph.ranksep) !== null && _c !== void 0 ? _c : graphDefaults.ranksep),
        marginx: +((_d = graph.marginx) !== null && _d !== void 0 ? _d : 0),
        marginy: +((_e = graph.marginy) !== null && _e !== void 0 ? _e : 0),
        acyclicer: graph.acyclicer,
        ranker: (_f = graph.ranker) !== null && _f !== void 0 ? _f : 'network-simplex',
        rankdir: (_g = graph.rankdir) !== null && _g !== void 0 ? _g : graphDefaults.rankdir,
        align: graph.align,
    };
    g.setGraph(layoutGraphConfig);
    for (var v of inputGraph.nodes()) {
        var node = canonicalize(inputGraph.node(v));
        var layoutNode = {
            width: +((_h = (node && node.width)) !== null && _h !== void 0 ? _h : 0),
            height: +((_j = (node && node.height)) !== null && _j !== void 0 ? _j : 0)
        };
        g.setNode(v, layoutNode);
        g.setParent(v, inputGraph.parent(v));
    }
    for (var e of inputGraph.edges()) {
        var edge = canonicalize(inputGraph.edge(e));
        var layoutEdge = {
            minlen: ((_k = edge.minlen) !== null && _k !== void 0 ? _k : edgeDefaults.minlen),
            weight: ((_l = edge.weight) !== null && _l !== void 0 ? _l : edgeDefaults.weight),
            width: ((_m = edge.width) !== null && _m !== void 0 ? _m : edgeDefaults.width),
            height: ((_o = edge.height) !== null && _o !== void 0 ? _o : edgeDefaults.height),
            labeloffset: ((_p = edge.labeloffset) !== null && _p !== void 0 ? _p : edgeDefaults.labeloffset),
            labelpos: (_q = edge.labelpos) !== null && _q !== void 0 ? _q : edgeDefaults.labelpos
        };
        g.setEdge(e, layoutEdge);
    }
    return g;
}
function makeSpaceForEdgeLabels(g) {
    var graph = g.graph();
    graph.ranksep /= 2;
    for (var e of g.edges()) {
        var edge = g.edge(e);
        edge.minlen *= 2;
        if (edge.labelpos.toLowerCase() !== "c") {
            if (graph.rankdir === "TB" || graph.rankdir === "BT") {
                edge.width += edge.labeloffset;
            }
            else {
                edge.height += edge.labeloffset;
            }
        }
    }
}
function injectEdgeLabelProxies(g) {
    for (var e of g.edges()) {
        var edge = g.edge(e);
        if (edge.width && edge.height) {
            var v = g.node(e.v);
            var w = g.node(e.w);
            var label = { rank: (w.rank - v.rank) / 2 + v.rank, e: e };
            addDummyNode(g, "edge-proxy", label, "_ep");
        }
    }
}
function assignRankMinMax(g) {
    var maxRank = 0;
    for (var v of g.nodes()) {
        var node = g.node(v);
        if (node.borderTop) {
            node.minRank = g.node(node.borderTop).rank;
            node.maxRank = g.node(node.borderBottom).rank;
            maxRank = Math.max(maxRank, node.maxRank);
        }
    }
    g.graph().maxRank = maxRank;
}
function removeEdgeLabelProxies(g) {
    for (var v of g.nodes()) {
        var node = g.node(v);
        if (isEdgeProxy(node)) {
            g.edge(node.e).labelRank = node.rank;
            g.removeNode(v);
        }
    }
}
function translateGraph(g) {
    var _a, _b, _c;
    var minX = Number.POSITIVE_INFINITY;
    var maxX = 0;
    var minY = Number.POSITIVE_INFINITY;
    var maxY = 0;
    var graphLabel = g.graph();
    var marginX = (_a = graphLabel.marginx) !== null && _a !== void 0 ? _a : 0;
    var marginY = (_b = graphLabel.marginy) !== null && _b !== void 0 ? _b : 0;
    function getExtremes(attrs) {
        var x = attrs.x;
        var y = attrs.y;
        var w = attrs.width;
        var h = attrs.height;
        minX = Math.min(minX, x - w / 2);
        maxX = Math.max(maxX, x + w / 2);
        minY = Math.min(minY, y - h / 2);
        maxY = Math.max(maxY, y + h / 2);
    }
    for (var v of g.nodes()) {
        getExtremes(g.node(v));
    }
    for (var e of g.edges()) {
        var edge = g.edge(e);
        if (has(edge, "x")) {
            getExtremes(edge);
        }
    }
    minX -= marginX;
    minY -= marginY;
    for (var v of g.nodes()) {
        var node = g.node(v);
        node.x -= minX;
        node.y -= minY;
    }
    for (var e of g.edges()) {
        var edge = g.edge(e);
        for (var p of (_c = edge.points) !== null && _c !== void 0 ? _c : []) {
            p.x -= minX;
            p.y -= minY;
        }
        if (edge.hasOwnProperty("x")) {
            edge.x -= minX;
        }
        if (edge.hasOwnProperty("y")) {
            edge.y -= minY;
        }
    }
    graphLabel.width = maxX - minX + marginX;
    graphLabel.height = maxY - minY + marginY;
}
function assignNodeIntersects(g) {
    for (var e of g.edges()) {
        var edge = g.edge(e);
        var nodeV = g.node(e.v);
        var nodeW = g.node(e.w);
        var p1;
        var p2;
        if (!edge.points) {
            edge.points = [];
            p1 = nodeW;
            p2 = nodeV;
        }
        else {
            p1 = edge.points[0];
            p2 = edge.points[edge.points.length - 1];
        }
        edge.points.unshift(intersectRect(nodeV, p1));
        edge.points.push(intersectRect(nodeW, p2));
    }
}
function fixupEdgeLabelCoords(g) {
    for (var e of g.edges()) {
        var edge = g.edge(e);
        if (has(edge, "x")) {
            if (edge.labelpos === "l" || edge.labelpos === "r") {
                edge.width -= edge.labeloffset;
            }
            switch (edge.labelpos) {
                case "l":
                    edge.x -= edge.width / 2 + edge.labeloffset;
                    break;
                case "r":
                    edge.x += edge.width / 2 + edge.labeloffset;
                    break;
            }
        }
    }
}
function reversePointsForReversedEdges(g) {
    for (var e of g.edges()) {
        var edge = g.edge(e);
        if (edge.reversed) {
            edge.points.reverse();
        }
    }
}
function removeBorderNodes(g) {
    for (var v of g.nodes()) {
        if (g.children(v).length) {
            var node = g.node(v);
            var t = g.node(node.borderTop);
            var b = g.node(node.borderBottom);
            var l = g.node(last(node.borderLeft));
            var r = g.node(last(node.borderRight));
            node.width = Math.abs(r.x - l.x);
            node.height = Math.abs(b.y - t.y);
            node.x = l.x + node.width / 2;
            node.y = t.y + node.height / 2;
        }
    }
    for (var v of g.nodes()) {
        if (g.node(v).dummy === "border") {
            g.removeNode(v);
        }
    }
}
function removeSelfEdges(g) {
    for (var e of g.edges()) {
        if (e.v === e.w) {
            var node = g.node(e.v);
            if (!node.selfEdges) {
                node.selfEdges = [];
            }
            node.selfEdges.push({ e: e, label: g.edge(e) });
            g.removeEdge(e);
        }
    }
}
function insertSelfEdges(g) {
    var _a;
    var layers = buildLayerMatrix(g);
    for (var layer of layers) {
        var orderShift = 0;
        for (var i = 0; i < layer.length; i++) {
            var v = layer[i];
            var node = g.node(v);
            node.order = i + orderShift;
            for (var selfEdge of (_a = node.selfEdges) !== null && _a !== void 0 ? _a : []) {
                addDummyNode(g, "selfedge", {
                    width: selfEdge.label.width,
                    height: selfEdge.label.height,
                    rank: node.rank,
                    order: i + (++orderShift),
                    e: selfEdge.e,
                    label: selfEdge.label
                }, "_se");
            }
            delete node.selfEdges;
        }
    }
}
function positionSelfEdges(g) {
    for (var v of g.nodes()) {
        var node = g.node(v);
        if (isSelfEdge(node)) {
            var selfNode = g.node(node.e.v);
            var x = selfNode.x + selfNode.width / 2;
            var y = selfNode.y;
            var dx = node.x - x;
            var dy = selfNode.height / 2;
            g.setEdge(node.e, node.label);
            g.removeNode(v);
            node.label.points = [
                { x: x + 2 * dx / 3, y: y - dy },
                { x: x + 5 * dx / 6, y: y - dy },
                { x: x + dx, y: y },
                { x: x + 5 * dx / 6, y: y + dy },
                { x: x + 2 * dx / 3, y: y + dy }
            ];
            node.label.x = node.x;
            node.label.y = node.y;
        }
    }
}
function canonicalize(attrs = {}) {
    var newAttrs = {};
    for (var key of Object.keys(attrs)) {
        newAttrs[key.toLowerCase()] = attrs[key];
    }
    return newAttrs;
}

var version = "0.1.3";

function write(g) {
    var json = {
        options: {
            directed: g.isDirected(),
            multigraph: g.isMultigraph(),
            compound: g.isCompound()
        },
        nodes: writeNodes(g),
        edges: writeEdges(g)
    };
    if (!(undefined === g.graph())) {
        json.value = JSON.parse(JSON.stringify(g.graph()));
    }
    return json;
}
function writeNodes(g) {
    return g.nodes().map(function (v) {
        var nodeValue = g.node(v);
        var parent = g.parent(v);
        var node = { v: v };
        if (!(undefined === nodeValue)) {
            node.value = nodeValue;
        }
        if (!(undefined === parent)) {
            node.parent = parent;
        }
        return node;
    });
}
function writeEdges(g) {
    return g.edges().map(function (e) {
        var edgeValue = g.edge(e);
        var edge = { v: e.v, w: e.w };
        if (!(undefined === e.name)) {
            edge.name = e.name;
        }
        if (!(undefined === edgeValue)) {
            edge.value = edgeValue;
        }
        return edge;
    });
}
function read(json) {
    var g = new Graph(json.options).setGraph(json.value);
    for (var entry of json.nodes) {
        g.setNode(entry.v, entry.value);
        if (entry.parent) {
            g.setParent(entry.v, entry.parent);
        }
    }
    for (var entry of json.edges) {
        g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
    }
    return g;
}

var json = /*#__PURE__*/Object.freeze({
    __proto__: null,
    write: write,
    read: read
});

var graphlib = {
    Graph,
    GraphLike,
    alg,
    json,
    PriorityQueue
};

module.exports.Graph = Graph;
module.exports.GraphLike = GraphLike;
module.exports.PriorityQueue = PriorityQueue;
module.exports.acyclic = acyclic;
module.exports.addBorderSegments = addBorderSegments;
module.exports.alg = alg;
module.exports.coordinateSystem = coordinateSystem;
module.exports.data = list;
module.exports.debug = debug;
module.exports.graphlib = graphlib;
module.exports.greedyFAS = greedyFAS;
module.exports.json = json;
module.exports.layout = layout;
module.exports.nestingGraph = nestingGraph;
module.exports.normalize = normalize;
module.exports.order = index;
module.exports.parentDummyChains = parentDummyChains;
module.exports.position = index$1;
module.exports.rank = index$2;
module.exports.util = util;
module.exports.version = version;
