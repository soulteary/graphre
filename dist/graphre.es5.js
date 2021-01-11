var graphre=/******/ (() => { // webpackBootstrap
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) {  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var graphre = function () {
  'use strict';

  var List = /*#__PURE__*/function () {
    function List() {
      _classCallCheck(this, List);

      var sentinel = {};
      sentinel._next = sentinel._prev = sentinel;
      this._sentinel = sentinel;
    }

    _createClass(List, [{
      key: "dequeue",
      value: function dequeue() {
        var sentinel = this._sentinel;
        var entry = sentinel._prev;

        if (entry !== sentinel) {
          unlink(entry);
          return entry;
        }

        return undefined;
      }
    }, {
      key: "enqueue",
      value: function enqueue(entry) {
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
    }, {
      key: "toString",
      value: function toString() {
        var strs = [];
        var sentinel = this._sentinel;
        var curr = sentinel._prev;

        while (curr !== sentinel) {
          strs.push(JSON.stringify(curr, filterOutLinks));
          curr = curr._prev;
        }

        return "[" + strs.join(", ") + "]";
      }
    }]);

    return List;
  }();

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
  var idCounter = {};

  function flattenDeep(matrix) {
    var result = [];

    var _iterator = _createForOfIteratorHelper(matrix),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var e = _step.value;
        result.push.apply(result, _toConsumableArray(e));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  }

  function has(object, key) {
    return object != null && object.hasOwnProperty(key);
  }

  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  function mapValues(object, iteratee) {
    object = Object(object);
    var result = {};
    Object.keys(object).forEach(function (key) {
      result[key] = iteratee(object[key], key);
    });
    return result;
  }

  function minBy(list, fn) {
    var minWeight = Number.POSITIVE_INFINITY;
    var minima = undefined;

    var _iterator2 = _createForOfIteratorHelper(list),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var e = _step2.value;
        var weight = fn(e);

        if (weight < minWeight) {
          minWeight = weight;
          minima = e;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return minima;
  }

  function range(start, end) {
    var step = start < end ? 1 : -1;
    var index = -1;
    var length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    var result = new Array(length);

    while (length--) {
      result[++index] = start;
      start += step;
    }

    return result;
  }

  function sortBy(list, fn) {
    return list.slice().sort(function (a, b) {
      return fn(a) - fn(b);
    });
  }

  function uniqueId(prefix) {
    if (!idCounter[prefix]) {
      idCounter[prefix] = 0;
    }

    var id = ++idCounter[prefix];
    return "".concat(prefix).concat(id);
  }

  function values(object) {
    return object ? Object.keys(object).map(function (e) {
      return object[e];
    }) : [];
  }

  function array(count, factory) {
    var output = [];

    for (var i = 0; i < count; i++) {
      output.push(factory());
    }

    return output;
  }

  function isUndefined(item) {
    return undefined === item;
  }

  function each(obj, action) {
    for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      action(obj[key], key);
    }
  }

  function isEmpty(obj) {
    return 0 === Object.keys(obj).length;
  }

  function union(a, b) {
    var output = _toConsumableArray(a);

    var _iterator3 = _createForOfIteratorHelper(b),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var item = _step3.value;

        if (output.indexOf(item) === -1) {
          output.push(item);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return output;
  }

  function initOrder(g) {
    var visited = {};
    var simpleNodes = g.nodes().filter(function (v) {
      return !g.children(v).length;
    });
    var maxRank = Math.max.apply(Math, _toConsumableArray(simpleNodes.map(function (v) {
      return g.node(v).rank;
    })));
    var layers = array(maxRank + 1, function () {
      return [];
    });

    function dfs(v) {
      if (has(visited, v)) return;
      visited[v] = true;
      var node = g.node(v);
      layers[node.rank].push(v);
      g.successors(v).forEach(dfs);
    }

    var orderedVs = sortBy(simpleNodes, function (v) {
      return g.node(v).rank;
    });
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
        return {
          pos: southPos[e.w],
          weight: g.edge(e).weight
        };
      }), function (e) {
        return e.pos;
      });
    }));
    var firstIndex = 1;

    while (firstIndex < southLayer.length) {
      firstIndex <<= 1;
    }

    var treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    var tree = array(treeSize, function () {
      return 0;
    });
    var cc = 0;
    southEntries.forEach(function (entry) {
      var index = entry.pos + firstIndex;
      tree[index] += entry.weight;
      var weightSum = 0;

      while (index > 0) {
        if (index % 2) {
          weightSum += tree[index + 1];
        }

        index = index - 1 >> 1;
        tree[index] += entry.weight;
      }

      cc += entry.weight * weightSum;
    });
    return cc;
  }

  function barycenter(g, movable) {
    if (!movable) return [];
    return movable.map(function (v) {
      var inV = g.inEdges(v);

      if (!inV['length']) {
        return {
          v: v
        };
      } else {
        var result = inV.reduce(function (acc, e) {
          var edge = g.edge(e);
          var nodeU = g.node(e.v);
          return {
            sum: acc.sum + edge.weight * nodeU.order,
            weight: acc.weight + edge.weight
          };
        }, {
          sum: 0,
          weight: 0
        });
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

      if (undefined !== entry.barycenter) {
        tmp.barycenter = entry.barycenter;
        tmp.weight = entry.weight;
      }
    }

    var _iterator4 = _createForOfIteratorHelper(cg.edges()),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var e = _step4.value;
        var entryV = mappedEntries[e.v];
        var entryW = mappedEntries[e.w];

        if (undefined !== entryV && undefined !== entryW) {
          entryW.indegree++;
          entryV.out.push(mappedEntries[e.w]);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var sourceSet = values(mappedEntries).filter(function (e) {
      return !e.indegree;
    });
    return doResolveConflicts(sourceSet);
  }

  function doResolveConflicts(sourceSet) {
    var entries = [];

    function handleIn(vEntry) {
      return function (uEntry) {
        if (uEntry.merged) {
          return;
        }

        if (undefined === uEntry.barycenter || undefined === vEntry.barycenter || uEntry.barycenter >= vEntry.barycenter) {
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

    return entries.filter(function (e) {
      return !e.merged;
    }).map(function (entry) {
      var xentry = {
        vs: entry.vs,
        i: entry.i
      };
      if ('barycenter' in entry) xentry.barycenter = entry.barycenter;
      if ('weight' in entry) xentry.weight = entry.weight;
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

  var Graph = /*#__PURE__*/function () {
    function Graph() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Graph);

      this._label = undefined;
      this._nodeCount = 0;
      this._edgeCount = 0;
      this._isDirected = has(opts, "directed") ? opts.directed : true;
      this._isMultigraph = has(opts, "multigraph") ? opts.multigraph : false;
      this._isCompound = has(opts, "compound") ? opts.compound : false;

      this._defaultNodeLabelFn = function () {
        return undefined;
      };

      this._defaultEdgeLabelFn = function () {
        return undefined;
      };

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

    _createClass(Graph, [{
      key: "isDirected",
      value: function isDirected() {
        return this._isDirected;
      }
    }, {
      key: "isMultigraph",
      value: function isMultigraph() {
        return this._isMultigraph;
      }
    }, {
      key: "isCompound",
      value: function isCompound() {
        return this._isCompound;
      }
    }, {
      key: "setGraph",
      value: function setGraph(label) {
        this._label = label;
        return this;
      }
    }, {
      key: "graph",
      value: function graph() {
        return this._label;
      }
    }, {
      key: "setDefaultNodeLabel",
      value: function setDefaultNodeLabel(newDefault) {
        function isConstant(x) {
          return 'function' !== typeof x;
        }

        if (isConstant(newDefault)) {
          this._defaultNodeLabelFn = function () {
            return newDefault;
          };
        } else {
          this._defaultNodeLabelFn = newDefault;
        }

        return this;
      }
    }, {
      key: "nodeCount",
      value: function nodeCount() {
        return this._nodeCount;
      }
    }, {
      key: "nodes",
      value: function nodes() {
        return Object.keys(this._nodes);
      }
    }, {
      key: "sources",
      value: function sources() {
        var self = this;
        return this.nodes().filter(function (v) {
          return isEmpty(self._in[v]);
        });
      }
    }, {
      key: "sinks",
      value: function sinks() {
        var self = this;
        return this.nodes().filter(function (v) {
          return isEmpty(self._out[v]);
        });
      }
    }, {
      key: "setNodes",
      value: function setNodes(vs, value) {
        var self = this;

        var _iterator5 = _createForOfIteratorHelper(vs),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var v = _step5.value;

            if (value !== undefined) {
              self.setNode(v, value);
            } else {
              self.setNode(v);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        return this;
      }
    }, {
      key: "setNode",
      value: function setNode(v, value) {
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
    }, {
      key: "node",
      value: function node(v) {
        return this._nodes[v];
      }
    }, {
      key: "hasNode",
      value: function hasNode(v) {
        return has(this._nodes, v);
      }
    }, {
      key: "removeNode",
      value: function removeNode(v) {
        var _this = this;

        var self = this;

        if (has(this._nodes, v)) {
          var removeEdge = function removeEdge(e) {
            self.removeEdge(_this._edgeObjs[e]);
          };

          delete this._nodes[v];

          if (this._isCompound) {
            this._removeFromParentsChildList(v);

            delete this._parent[v];

            var _iterator6 = _createForOfIteratorHelper(this.children(v)),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var child = _step6.value;
                self.setParent(child);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            delete this._children[v];
          }

          for (var _i2 = 0, _Object$keys2 = Object.keys(this._in[v]); _i2 < _Object$keys2.length; _i2++) {
            var key = _Object$keys2[_i2];
            removeEdge(key);
          }

          delete this._in[v];
          delete this._preds[v];

          for (var _i3 = 0, _Object$keys3 = Object.keys(this._out[v]); _i3 < _Object$keys3.length; _i3++) {
            var key = _Object$keys3[_i3];
            removeEdge(key);
          }

          delete this._out[v];
          delete this._sucs[v];
          --this._nodeCount;
        }

        return this;
      }
    }, {
      key: "setParent",
      value: function setParent(v, parent) {
        if (!this._isCompound) {
          throw new Error("Cannot set parent in a non-compound graph");
        }

        if (undefined === parent) {
          parent = GRAPH_NODE;
        } else {
          parent += "";

          for (var ancestor = parent; !isUndefined(ancestor); ancestor = this.parent(ancestor)) {
            if (ancestor === v) {
              throw new Error("Setting ".concat(parent, " as parent of ").concat(v, " would create a cycle"));
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
    }, {
      key: "_removeFromParentsChildList",
      value: function _removeFromParentsChildList(v) {
        delete this._children[this._parent[v]][v];
      }
    }, {
      key: "parent",
      value: function parent(v) {
        if (this._isCompound) {
          var parent = this._parent[v];

          if (parent !== GRAPH_NODE) {
            return parent;
          }
        }

        return undefined;
      }
    }, {
      key: "children",
      value: function children(v) {
        if (isUndefined(v)) {
          v = GRAPH_NODE;
        }

        if (this._isCompound) {
          var children = this._children[v];

          if (children) {
            return Object.keys(children);
          }

          return undefined;
        } else if (v === GRAPH_NODE) {
          return this.nodes();
        } else if (this.hasNode(v)) {
          return [];
        }

        return undefined;
      }
    }, {
      key: "predecessors",
      value: function predecessors(v) {
        var predsV = this._preds[v];

        if (predsV) {
          return Object.keys(predsV);
        }

        return undefined;
      }
    }, {
      key: "successors",
      value: function successors(v) {
        var sucsV = this._sucs[v];

        if (sucsV) {
          return Object.keys(sucsV);
        }

        return undefined;
      }
    }, {
      key: "neighbors",
      value: function neighbors(v) {
        var preds = this.predecessors(v);

        if (preds) {
          return union(preds, this.successors(v));
        }

        return undefined;
      }
    }, {
      key: "isLeaf",
      value: function isLeaf(v) {
        var neighbors;

        if (this.isDirected()) {
          neighbors = this.successors(v);
        } else {
          neighbors = this.neighbors(v);
        }

        return neighbors.length === 0;
      }
    }, {
      key: "filterNodes",
      value: function filterNodes(filter) {
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
          } else if (parent in parents) {
            return parents[parent];
          } else {
            return findParent(parent);
          }
        }

        if (this._isCompound) {
          var _iterator7 = _createForOfIteratorHelper(copy.nodes()),
              _step7;

          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var v = _step7.value;
              copy.setParent(v, findParent(v));
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }

        return copy;
      }
    }, {
      key: "setDefaultEdgeLabel",
      value: function setDefaultEdgeLabel(newDefault) {
        function isConstant(x) {
          return 'function' !== typeof x;
        }

        if (isConstant(newDefault)) {
          this._defaultEdgeLabelFn = function () {
            return newDefault;
          };
        } else {
          this._defaultEdgeLabelFn = newDefault;
        }

        return this;
      }
    }, {
      key: "edgeCount",
      value: function edgeCount() {
        return this._edgeCount;
      }
    }, {
      key: "edges",
      value: function edges() {
        return Object.values(this._edgeObjs);
      }
    }, {
      key: "setPath",
      value: function setPath(vs, value) {
        var self = this;
        var args = arguments;
        vs.reduce(function (v, w) {
          if (args.length > 1) {
            self.setEdge(v, w, value);
          } else {
            self.setEdge(v, w);
          }

          return w;
        });
        return this;
      }
    }, {
      key: "setEdge",
      value: function setEdge(v, w, value, name) {
        var valueSpecified = false;
        var arg0 = v;

        if (_typeof(arg0) === "object" && arg0 !== null && "v" in arg0) {
          v = arg0.v;
          w = arg0.w;
          name = arg0.name;

          if (arguments.length === 2) {
            value = arguments[1];
            valueSpecified = true;
          }
        } else {
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
    }, {
      key: "edge",
      value: function edge(v, w, name) {
        var e = 'object' === _typeof(v) ? edgeObjToId(this._isDirected, v) : edgeArgsToId(this._isDirected, v, w, name);
        return this._edgeLabels[e];
      }
    }, {
      key: "hasEdge",
      value: function hasEdge(v, w, name) {
        var e = arguments.length === 1 ? edgeObjToId(this._isDirected, arguments[0]) : edgeArgsToId(this._isDirected, v, w, name);
        return has(this._edgeLabels, e);
      }
    }, {
      key: "removeEdge",
      value: function removeEdge(v, w, name) {
        var e = 'object' === _typeof(v) ? edgeObjToId(this._isDirected, v) : edgeArgsToId(this._isDirected, v, w, name);
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
    }, {
      key: "inEdges",
      value: function inEdges(v, u) {
        var inV = this._in[v];

        if (inV) {
          var edges = Object.values(inV);

          if (!u) {
            return edges;
          }

          return edges.filter(function (edge) {
            return edge.v === u;
          });
        }

        return undefined;
      }
    }, {
      key: "outEdges",
      value: function outEdges(v, w) {
        var outV = this._out[v];

        if (outV) {
          var edges = Object.values(outV);

          if (!w) {
            return edges;
          }

          return edges.filter(function (edge) {
            return edge.w === w;
          });
        }

        return undefined;
      }
    }, {
      key: "nodeEdges",
      value: function nodeEdges(v, w) {
        var inEdges = this.inEdges(v, w);

        if (inEdges) {
          return inEdges.concat(this.outEdges(v, w));
        }

        return undefined;
      }
    }]);

    return Graph;
  }();

  var GraphLike = /*#__PURE__*/function (_Graph) {
    _inherits(GraphLike, _Graph);

    var _super = _createSuper(GraphLike);

    function GraphLike() {
      _classCallCheck(this, GraphLike);

      return _super.apply(this, arguments);
    }

    return GraphLike;
  }(Graph);

  function incrementOrInitEntry(map, k) {
    if (map[k]) {
      map[k]++;
    } else {
      map[k] = 1;
    }
  }

  function decrementOrRemoveEntry(map, k) {
    if (! --map[k]) {
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

    return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM + (isUndefined(name) ? DEFAULT_EDGE_NAME : name);
  }

  function edgeArgsToObj(isDirected, v_, w_, name) {
    var v = "" + v_;
    var w = "" + w_;

    if (!isDirected && v > w) {
      var tmp = v;
      v = w;
      w = tmp;
    }

    var edgeObj = {
      v: v,
      w: w
    };

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

    var _iterator8 = _createForOfIteratorHelper(g.nodes()),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var v = _step8.value;
        simplified.setNode(v, g.node(v));
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    var _iterator9 = _createForOfIteratorHelper(g.edges()),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var e = _step9.value;
        var simpleLabel = simplified.edge(e.v, e.w) || {
          weight: 0,
          minlen: 1
        };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
          weight: simpleLabel.weight + label.weight,
          minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    return simplified;
  }

  function asNonCompoundGraph(g) {
    var simplified = new Graph({
      multigraph: g.isMultigraph()
    }).setGraph(g.graph());

    var _iterator10 = _createForOfIteratorHelper(g.nodes()),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var v = _step10.value;

        if (!g.children(v).length) {
          simplified.setNode(v, g.node(v));
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    var _iterator11 = _createForOfIteratorHelper(g.edges()),
        _step11;

    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var e = _step11.value;
        simplified.setEdge(e, g.edge(e));
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }

    return simplified;
  }

  function successorWeights(g) {
    var result = {};

    var _iterator12 = _createForOfIteratorHelper(g.nodes()),
        _step12;

    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var v = _step12.value;
        var sucs = {};

        var _iterator13 = _createForOfIteratorHelper(g.outEdges(v)),
            _step13;

        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var e = _step13.value;
            sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }

        result[v] = sucs;
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }

    return result;
  }

  function predecessorWeights(g) {
    var result = {};

    var _iterator14 = _createForOfIteratorHelper(g.nodes()),
        _step14;

    try {
      for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
        var v = _step14.value;
        var preds = {};

        var _iterator15 = _createForOfIteratorHelper(g.inEdges(v)),
            _step15;

        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var e = _step15.value;
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }

        result[v] = preds;
      }
    } catch (err) {
      _iterator14.e(err);
    } finally {
      _iterator14.f();
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
    } else {
      if (dx < 0) {
        w = -w;
      }

      sx = w;
      sy = w * dy / dx;
    }

    return {
      x: x + sx,
      y: y + sy
    };
  }

  function buildLayerMatrix(g) {
    var layering = array(maxRank(g) + 1, function () {
      return [];
    });

    var _iterator16 = _createForOfIteratorHelper(g.nodes()),
        _step16;

    try {
      for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
        var v = _step16.value;
        var node = g.node(v);
        var rank = node.rank;

        if (undefined !== rank) {
          layering[rank][node.order] = v;
        }
      }
    } catch (err) {
      _iterator16.e(err);
    } finally {
      _iterator16.f();
    }

    return layering;
  }

  function normalizeRanks(g) {
    var min = Math.min.apply(Math, _toConsumableArray(g.nodes().map(function (v) {
      return g.node(v).rank;
    }).filter(function (e) {
      return undefined !== e;
    })));

    var _iterator17 = _createForOfIteratorHelper(g.nodes()),
        _step17;

    try {
      for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
        var v = _step17.value;
        var node = g.node(v);

        if (has(node, "rank")) {
          node.rank -= min;
        }
      }
    } catch (err) {
      _iterator17.e(err);
    } finally {
      _iterator17.f();
    }
  }

  function removeEmptyRanks(g) {
    var offset = Math.min.apply(Math, _toConsumableArray(g.nodes().map(function (v) {
      return g.node(v).rank;
    }).filter(function (e) {
      return undefined !== e;
    })));
    var layers = [];

    var _iterator18 = _createForOfIteratorHelper(g.nodes()),
        _step18;

    try {
      for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
        var v = _step18.value;
        var rank = g.node(v).rank - offset;

        if (!layers[rank]) {
          layers[rank] = [];
        }

        layers[rank].push(v);
      }
    } catch (err) {
      _iterator18.e(err);
    } finally {
      _iterator18.f();
    }

    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor;

    for (var i = 0; i < layers.length; i++) {
      var vs = layers[i];

      if (undefined === vs && i % nodeRankFactor !== 0) {
        --delta;
      } else if (delta && vs != undefined) {
        var _iterator19 = _createForOfIteratorHelper(vs),
            _step19;

        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var v = _step19.value;
            g.node(v).rank += delta;
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
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
    var ranks = g.nodes().map(function (v) {
      return g.node(v).rank;
    }).filter(function (e) {
      return undefined !== e;
    });
    return Math.max.apply(Math, _toConsumableArray(ranks));
  }

  function partition(collection, fn) {
    var lhs = [];
    var rhs = [];

    var _iterator20 = _createForOfIteratorHelper(collection),
        _step20;

    try {
      for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
        var value = _step20.value;

        if (fn(value)) {
          lhs.push(value);
        } else {
          rhs.push(value);
        }
      }
    } catch (err) {
      _iterator20.e(err);
    } finally {
      _iterator20.f();
    }

    return {
      lhs: lhs,
      rhs: rhs
    };
  }

  function time(name, fn) {
    var start = Date.now();

    try {
      return fn();
    } finally {
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
    var unsortable = sortBy(parts.rhs, function (entry) {
      return -entry.i;
    });
    var vss = [];
    var sum = 0;
    var weight = 0;
    var vsIndex = 0;
    sortable.sort(compareWithBias(!!biasRight));
    vsIndex = consumeUnsortable(vss, unsortable, vsIndex);

    var _iterator21 = _createForOfIteratorHelper(sortable),
        _step21;

    try {
      for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
        var entry = _step21.value;
        vsIndex += entry.vs.length;
        vss.push(entry.vs);
        sum += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = consumeUnsortable(vss, unsortable, vsIndex);
      }
    } catch (err) {
      _iterator21.e(err);
    } finally {
      _iterator21.f();
    }

    var result = {
      vs: flattenDeep(vss)
    };

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
      } else if (entryV.barycenter > entryW.barycenter) {
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
      movable = movable.filter(function (w) {
        return w !== bl && w !== br;
      });
    }

    var barycenters = barycenter(g, movable);

    var _iterator22 = _createForOfIteratorHelper(barycenters),
        _step22;

    try {
      for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
        var entry = _step22.value;

        if (g.children(entry.v).length) {
          var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
          subgraphs[entry.v] = subgraphResult;

          if (has(subgraphResult, "barycenter")) {
            mergeBarycenters(entry, subgraphResult);
          }
        }
      }
    } catch (err) {
      _iterator22.e(err);
    } finally {
      _iterator22.f();
    }

    var entries = resolveConflicts(barycenters, cg);
    expandSubgraphs(entries, subgraphs);
    var result = sort(entries, biasRight);

    if (bl) {
      result.vs = [bl].concat(_toConsumableArray(result.vs), [br]);

      if (g.predecessors(bl).length) {
        var blPred = g.node(g.predecessors(bl)[0]);
        var brPred = g.node(g.predecessors(br)[0]);

        if (!has(result, "barycenter")) {
          result.barycenter = 0;
          result.weight = 0;
        }

        result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
        result.weight += 2;
      }
    }

    return result;
  }

  function expandSubgraphs(entries, subgraphs) {
    var _iterator23 = _createForOfIteratorHelper(entries),
        _step23;

    try {
      for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
        var entry = _step23.value;
        entry.vs = flattenDeep(entry.vs.map(function (v) {
          if (subgraphs[v]) {
            return subgraphs[v].vs;
          }

          return [v];
        }));
      }
    } catch (err) {
      _iterator23.e(err);
    } finally {
      _iterator23.f();
    }
  }

  function mergeBarycenters(target, other) {
    if (undefined !== target.barycenter) {
      target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
      target.weight += other.weight;
    } else {
      target.barycenter = other.barycenter;
      target.weight = other.weight;
    }
  }

  function buildLayerGraph(g, rank, relationship) {
    var root = createRootNode(g);
    var result = new Graph({
      compound: true
    }).setGraph({
      root: root
    }).setDefaultNodeLabel(function (v) {
      return g.node(v);
    });

    var _iterator24 = _createForOfIteratorHelper(g.nodes()),
        _step24;

    try {
      for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
        var v = _step24.value;
        var node = g.node(v);
        var parent = g.parent(v);

        if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
          result.setNode(v);
          result.setParent(v, parent || root);

          var _iterator25 = _createForOfIteratorHelper(g[relationship](v)),
              _step25;

          try {
            for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
              var e = _step25.value;
              var u = e.v === v ? e.w : e.v;
              var edge = result.edge(u, v);
              var weight = undefined !== edge ? edge.weight : 0;
              result.setEdge(u, v, {
                weight: g.edge(e).weight + weight
              });
            }
          } catch (err) {
            _iterator25.e(err);
          } finally {
            _iterator25.f();
          }

          if (has(node, "minRank")) {
            result.setNode(v, {
              borderLeft: node.borderLeft[rank],
              borderRight: node.borderRight[rank]
            });
          }
        }
      }
    } catch (err) {
      _iterator24.e(err);
    } finally {
      _iterator24.f();
    }

    return result;
  }

  function createRootNode(g) {
    var v;

    while (g.hasNode(v = uniqueId("_root"))) {
      ;
    }

    return v;
  }

  function addSubgraphConstraints(g, cg, vs) {
    var prev = {};
    var rootPrev;

    var _iterator26 = _createForOfIteratorHelper(vs),
        _step26;

    try {
      for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
        var v = _step26.value;

        (function () {
          var child = g.parent(v);
          var prevChild;

          while (child) {
            var parent = g.parent(child);

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
        })();
      }
    } catch (err) {
      _iterator26.e(err);
    } finally {
      _iterator26.f();
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
        best = layering.map(function (layer) {
          return layer.slice(0);
        });
        bestCC = cc;
      }
    }

    assignOrder(g, best);
  }

  function buildLayerGraphs(g, ranks, relationship) {
    return ranks.map(function (rank) {
      return buildLayerGraph(g, rank, relationship);
    });
  }

  function sweepLayerGraphs(layerGraphs, biasRight) {
    var cg = new Graph();

    var _iterator27 = _createForOfIteratorHelper(layerGraphs),
        _step27;

    try {
      for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
        var lg = _step27.value;
        var root = lg.graph().root;
        var sorted = sortSubgraph(lg, root, cg, biasRight);
        sorted.vs.map(function (v, i) {
          lg.node(v).order = i;
        });
        addSubgraphConstraints(lg, cg, sorted.vs);
      }
    } catch (err) {
      _iterator27.e(err);
    } finally {
      _iterator27.f();
    }
  }

  function assignOrder(g, layering) {
    var _iterator28 = _createForOfIteratorHelper(layering),
        _step28;

    try {
      for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
        var layer = _step28.value;
        layer.map(function (v, i) {
          g.node(v).order = i;
        });
      }
    } catch (err) {
      _iterator28.e(err);
    } finally {
      _iterator28.f();
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
          var _iterator29 = _createForOfIteratorHelper(layer.slice(scanPos, i + 1)),
              _step29;

          try {
            for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
              var scanNode = _step29.value;

              var _iterator30 = _createForOfIteratorHelper(g.predecessors(scanNode)),
                  _step30;

              try {
                for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
                  var u = _step30.value;
                  var uLabel = g.node(u);
                  var uPos = uLabel.order;

                  if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
                    addConflict(conflicts, u, scanNode);
                  }
                }
              } catch (err) {
                _iterator30.e(err);
              } finally {
                _iterator30.f();
              }
            }
          } catch (err) {
            _iterator29.e(err);
          } finally {
            _iterator29.f();
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

      var _iterator31 = _createForOfIteratorHelper(range(southPos, southEnd)),
          _step31;

      try {
        for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
          var i = _step31.value;
          v = south[i];

          if (g.node(v).dummy) {
            var _iterator32 = _createForOfIteratorHelper(g.predecessors(v)),
                _step32;

            try {
              for (_iterator32.s(); !(_step32 = _iterator32.n()).done;) {
                var u = _step32.value;
                var uNode = g.node(u);

                if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
                  addConflict(conflicts, u, v);
                }
              }
            } catch (err) {
              _iterator32.e(err);
            } finally {
              _iterator32.f();
            }
          }
        }
      } catch (err) {
        _iterator31.e(err);
      } finally {
        _iterator31.f();
      }
    }

    function visitLayer(north, south) {
      var prevNorthPos = -1;
      var nextNorthPos;
      var southPos = 0;

      for (var i = 0; i < south.length; i++) {
        var southLookahead = i;
        var v = south[i];
        if (v === undefined) continue;

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
      var _iterator33 = _createForOfIteratorHelper(g.predecessors(v)),
          _step33;

      try {
        for (_iterator33.s(); !(_step33 = _iterator33.n()).done;) {
          var u = _step33.value;

          if (g.node(u).dummy) {
            return u;
          }
        }
      } catch (err) {
        _iterator33.e(err);
      } finally {
        _iterator33.f();
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

    var _iterator34 = _createForOfIteratorHelper(layering),
        _step34;

    try {
      for (_iterator34.s(); !(_step34 = _iterator34.n()).done;) {
        var layer = _step34.value;

        for (var order = 0; order < layer.length; order++) {
          var v = layer[order];
          root[v] = v;
          align[v] = v;
          pos[v] = order;
        }
      }
    } catch (err) {
      _iterator34.e(err);
    } finally {
      _iterator34.f();
    }

    var _iterator35 = _createForOfIteratorHelper(layering),
        _step35;

    try {
      for (_iterator35.s(); !(_step35 = _iterator35.n()).done;) {
        var layer = _step35.value;
        var prevIdx = -1;

        var _iterator36 = _createForOfIteratorHelper(layer),
            _step36;

        try {
          for (_iterator36.s(); !(_step36 = _iterator36.n()).done;) {
            var v = _step36.value;
            var ws = neighborFn(v);

            if (ws.length) {
              ws = sortBy(ws, function (w) {
                return pos[w];
              });
              var mp = (ws.length - 1) / 2;

              for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
                var w = ws[i];

                if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
                  align[w] = v;
                  align[v] = root[v] = root[w];
                  prevIdx = pos[w];
                }
              }
            }
          }
        } catch (err) {
          _iterator36.e(err);
        } finally {
          _iterator36.f();
        }
      }
    } catch (err) {
      _iterator35.e(err);
    } finally {
      _iterator35.f();
    }

    return {
      root: root,
      align: align
    };
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
        } else {
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

    iterate(pass1, function (s) {
      return blockG.predecessors(s);
    });
    iterate(pass2, function (s) {
      return blockG.successors(s);
    });

    for (var _i4 = 0, _Object$keys4 = Object.keys(align); _i4 < _Object$keys4.length; _i4++) {
      var key = _Object$keys4[_i4];
      var v = align[key];
      xs[v] = xs[root[v]];
    }

    return xs;
  }

  function buildBlockGraph(g, layering, root, reverseSep) {
    var blockGraph = new Graph();
    var graphLabel = g.graph();
    var sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);

    var _iterator37 = _createForOfIteratorHelper(layering),
        _step37;

    try {
      for (_iterator37.s(); !(_step37 = _iterator37.n()).done;) {
        var layer = _step37.value;
        var u = null;

        var _iterator38 = _createForOfIteratorHelper(layer),
            _step38;

        try {
          for (_iterator38.s(); !(_step38 = _iterator38.n()).done;) {
            var v = _step38.value;
            var vRoot = root[v];
            blockGraph.setNode(vRoot);

            if (u) {
              var uRoot = root[u];
              var prevMax = blockGraph.edge(uRoot, vRoot);
              blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }

            u = v;
          }
        } catch (err) {
          _iterator38.e(err);
        } finally {
          _iterator38.f();
        }
      }
    } catch (err) {
      _iterator37.e(err);
    } finally {
      _iterator37.f();
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
    var alignToMin = Math.min.apply(Math, _toConsumableArray(alignToVals));
    var alignToMax = Math.max.apply(Math, _toConsumableArray(alignToVals));

    for (var _i5 = 0, _arr = ['ul', 'ur', 'dl', 'dr']; _i5 < _arr.length; _i5++) {
      var alignment = _arr[_i5];
      var horiz = alignment[1];
      var xs = xss[alignment];
      if (xs === alignTo) continue;
      var xsVals = values(xs);
      var delta = horiz === "l" ? alignToMin - Math.min.apply(Math, _toConsumableArray(xsVals)) : alignToMax - Math.max.apply(Math, _toConsumableArray(xsVals));

      if (delta) {
        xss[alignment] = mapValues(xs, function (x) {
          return x + delta;
        });
      }
    }
  }

  function balance(xss, align) {
    return mapValues(xss.ul, function (ignore, v) {
      if (align) {
        return xss[align.toLowerCase()][v];
      } else {
        var xs = sortBy([xss.ul[v], xss.ur[v], xss.dl[v], xss.dr[v]], function (e) {
          return e;
        });
        return (xs[1] + xs[2]) / 2;
      }
    });
  }

  function positionX(g) {
    var layering = buildLayerMatrix(g);
    var conflicts = Object.assign(Object.assign({}, findType1Conflicts(g, layering)), findType2Conflicts(g, layering));
    var xss = {
      ul: {},
      ur: {},
      dl: {},
      dr: {}
    };
    var adjustedLayering;

    for (var _i6 = 0, _arr2 = ["u", "d"]; _i6 < _arr2.length; _i6++) {
      var vert = _arr2[_i6];
      adjustedLayering = vert === "u" ? layering : layering.map(function (e) {
        return e;
      }).reverse();

      for (var _i7 = 0, _arr3 = ["l", "r"]; _i7 < _arr3.length; _i7++) {
        var horiz = _arr3[_i7];

        if (horiz === "r") {
          adjustedLayering = adjustedLayering.map(function (inner) {
            return inner.map(function (e) {
              return e;
            }).reverse();
          });
        }

        var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
        var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
        var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");

        if (horiz === "r") {
          xs = mapValues(xs, function (x) {
            return -x;
          });
        }

        xss[vert + horiz] = xs;
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

    var _iterator39 = _createForOfIteratorHelper(layering),
        _step39;

    try {
      for (_iterator39.s(); !(_step39 = _iterator39.n()).done;) {
        var layer = _step39.value;
        var maxHeight = Math.max.apply(Math, _toConsumableArray(layer.map(function (v) {
          return g.node(v).height;
        })));

        var _iterator40 = _createForOfIteratorHelper(layer),
            _step40;

        try {
          for (_iterator40.s(); !(_step40 = _iterator40.n()).done;) {
            var v = _step40.value;
            g.node(v).y = prevY + maxHeight / 2;
          }
        } catch (err) {
          _iterator40.e(err);
        } finally {
          _iterator40.f();
        }

        prevY += maxHeight + rankSep;
      }
    } catch (err) {
      _iterator39.e(err);
    } finally {
      _iterator39.f();
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
      var rank = Math.min.apply(Math, _toConsumableArray(g.outEdges(v).map(function (e) {
        return dfs(e.w) - g.edge(e).minlen;
      })));

      if (rank === Number.POSITIVE_INFINITY || rank === undefined || rank === null) {
        rank = 0;
      }

      return label.rank = rank;
    }

    g.sources().forEach(dfs);
  }

  function slack(g, e) {
    return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
  }

  function feasibleTree(g) {
    var t = new Graph({
      directed: false
    });
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
        var _iterator41 = _createForOfIteratorHelper(g.nodeEdges(v)),
            _step41;

        try {
          for (_iterator41.s(); !(_step41 = _iterator41.n()).done;) {
            var e = _step41.value;
            var edgeV = e.v;
            var w = v === edgeV ? e.w : edgeV;

            if (!t.hasNode(w) && !slack(g, e)) {
              t.setNode(w, {});
              t.setEdge(v, w, {});
              dfs(w);
            }
          }
        } catch (err) {
          _iterator41.e(err);
        } finally {
          _iterator41.f();
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
      var _iterator42 = _createForOfIteratorHelper(t.nodes()),
          _step42;

      try {
        for (_iterator42.s(); !(_step42 = _iterator42.n()).done;) {
          var v = _step42.value;
          g.node(v).rank += delta;
        }
      } catch (err) {
        _iterator42.e(err);
      } finally {
        _iterator42.f();
      }
    }
  }

  function components(g) {
    var visited = {};
    var cmpts = [];
    var cmpt;

    function dfs(v) {
      if (v in visited) return;
      visited[v] = true;
      cmpt.push(v);

      var _iterator43 = _createForOfIteratorHelper(g.successors(v)),
          _step43;

      try {
        for (_iterator43.s(); !(_step43 = _iterator43.n()).done;) {
          var a = _step43.value;
          dfs(a);
        }
      } catch (err) {
        _iterator43.e(err);
      } finally {
        _iterator43.f();
      }

      var _iterator44 = _createForOfIteratorHelper(g.predecessors(v)),
          _step44;

      try {
        for (_iterator44.s(); !(_step44 = _iterator44.n()).done;) {
          var b = _step44.value;
          dfs(b);
        }
      } catch (err) {
        _iterator44.e(err);
      } finally {
        _iterator44.f();
      }
    }

    var _iterator45 = _createForOfIteratorHelper(g.nodes()),
        _step45;

    try {
      for (_iterator45.s(); !(_step45 = _iterator45.n()).done;) {
        var v = _step45.value;
        cmpt = [];
        dfs(v);

        if (cmpt.length) {
          cmpts.push(cmpt);
        }
      }
    } catch (err) {
      _iterator45.e(err);
    } finally {
      _iterator45.f();
    }

    return cmpts;
  }

  var PriorityQueue = /*#__PURE__*/function () {
    function PriorityQueue() {
      _classCallCheck(this, PriorityQueue);

      this._arr = [];
      this._keyIndices = {};
    }

    _createClass(PriorityQueue, [{
      key: "size",
      value: function size() {
        return this._arr.length;
      }
    }, {
      key: "keys",
      value: function keys() {
        return this._arr.map(function (x) {
          return x.key;
        });
      }
    }, {
      key: "has",
      value: function has(key) {
        return key in this._keyIndices;
      }
    }, {
      key: "priority",
      value: function priority(key) {
        var index = this._keyIndices[key];

        if (index !== undefined) {
          return this._arr[index].priority;
        }

        return undefined;
      }
    }, {
      key: "min",
      value: function min() {
        if (this.size() === 0) {
          throw new Error("Queue underflow");
        }

        return this._arr[0].key;
      }
    }, {
      key: "add",
      value: function add(key, priority) {
        var keyIndices = this._keyIndices;
        key = String(key);

        if (!(key in keyIndices)) {
          var arr = this._arr;
          var index = arr.length;
          keyIndices[key] = index;
          arr.push({
            key: key,
            priority: priority
          });

          this._decrease(index);

          return true;
        }

        return false;
      }
    }, {
      key: "removeMin",
      value: function removeMin() {
        this._swap(0, this._arr.length - 1);

        var min = this._arr.pop();

        delete this._keyIndices[min.key];

        this._heapify(0);

        return min.key;
      }
    }, {
      key: "decrease",
      value: function decrease(key, priority) {
        var index = this._keyIndices[key];

        if (priority > this._arr[index].priority) {
          throw new Error("New priority is greater than current priority. " + "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
        }

        this._arr[index].priority = priority;

        this._decrease(index);
      }
    }, {
      key: "_heapify",
      value: function _heapify(i) {
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
    }, {
      key: "_decrease",
      value: function _decrease(index) {
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
    }, {
      key: "_swap",
      value: function _swap(i, j) {
        var arr = this._arr;
        var keyIndices = this._keyIndices;
        var origArrI = arr[i];
        var origArrJ = arr[j];
        arr[i] = origArrJ;
        arr[j] = origArrI;
        keyIndices[origArrJ.key] = i;
        keyIndices[origArrI.key] = j;
      }
    }]);

    return PriorityQueue;
  }();

  var DEFAULT_WEIGHT_FUNC = function DEFAULT_WEIGHT_FUNC() {
    return 1;
  };

  function dijkstra(g, source, weightFn, edgeFn) {
    return runDijkstra(g, String(source), weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
      return g.outEdges(v);
    });
  }

  function runDijkstra(g, source, weightFn, edgeFn) {
    var results = {};
    var pq = new PriorityQueue();
    var v;
    var vEntry;

    var updateNeighbors = function updateNeighbors(edge) {
      var w = edge.v !== v ? edge.v : edge.w;
      var wEntry = results[w];
      var weight = weightFn(edge);
      var distance = vEntry.distance + weight;

      if (weight < 0) {
        throw new Error("dijkstra does not allow negative edge weights. " + "Bad edge: " + edge + " Weight: " + weight);
      }

      if (distance < wEntry.distance) {
        wEntry.distance = distance;
        wEntry.predecessor = v;
        pq.decrease(w, distance);
      }
    };

    g.nodes().forEach(function (v) {
      var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
      results[v] = {
        distance: distance
      };
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

    var _iterator46 = _createForOfIteratorHelper(g.nodes()),
        _step46;

    try {
      for (_iterator46.s(); !(_step46 = _iterator46.n()).done;) {
        var item = _step46.value;
        acc[item] = dijkstra(g, item, weightFunc, edgeFunc);
      }
    } catch (err) {
      _iterator46.e(err);
    } finally {
      _iterator46.f();
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
        } else if (visited[w].onStack) {
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
      return cmpt.length > 1 || cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]);
    });
  }

  var DEFAULT_WEIGHT_FUNC$1 = function DEFAULT_WEIGHT_FUNC$1() {
    return 1;
  };

  function floydWarshall(g, weightFn, edgeFn) {
    return runFloydWarshall(g, weightFn || DEFAULT_WEIGHT_FUNC$1, edgeFn || function (v) {
      return g.outEdges(v);
    });
  }

  function runFloydWarshall(g, weightFn, edgeFn) {
    var results = {};
    var nodes = g.nodes();
    nodes.forEach(function (v) {
      results[v] = {};
      results[v][v] = {
        distance: 0
      };
      nodes.forEach(function (w) {
        if (v !== w) {
          results[v][w] = {
            distance: Number.POSITIVE_INFINITY
          };
        }
      });
      edgeFn(v).forEach(function (edge) {
        var w = edge.v === v ? edge.w : edge.v;
        var d = weightFn(edge);
        results[v][w] = {
          distance: d,
          predecessor: v
        };
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

  var CycleException = /*#__PURE__*/function (_Error) {
    _inherits(CycleException, _Error);

    var _super2 = _createSuper(CycleException);

    function CycleException() {
      _classCallCheck(this, CycleException);

      return _super2.apply(this, arguments);
    }

    return CycleException;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

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

        var _iterator47 = _createForOfIteratorHelper(g.predecessors(node)),
            _step47;

        try {
          for (_iterator47.s(); !(_step47 = _iterator47.n()).done;) {
            var item = _step47.value;
            visit(item);
          }
        } catch (err) {
          _iterator47.e(err);
        } finally {
          _iterator47.f();
        }

        delete stack[node];
        results.push(node);
      }
    }

    var _iterator48 = _createForOfIteratorHelper(g.sinks()),
        _step48;

    try {
      for (_iterator48.s(); !(_step48 = _iterator48.n()).done;) {
        var item = _step48.value;
        visit(item);
      }
    } catch (err) {
      _iterator48.e(err);
    } finally {
      _iterator48.f();
    }

    if (Object.keys(visited).length !== g.nodeCount()) {
      throw new CycleException();
    }

    return results;
  }

  function isAcyclic(g) {
    try {
      topsort(g);
    } catch (e) {
      if (e instanceof CycleException) {
        return false;
      }

      throw e;
    }

    return true;
  }

  function dfs(g, vs, order) {
    var nodes = !Array.isArray(vs) ? [vs] : vs;
    var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
    var acc = [];
    var visited = {};

    var _iterator49 = _createForOfIteratorHelper(nodes),
        _step49;

    try {
      for (_iterator49.s(); !(_step49 = _iterator49.n()).done;) {
        var v = _step49.value;

        if (!g.hasNode(v)) {
          throw new Error("Graph does not have node: " + v);
        }

        doDfs(g, v, order === "post", visited, navigation, acc);
      }
    } catch (err) {
      _iterator49.e(err);
    } finally {
      _iterator49.f();
    }

    return acc;
  }

  function doDfs(g, v, postorder, visited, navigation, acc) {
    if (!(v in visited)) {
      visited[v] = true;

      if (!postorder) {
        acc.push(v);
      }

      var _iterator50 = _createForOfIteratorHelper(navigation(v)),
          _step50;

      try {
        for (_iterator50.s(); !(_step50 = _iterator50.n()).done;) {
          var w = _step50.value;
          doDfs(g, w, postorder, visited, navigation, acc);
        }
      } catch (err) {
        _iterator50.e(err);
      } finally {
        _iterator50.f();
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

    var _iterator51 = _createForOfIteratorHelper(g.nodes()),
        _step51;

    try {
      for (_iterator51.s(); !(_step51 = _iterator51.n()).done;) {
        v = _step51.value;
        pq.add(v, Number.POSITIVE_INFINITY);
        result.setNode(v);
      }
    } catch (err) {
      _iterator51.e(err);
    } finally {
      _iterator51.f();
    }

    pq.decrease(g.nodes()[0], 0);
    var init = false;

    while (pq.size() > 0) {
      v = pq.removeMin();

      if (v in parents) {
        result.setEdge(v, parents[v]);
      } else if (init) {
        throw new Error("Input graph is not connected: " + g);
      } else {
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

    while (e = leaveEdge(t)) {
      f = enterEdge(t, g, e);
      exchangeEdges(t, g, e, f);
    }
  }

  function initCutValues(t, g) {
    var vs = postorder(t, t.nodes());
    vs = vs.slice(0, vs.length - 1);

    var _iterator52 = _createForOfIteratorHelper(vs),
        _step52;

    try {
      for (_iterator52.s(); !(_step52 = _iterator52.n()).done;) {
        var v = _step52.value;
        assignCutValue(t, g, v);
      }
    } catch (err) {
      _iterator52.e(err);
    } finally {
      _iterator52.f();
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

    var _iterator53 = _createForOfIteratorHelper(g.nodeEdges(child)),
        _step53;

    try {
      for (_iterator53.s(); !(_step53 = _iterator53.n()).done;) {
        var e = _step53.value;
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
    } catch (err) {
      _iterator53.e(err);
    } finally {
      _iterator53.f();
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

    var _iterator54 = _createForOfIteratorHelper(tree.neighbors(v)),
        _step54;

    try {
      for (_iterator54.s(); !(_step54 = _iterator54.n()).done;) {
        var w = _step54.value;

        if (!has(visited, w)) {
          nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
        }
      }
    } catch (err) {
      _iterator54.e(err);
    } finally {
      _iterator54.f();
    }

    label.low = low;
    label.lim = nextLim++;

    if (parent) {
      label.parent = parent;
    } else {
      delete label.parent;
    }

    return nextLim;
  }

  function leaveEdge(tree) {
    var _iterator55 = _createForOfIteratorHelper(tree.edges()),
        _step55;

    try {
      for (_iterator55.s(); !(_step55 = _iterator55.n()).done;) {
        var e = _step55.value;

        if (tree.edge(e).cutvalue < 0) {
          return e;
        }
      }
    } catch (err) {
      _iterator55.e(err);
    } finally {
      _iterator55.f();
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
      return flip === isDescendant(t, t.node(edge.v), tailLabel) && flip !== isDescendant(t, t.node(edge.w), tailLabel);
    });
    return minBy(candidates, function (edge) {
      return slack(g, edge);
    });
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
    var _iterator56 = _createForOfIteratorHelper(t.nodes()),
        _step56;

    try {
      for (_iterator56.s(); !(_step56 = _iterator56.n()).done;) {
        var v = _step56.value;
        if (!g.node(v).parent) return v;
      }
    } catch (err) {
      _iterator56.e(err);
    } finally {
      _iterator56.f();
    }

    return undefined;
  }

  function updateRanks(t, g) {
    var root = findRoot(t, g);
    var vs = preorder(t, root);
    vs = vs.slice(1);

    var _iterator57 = _createForOfIteratorHelper(vs),
        _step57;

    try {
      for (_iterator57.s(); !(_step57 = _iterator57.n()).done;) {
        var v = _step57.value;
        var parent = t.node(v).parent;
        var edge = g.edge(v, parent);
        var flipped = false;

        if (!edge) {
          edge = g.edge(parent, v);
          flipped = true;
        }

        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
      }
    } catch (err) {
      _iterator57.e(err);
    } finally {
      _iterator57.f();
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

      default:
        networkSimplexRanker(g);
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

  var DEFAULT_WEIGHT_FN = function DEFAULT_WEIGHT_FN(e) {
    return 1;
  };

  function greedyFAS(g, weightFn) {
    if (g.nodeCount() <= 1) {
      return [];
    }

    var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
    var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    return flattenDeep(results.map(function (e) {
      return g.outEdges(e.v, e.w);
    }));
  }

  function doGreedyFAS(g, buckets, zeroIdx) {
    var results = [];
    var sources = buckets[buckets.length - 1];
    var sinks = buckets[0];
    var entry;

    while (g.nodeCount()) {
      while (entry = sinks.dequeue()) {
        removeNode(g, buckets, zeroIdx, entry);
      }

      while (entry = sources.dequeue()) {
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

    var _iterator58 = _createForOfIteratorHelper(g.inEdges(entry.v)),
        _step58;

    try {
      for (_iterator58.s(); !(_step58 = _iterator58.n()).done;) {
        var edge = _step58.value;
        var weight = g.edge(edge);
        var uEntry = g.node(edge.v);

        if (collectPredecessors) {
          results.push({
            v: edge.v,
            w: edge.w
          });
        }

        uEntry.out -= weight;
        assignBucket(buckets, zeroIdx, uEntry);
      }
    } catch (err) {
      _iterator58.e(err);
    } finally {
      _iterator58.f();
    }

    var _iterator59 = _createForOfIteratorHelper(g.outEdges(entry.v)),
        _step59;

    try {
      for (_iterator59.s(); !(_step59 = _iterator59.n()).done;) {
        var edge = _step59.value;
        var weight = g.edge(edge);
        var w = edge.w;
        var wEntry = g.node(w);
        wEntry["in"] -= weight;
        assignBucket(buckets, zeroIdx, wEntry);
      }
    } catch (err) {
      _iterator59.e(err);
    } finally {
      _iterator59.f();
    }

    g.removeNode(entry.v);
    return results;
  }

  function buildState(g, weightFn) {
    var fasGraph = new Graph();
    var maxIn = 0;
    var maxOut = 0;

    var _iterator60 = _createForOfIteratorHelper(g.nodes()),
        _step60;

    try {
      for (_iterator60.s(); !(_step60 = _iterator60.n()).done;) {
        var v = _step60.value;
        fasGraph.setNode(v, {
          v: v,
          "in": 0,
          out: 0
        });
      }
    } catch (err) {
      _iterator60.e(err);
    } finally {
      _iterator60.f();
    }

    var _iterator61 = _createForOfIteratorHelper(g.edges()),
        _step61;

    try {
      for (_iterator61.s(); !(_step61 = _iterator61.n()).done;) {
        var e = _step61.value;
        var prevWeight = fasGraph.edge(e.v, e.w) || 0;
        var weight = weightFn(e);
        var edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
        maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
      }
    } catch (err) {
      _iterator61.e(err);
    } finally {
      _iterator61.f();
    }

    var buckets = array(maxOut + maxIn + 3, function () {
      return new List();
    });
    var zeroIdx = maxIn + 1;

    var _iterator62 = _createForOfIteratorHelper(fasGraph.nodes()),
        _step62;

    try {
      for (_iterator62.s(); !(_step62 = _iterator62.n()).done;) {
        var v = _step62.value;
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
      }
    } catch (err) {
      _iterator62.e(err);
    } finally {
      _iterator62.f();
    }

    return {
      graph: fasGraph,
      buckets: buckets,
      zeroIdx: zeroIdx
    };
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

  var acyclic = {
    run: run,
    undo: undo
  };

  function run(g) {
    var fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);

    var _iterator63 = _createForOfIteratorHelper(fas),
        _step63;

    try {
      for (_iterator63.s(); !(_step63 = _iterator63.n()).done;) {
        var e = _step63.value;
        var label = g.edge(e);
        g.removeEdge(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, uniqueId("rev"));
      }
    } catch (err) {
      _iterator63.e(err);
    } finally {
      _iterator63.f();
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

      var _iterator64 = _createForOfIteratorHelper(g.outEdges(v)),
          _step64;

      try {
        for (_iterator64.s(); !(_step64 = _iterator64.n()).done;) {
          var e = _step64.value;

          if (has(stack, e.w)) {
            fas.push(e);
          } else {
            dfs(e.w);
          }
        }
      } catch (err) {
        _iterator64.e(err);
      } finally {
        _iterator64.f();
      }

      delete stack[v];
    }

    g.nodes().forEach(dfs);
    return fas;
  }

  function undo(g) {
    var _iterator65 = _createForOfIteratorHelper(g.edges()),
        _step65;

    try {
      for (_iterator65.s(); !(_step65 = _iterator65.n()).done;) {
        var e = _step65.value;
        var label = g.edge(e);

        if (label.reversed) {
          g.removeEdge(e);
          var forwardName = label.forwardName;
          delete label.reversed;
          delete label.forwardName;
          g.setEdge(e.w, e.v, label, forwardName);
        }
      }
    } catch (err) {
      _iterator65.e(err);
    } finally {
      _iterator65.f();
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
    var label = {
      width: 0,
      height: 0,
      rank: rank,
      borderType: prop
    };
    var prev = sgNode[prop][rank - 1];
    var curr = addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);

    if (prev) {
      g.setEdge(prev, curr, {
        weight: 1
      });
    }
  }

  var coordinateSystem = {
    adjust: adjust,
    undo: undo$1
  };

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
    var _iterator66 = _createForOfIteratorHelper(g.nodes()),
        _step66;

    try {
      for (_iterator66.s(); !(_step66 = _iterator66.n()).done;) {
        var v = _step66.value;
        swapWidthHeightOne(g.node(v));
      }
    } catch (err) {
      _iterator66.e(err);
    } finally {
      _iterator66.f();
    }

    var _iterator67 = _createForOfIteratorHelper(g.edges()),
        _step67;

    try {
      for (_iterator67.s(); !(_step67 = _iterator67.n()).done;) {
        var e = _step67.value;
        swapWidthHeightOne(g.edge(e));
      }
    } catch (err) {
      _iterator67.e(err);
    } finally {
      _iterator67.f();
    }
  }

  function swapWidthHeightOne(attrs) {
    var w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
  }

  function reverseY(g) {
    var _iterator68 = _createForOfIteratorHelper(g.nodes()),
        _step68;

    try {
      for (_iterator68.s(); !(_step68 = _iterator68.n()).done;) {
        var v = _step68.value;
        reverseYOne(g.node(v));
      }
    } catch (err) {
      _iterator68.e(err);
    } finally {
      _iterator68.f();
    }

    var _iterator69 = _createForOfIteratorHelper(g.edges()),
        _step69;

    try {
      for (_iterator69.s(); !(_step69 = _iterator69.n()).done;) {
        var e = _step69.value;
        var edge = g.edge(e);
        edge.points.forEach(reverseYOne);

        if (has(edge, "y")) {
          reverseYOne(edge);
        }
      }
    } catch (err) {
      _iterator69.e(err);
    } finally {
      _iterator69.f();
    }
  }

  function reverseYOne(attrs) {
    attrs.y = -attrs.y;
  }

  function swapXY(g) {
    var _iterator70 = _createForOfIteratorHelper(g.nodes()),
        _step70;

    try {
      for (_iterator70.s(); !(_step70 = _iterator70.n()).done;) {
        var v = _step70.value;
        swapXYOne(g.node(v));
      }
    } catch (err) {
      _iterator70.e(err);
    } finally {
      _iterator70.f();
    }

    var _iterator71 = _createForOfIteratorHelper(g.edges()),
        _step71;

    try {
      for (_iterator71.s(); !(_step71 = _iterator71.n()).done;) {
        var e = _step71.value;
        var edge = g.edge(e);
        edge.points.forEach(swapXYOne);

        if (has(edge, "x")) {
          swapXYOne(edge);
        }
      }
    } catch (err) {
      _iterator71.e(err);
    } finally {
      _iterator71.f();
    }
  }

  function swapXYOne(attrs) {
    var x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
  }

  function debugOrdering(g) {
    var layerMatrix = buildLayerMatrix(g);
    var h = new Graph({
      compound: true,
      multigraph: true
    }).setGraph({});

    var _iterator72 = _createForOfIteratorHelper(g.nodes()),
        _step72;

    try {
      for (_iterator72.s(); !(_step72 = _iterator72.n()).done;) {
        var v = _step72.value;
        h.setNode(v, {
          label: v
        });
        h.setParent(v, "layer" + g.node(v).rank);
      }
    } catch (err) {
      _iterator72.e(err);
    } finally {
      _iterator72.f();
    }

    var _iterator73 = _createForOfIteratorHelper(g.edges()),
        _step73;

    try {
      for (_iterator73.s(); !(_step73 = _iterator73.n()).done;) {
        var e = _step73.value;
        h.setEdge(e.v, e.w, {}, e.name);
      }
    } catch (err) {
      _iterator73.e(err);
    } finally {
      _iterator73.f();
    }

    var i = 0;

    var _iterator74 = _createForOfIteratorHelper(layerMatrix),
        _step74;

    try {
      for (_iterator74.s(); !(_step74 = _iterator74.n()).done;) {
        var layer = _step74.value;
        var layerV = "layer" + i;
        i++;
        h.setNode(layerV, {
          rank: "same"
        });
        layer.reduce(function (u, v) {
          h.setEdge(u.toString(), v, {
            style: "invis"
          });
          return v;
        });
      }
    } catch (err) {
      _iterator74.e(err);
    } finally {
      _iterator74.f();
    }

    return h;
  }

  var debug = /*#__PURE__*/Object.freeze({
    __proto__: null,
    debugOrdering: debugOrdering
  });
  var normalize = {
    run: run$1,
    undo: undo$2
  };

  function run$1(g) {
    g.graph().dummyChains = [];

    var _iterator75 = _createForOfIteratorHelper(g.edges()),
        _step75;

    try {
      for (_iterator75.s(); !(_step75 = _iterator75.n()).done;) {
        var edge = _step75.value;
        normalizeEdge(g, edge);
      }
    } catch (err) {
      _iterator75.e(err);
    } finally {
      _iterator75.f();
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
    if (wRank === vRank + 1) return;
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

      g.setEdge(v, dummy, {
        weight: edgeLabel.weight
      }, name);

      if (i === 0) {
        g.graph().dummyChains.push(dummy);
      }

      v = dummy;
    }

    g.setEdge(v, w, {
      weight: edgeLabel.weight
    }, name);
  }

  function undo$2(g) {
    var _iterator76 = _createForOfIteratorHelper(g.graph().dummyChains),
        _step76;

    try {
      for (_iterator76.s(); !(_step76 = _iterator76.n()).done;) {
        var v = _step76.value;
        var node = g.node(v);
        var origLabel = node.edgeLabel;
        var w;
        g.setEdge(node.edgeObj, origLabel);

        while (node.dummy) {
          w = g.successors(v)[0];
          g.removeNode(v);
          origLabel.points.push({
            x: node.x,
            y: node.y
          });

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
    } catch (err) {
      _iterator76.e(err);
    } finally {
      _iterator76.f();
    }
  }

  function parentDummyChains(g) {
    var postorderNums = postorder$1(g);

    var _iterator77 = _createForOfIteratorHelper(g.graph().dummyChains),
        _step77;

    try {
      for (_iterator77.s(); !(_step77 = _iterator77.n()).done;) {
        var v = _step77.value;
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
            while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
              pathIdx++;
            }

            if (pathV === lca) {
              ascending = false;
            }
          }

          if (!ascending) {
            while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
              pathIdx++;
            }

            pathV = path[pathIdx];
          }

          g.setParent(v, pathV);
          v = g.successors(v)[0];
        }
      }
    } catch (err) {
      _iterator77.e(err);
    } finally {
      _iterator77.f();
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
    } while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));

    lca = parent;
    parent = w;

    while ((parent = g.parent(parent)) !== lca) {
      wPath.push(parent);
    }

    return {
      path: vPath.concat(wPath.reverse()),
      lca: lca
    };
  }

  function postorder$1(g) {
    var result = {};
    var lim = 0;

    function dfs(v) {
      var low = lim;
      g.children(v).forEach(dfs);
      result[v] = {
        low: low,
        lim: lim++
      };
    }

    g.children().forEach(dfs);
    return result;
  }

  var nestingGraph = {
    run: run$2,
    cleanup: cleanup
  };

  function run$2(g) {
    var root = addDummyNode(g, "root", {}, "_root");
    var depths = treeDepths(g);
    var height = Math.max.apply(Math, _toConsumableArray(values(depths))) - 1;
    var nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;

    var _iterator78 = _createForOfIteratorHelper(g.edges()),
        _step78;

    try {
      for (_iterator78.s(); !(_step78 = _iterator78.n()).done;) {
        var e = _step78.value;
        g.edge(e).minlen *= nodeSep;
      }
    } catch (err) {
      _iterator78.e(err);
    } finally {
      _iterator78.f();
    }

    var weight = sumWeights(g) + 1;

    var _iterator79 = _createForOfIteratorHelper(g.children()),
        _step79;

    try {
      for (_iterator79.s(); !(_step79 = _iterator79.n()).done;) {
        var child = _step79.value;
        dfs$1(g, root, nodeSep, weight, height, depths, child);
      }
    } catch (err) {
      _iterator79.e(err);
    } finally {
      _iterator79.f();
    }

    g.graph().nodeRankFactor = nodeSep;
  }

  function dfs$1(g, root, nodeSep, weight, height, depths, v) {
    var children = g.children(v);

    if (!children.length) {
      if (v !== root) {
        g.setEdge(root, v, {
          weight: 0,
          minlen: nodeSep
        });
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

    var _iterator80 = _createForOfIteratorHelper(children),
        _step80;

    try {
      for (_iterator80.s(); !(_step80 = _iterator80.n()).done;) {
        var child = _step80.value;
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
    } catch (err) {
      _iterator80.e(err);
    } finally {
      _iterator80.f();
    }

    if (!g.parent(v)) {
      g.setEdge(root, top, {
        weight: 0,
        minlen: height + depths[v]
      });
    }
  }

  function treeDepths(g) {
    var depths = {};

    function dfs(v, depth) {
      var children = g.children(v);

      if (children && children.length) {
        var _iterator81 = _createForOfIteratorHelper(children),
            _step81;

        try {
          for (_iterator81.s(); !(_step81 = _iterator81.n()).done;) {
            var child = _step81.value;
            dfs(child, depth + 1);
          }
        } catch (err) {
          _iterator81.e(err);
        } finally {
          _iterator81.f();
        }
      }

      depths[v] = depth;
    }

    var _iterator82 = _createForOfIteratorHelper(g.children()),
        _step82;

    try {
      for (_iterator82.s(); !(_step82 = _iterator82.n()).done;) {
        var child = _step82.value;
        dfs(child, 1);
      }
    } catch (err) {
      _iterator82.e(err);
    } finally {
      _iterator82.f();
    }

    return depths;
  }

  function sumWeights(g) {
    return g.edges().reduce(function (acc, e) {
      return acc + g.edge(e).weight;
    }, 0);
  }

  function cleanup(g) {
    var graphLabel = g.graph();
    g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;

    var _iterator83 = _createForOfIteratorHelper(g.edges()),
        _step83;

    try {
      for (_iterator83.s(); !(_step83 = _iterator83.n()).done;) {
        var e = _step83.value;
        var edge = g.edge(e);

        if (edge.nestingEdge) {
          g.removeEdge(e);
        }
      }
    } catch (err) {
      _iterator83.e(err);
    } finally {
      _iterator83.f();
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
      var layoutGraph = time$1("  buildLayoutGraph", function () {
        return buildLayoutGraph(g);
      });
      time$1("  runLayout", function () {
        runLayout(layoutGraph, time$1);
      });
      time$1("  updateInputGraph", function () {
        updateInputGraph(g, layoutGraph);
      });
    });
  }

  function runLayout(g, time) {
    time("    makeSpaceForEdgeLabels", function () {
      makeSpaceForEdgeLabels(g);
    });
    time("    removeSelfEdges", function () {
      removeSelfEdges(g);
    });
    time("    acyclic", function () {
      acyclic.run(g);
    });
    time("    nestingGraph.run", function () {
      nestingGraph.run(g);
    });
    time("    rank", function () {
      rank(asNonCompoundGraph(g));
    });
    time("    injectEdgeLabelProxies", function () {
      injectEdgeLabelProxies(g);
    });
    time("    removeEmptyRanks", function () {
      removeEmptyRanks(g);
    });
    time("    nestingGraph.cleanup", function () {
      nestingGraph.cleanup(g);
    });
    time("    normalizeRanks", function () {
      normalizeRanks(g);
    });
    time("    assignRankMinMax", function () {
      assignRankMinMax(g);
    });
    time("    removeEdgeLabelProxies", function () {
      removeEdgeLabelProxies(g);
    });
    time("    normalize.run", function () {
      normalize.run(g);
    });
    time("    parentDummyChains", function () {
      parentDummyChains(g);
    });
    time("    addBorderSegments", function () {
      addBorderSegments(g);
    });
    time("    order", function () {
      order(g);
    });
    time("    insertSelfEdges", function () {
      insertSelfEdges(g);
    });
    time("    adjustCoordinateSystem", function () {
      coordinateSystem.adjust(g);
    });
    time("    position", function () {
      position(g);
    });
    time("    positionSelfEdges", function () {
      positionSelfEdges(g);
    });
    time("    removeBorderNodes", function () {
      removeBorderNodes(g);
    });
    time("    normalize.undo", function () {
      normalize.undo(g);
    });
    time("    fixupEdgeLabelCoords", function () {
      fixupEdgeLabelCoords(g);
    });
    time("    undoCoordinateSystem", function () {
      coordinateSystem.undo(g);
    });
    time("    translateGraph", function () {
      translateGraph(g);
    });
    time("    assignNodeIntersects", function () {
      assignNodeIntersects(g);
    });
    time("    reversePoints", function () {
      reversePointsForReversedEdges(g);
    });
    time("    acyclic.undo", function () {
      acyclic.undo(g);
    });
  }

  function updateInputGraph(inputGraph, layoutGraph) {
    var _iterator84 = _createForOfIteratorHelper(inputGraph.nodes()),
        _step84;

    try {
      for (_iterator84.s(); !(_step84 = _iterator84.n()).done;) {
        var v = _step84.value;
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
    } catch (err) {
      _iterator84.e(err);
    } finally {
      _iterator84.f();
    }

    var _iterator85 = _createForOfIteratorHelper(inputGraph.edges()),
        _step85;

    try {
      for (_iterator85.s(); !(_step85 = _iterator85.n()).done;) {
        var e = _step85.value;
        var inputEdgeLabel = inputGraph.edge(e);
        var layoutEdgeLabel = layoutGraph.edge(e);
        inputEdgeLabel.points = layoutEdgeLabel.points;

        if (has(layoutEdgeLabel, "x")) {
          inputEdgeLabel.x = layoutEdgeLabel.x;
          inputEdgeLabel.y = layoutEdgeLabel.y;
        }
      }
    } catch (err) {
      _iterator85.e(err);
    } finally {
      _iterator85.f();
    }

    inputGraph.graph().width = layoutGraph.graph().width;
    inputGraph.graph().height = layoutGraph.graph().height;
  }

  var tb = 'tb';
  var graphDefaults = {
    ranksep: 50,
    edgesep: 20,
    nodesep: 50,
    rankdir: tb
  };
  var edgeDefaults = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r"
  };

  function buildLayoutGraph(inputGraph) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;

    var g = new Graph({
      multigraph: true,
      compound: true
    });
    var graph = canonicalize(inputGraph.graph());
    var layoutGraphConfig = {
      nodesep: (_a = graph.nodesep) !== null && _a !== void 0 ? _a : graphDefaults.nodesep,
      edgesep: (_b = graph.edgesep) !== null && _b !== void 0 ? _b : graphDefaults.edgesep,
      ranksep: (_c = graph.ranksep) !== null && _c !== void 0 ? _c : graphDefaults.ranksep,
      marginx: +((_d = graph.marginx) !== null && _d !== void 0 ? _d : 0),
      marginy: +((_e = graph.marginy) !== null && _e !== void 0 ? _e : 0),
      acyclicer: graph.acyclicer,
      ranker: (_f = graph.ranker) !== null && _f !== void 0 ? _f : 'network-simplex',
      rankdir: (_g = graph.rankdir) !== null && _g !== void 0 ? _g : graphDefaults.rankdir,
      align: graph.align
    };
    g.setGraph(layoutGraphConfig);

    var _iterator86 = _createForOfIteratorHelper(inputGraph.nodes()),
        _step86;

    try {
      for (_iterator86.s(); !(_step86 = _iterator86.n()).done;) {
        var v = _step86.value;
        var node = canonicalize(inputGraph.node(v));
        var layoutNode = {
          width: +((_h = node && node.width) !== null && _h !== void 0 ? _h : 0),
          height: +((_j = node && node.height) !== null && _j !== void 0 ? _j : 0)
        };
        g.setNode(v, layoutNode);
        g.setParent(v, inputGraph.parent(v));
      }
    } catch (err) {
      _iterator86.e(err);
    } finally {
      _iterator86.f();
    }

    var _iterator87 = _createForOfIteratorHelper(inputGraph.edges()),
        _step87;

    try {
      for (_iterator87.s(); !(_step87 = _iterator87.n()).done;) {
        var e = _step87.value;
        var edge = canonicalize(inputGraph.edge(e));
        var layoutEdge = {
          minlen: (_k = edge.minlen) !== null && _k !== void 0 ? _k : edgeDefaults.minlen,
          weight: (_l = edge.weight) !== null && _l !== void 0 ? _l : edgeDefaults.weight,
          width: (_m = edge.width) !== null && _m !== void 0 ? _m : edgeDefaults.width,
          height: (_o = edge.height) !== null && _o !== void 0 ? _o : edgeDefaults.height,
          labeloffset: (_p = edge.labeloffset) !== null && _p !== void 0 ? _p : edgeDefaults.labeloffset,
          labelpos: (_q = edge.labelpos) !== null && _q !== void 0 ? _q : edgeDefaults.labelpos
        };
        g.setEdge(e, layoutEdge);
      }
    } catch (err) {
      _iterator87.e(err);
    } finally {
      _iterator87.f();
    }

    return g;
  }

  function makeSpaceForEdgeLabels(g) {
    var graph = g.graph();
    graph.ranksep /= 2;

    var _iterator88 = _createForOfIteratorHelper(g.edges()),
        _step88;

    try {
      for (_iterator88.s(); !(_step88 = _iterator88.n()).done;) {
        var e = _step88.value;
        var edge = g.edge(e);
        edge.minlen *= 2;

        if (edge.labelpos.toLowerCase() !== "c") {
          if (graph.rankdir === "TB" || graph.rankdir === "BT") {
            edge.width += edge.labeloffset;
          } else {
            edge.height += edge.labeloffset;
          }
        }
      }
    } catch (err) {
      _iterator88.e(err);
    } finally {
      _iterator88.f();
    }
  }

  function injectEdgeLabelProxies(g) {
    var _iterator89 = _createForOfIteratorHelper(g.edges()),
        _step89;

    try {
      for (_iterator89.s(); !(_step89 = _iterator89.n()).done;) {
        var e = _step89.value;
        var edge = g.edge(e);

        if (edge.width && edge.height) {
          var v = g.node(e.v);
          var w = g.node(e.w);
          var label = {
            rank: (w.rank - v.rank) / 2 + v.rank,
            e: e
          };
          addDummyNode(g, "edge-proxy", label, "_ep");
        }
      }
    } catch (err) {
      _iterator89.e(err);
    } finally {
      _iterator89.f();
    }
  }

  function assignRankMinMax(g) {
    var maxRank = 0;

    var _iterator90 = _createForOfIteratorHelper(g.nodes()),
        _step90;

    try {
      for (_iterator90.s(); !(_step90 = _iterator90.n()).done;) {
        var v = _step90.value;
        var node = g.node(v);

        if (node.borderTop) {
          node.minRank = g.node(node.borderTop).rank;
          node.maxRank = g.node(node.borderBottom).rank;
          maxRank = Math.max(maxRank, node.maxRank);
        }
      }
    } catch (err) {
      _iterator90.e(err);
    } finally {
      _iterator90.f();
    }

    g.graph().maxRank = maxRank;
  }

  function removeEdgeLabelProxies(g) {
    var _iterator91 = _createForOfIteratorHelper(g.nodes()),
        _step91;

    try {
      for (_iterator91.s(); !(_step91 = _iterator91.n()).done;) {
        var v = _step91.value;
        var node = g.node(v);

        if (isEdgeProxy(node)) {
          g.edge(node.e).labelRank = node.rank;
          g.removeNode(v);
        }
      }
    } catch (err) {
      _iterator91.e(err);
    } finally {
      _iterator91.f();
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

    var _iterator92 = _createForOfIteratorHelper(g.nodes()),
        _step92;

    try {
      for (_iterator92.s(); !(_step92 = _iterator92.n()).done;) {
        var v = _step92.value;
        getExtremes(g.node(v));
      }
    } catch (err) {
      _iterator92.e(err);
    } finally {
      _iterator92.f();
    }

    var _iterator93 = _createForOfIteratorHelper(g.edges()),
        _step93;

    try {
      for (_iterator93.s(); !(_step93 = _iterator93.n()).done;) {
        var e = _step93.value;
        var edge = g.edge(e);

        if (has(edge, "x")) {
          getExtremes(edge);
        }
      }
    } catch (err) {
      _iterator93.e(err);
    } finally {
      _iterator93.f();
    }

    minX -= marginX;
    minY -= marginY;

    var _iterator94 = _createForOfIteratorHelper(g.nodes()),
        _step94;

    try {
      for (_iterator94.s(); !(_step94 = _iterator94.n()).done;) {
        var v = _step94.value;
        var node = g.node(v);
        node.x -= minX;
        node.y -= minY;
      }
    } catch (err) {
      _iterator94.e(err);
    } finally {
      _iterator94.f();
    }

    var _iterator95 = _createForOfIteratorHelper(g.edges()),
        _step95;

    try {
      for (_iterator95.s(); !(_step95 = _iterator95.n()).done;) {
        var e = _step95.value;
        var edge = g.edge(e);

        var _iterator96 = _createForOfIteratorHelper((_c = edge.points) !== null && _c !== void 0 ? _c : []),
            _step96;

        try {
          for (_iterator96.s(); !(_step96 = _iterator96.n()).done;) {
            var p = _step96.value;
            p.x -= minX;
            p.y -= minY;
          }
        } catch (err) {
          _iterator96.e(err);
        } finally {
          _iterator96.f();
        }

        if (edge.hasOwnProperty("x")) {
          edge.x -= minX;
        }

        if (edge.hasOwnProperty("y")) {
          edge.y -= minY;
        }
      }
    } catch (err) {
      _iterator95.e(err);
    } finally {
      _iterator95.f();
    }

    graphLabel.width = maxX - minX + marginX;
    graphLabel.height = maxY - minY + marginY;
  }

  function assignNodeIntersects(g) {
    var _iterator97 = _createForOfIteratorHelper(g.edges()),
        _step97;

    try {
      for (_iterator97.s(); !(_step97 = _iterator97.n()).done;) {
        var e = _step97.value;
        var edge = g.edge(e);
        var nodeV = g.node(e.v);
        var nodeW = g.node(e.w);
        var p1;
        var p2;

        if (!edge.points) {
          edge.points = [];
          p1 = nodeW;
          p2 = nodeV;
        } else {
          p1 = edge.points[0];
          p2 = edge.points[edge.points.length - 1];
        }

        edge.points.unshift(intersectRect(nodeV, p1));
        edge.points.push(intersectRect(nodeW, p2));
      }
    } catch (err) {
      _iterator97.e(err);
    } finally {
      _iterator97.f();
    }
  }

  function fixupEdgeLabelCoords(g) {
    var _iterator98 = _createForOfIteratorHelper(g.edges()),
        _step98;

    try {
      for (_iterator98.s(); !(_step98 = _iterator98.n()).done;) {
        var e = _step98.value;
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
    } catch (err) {
      _iterator98.e(err);
    } finally {
      _iterator98.f();
    }
  }

  function reversePointsForReversedEdges(g) {
    var _iterator99 = _createForOfIteratorHelper(g.edges()),
        _step99;

    try {
      for (_iterator99.s(); !(_step99 = _iterator99.n()).done;) {
        var e = _step99.value;
        var edge = g.edge(e);

        if (edge.reversed) {
          edge.points.reverse();
        }
      }
    } catch (err) {
      _iterator99.e(err);
    } finally {
      _iterator99.f();
    }
  }

  function removeBorderNodes(g) {
    var _iterator100 = _createForOfIteratorHelper(g.nodes()),
        _step100;

    try {
      for (_iterator100.s(); !(_step100 = _iterator100.n()).done;) {
        var v = _step100.value;

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
    } catch (err) {
      _iterator100.e(err);
    } finally {
      _iterator100.f();
    }

    var _iterator101 = _createForOfIteratorHelper(g.nodes()),
        _step101;

    try {
      for (_iterator101.s(); !(_step101 = _iterator101.n()).done;) {
        var v = _step101.value;

        if (g.node(v).dummy === "border") {
          g.removeNode(v);
        }
      }
    } catch (err) {
      _iterator101.e(err);
    } finally {
      _iterator101.f();
    }
  }

  function removeSelfEdges(g) {
    var _iterator102 = _createForOfIteratorHelper(g.edges()),
        _step102;

    try {
      for (_iterator102.s(); !(_step102 = _iterator102.n()).done;) {
        var e = _step102.value;

        if (e.v === e.w) {
          var node = g.node(e.v);

          if (!node.selfEdges) {
            node.selfEdges = [];
          }

          node.selfEdges.push({
            e: e,
            label: g.edge(e)
          });
          g.removeEdge(e);
        }
      }
    } catch (err) {
      _iterator102.e(err);
    } finally {
      _iterator102.f();
    }
  }

  function insertSelfEdges(g) {
    var _a;

    var layers = buildLayerMatrix(g);

    var _iterator103 = _createForOfIteratorHelper(layers),
        _step103;

    try {
      for (_iterator103.s(); !(_step103 = _iterator103.n()).done;) {
        var layer = _step103.value;
        var orderShift = 0;

        for (var i = 0; i < layer.length; i++) {
          var v = layer[i];
          var node = g.node(v);
          node.order = i + orderShift;

          var _iterator104 = _createForOfIteratorHelper((_a = node.selfEdges) !== null && _a !== void 0 ? _a : []),
              _step104;

          try {
            for (_iterator104.s(); !(_step104 = _iterator104.n()).done;) {
              var selfEdge = _step104.value;
              addDummyNode(g, "selfedge", {
                width: selfEdge.label.width,
                height: selfEdge.label.height,
                rank: node.rank,
                order: i + ++orderShift,
                e: selfEdge.e,
                label: selfEdge.label
              }, "_se");
            }
          } catch (err) {
            _iterator104.e(err);
          } finally {
            _iterator104.f();
          }

          delete node.selfEdges;
        }
      }
    } catch (err) {
      _iterator103.e(err);
    } finally {
      _iterator103.f();
    }
  }

  function positionSelfEdges(g) {
    var _iterator105 = _createForOfIteratorHelper(g.nodes()),
        _step105;

    try {
      for (_iterator105.s(); !(_step105 = _iterator105.n()).done;) {
        var v = _step105.value;
        var node = g.node(v);

        if (isSelfEdge(node)) {
          var selfNode = g.node(node.e.v);
          var x = selfNode.x + selfNode.width / 2;
          var y = selfNode.y;
          var dx = node.x - x;
          var dy = selfNode.height / 2;
          g.setEdge(node.e, node.label);
          g.removeNode(v);
          node.label.points = [{
            x: x + 2 * dx / 3,
            y: y - dy
          }, {
            x: x + 5 * dx / 6,
            y: y - dy
          }, {
            x: x + dx,
            y: y
          }, {
            x: x + 5 * dx / 6,
            y: y + dy
          }, {
            x: x + 2 * dx / 3,
            y: y + dy
          }];
          node.label.x = node.x;
          node.label.y = node.y;
        }
      }
    } catch (err) {
      _iterator105.e(err);
    } finally {
      _iterator105.f();
    }
  }

  function canonicalize() {
    var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var newAttrs = {};

    for (var _i8 = 0, _Object$keys5 = Object.keys(attrs); _i8 < _Object$keys5.length; _i8++) {
      var key = _Object$keys5[_i8];
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
      var node = {
        v: v
      };

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
      var edge = {
        v: e.v,
        w: e.w
      };

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

    var _iterator106 = _createForOfIteratorHelper(json.nodes),
        _step106;

    try {
      for (_iterator106.s(); !(_step106 = _iterator106.n()).done;) {
        var entry = _step106.value;
        g.setNode(entry.v, entry.value);

        if (entry.parent) {
          g.setParent(entry.v, entry.parent);
        }
      }
    } catch (err) {
      _iterator106.e(err);
    } finally {
      _iterator106.f();
    }

    var _iterator107 = _createForOfIteratorHelper(json.edges),
        _step107;

    try {
      for (_iterator107.s(); !(_step107 = _iterator107.n()).done;) {
        var entry = _step107.value;
        g.setEdge({
          v: entry.v,
          w: entry.w,
          name: entry.name
        }, entry.value);
      }
    } catch (err) {
      _iterator107.e(err);
    } finally {
      _iterator107.f();
    }

    return g;
  }

  var json = /*#__PURE__*/Object.freeze({
    __proto__: null,
    write: write,
    read: read
  });
  var graphlib = {
    Graph: Graph,
    GraphLike: GraphLike,
    alg: alg,
    json: json,
    PriorityQueue: PriorityQueue
  };
  return {
    Graph: Graph,
    GraphLike: GraphLike,
    PriorityQueue: PriorityQueue,
    acyclic: acyclic,
    addBorderSegments: addBorderSegments,
    alg: alg,
    coordinateSystem: coordinateSystem,
    data: list,
    debug: debug,
    graphlib: graphlib,
    greedyFAS: greedyFAS,
    json: json,
    layout: layout,
    nestingGraph: nestingGraph,
    normalize: normalize,
    order: index,
    parentDummyChains: parentDummyChains,
    position: index$1,
    rank: index$2,
    util: util,
    version: version
  };
}();
return graphre;
/******/ })()
;