import _ from "./lodash";
import { Graph } from 'graphlib';

export var coordinateSystem = { adjust, undo };

function adjust(g: Graph<GraphNode, EdgeLabel>) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "lr" || rankDir === "rl") {
    swapWidthHeight(g);
  }
}

function undo(g: Graph<GraphNode, EdgeLabel>) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "bt" || rankDir === "rl") {
    reverseY(g);
  }

  if (rankDir === "lr" || rankDir === "rl") {
    swapXY(g);
    swapWidthHeight(g);
  }
}

function swapWidthHeight(g: Graph<GraphNode, EdgeLabel>) {
  for (var v of g.nodes()) { swapWidthHeightOne(g.node(v)); }
  for (var e of g.edges()) { swapWidthHeightOne(g.edge(e)); }
}

function swapWidthHeightOne(attrs) {
  var w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}

function reverseY(g: Graph<GraphNode, EdgeLabel>) {
  for (var v of g.nodes()) { reverseYOne(g.node(v)); }

  for (var e of g.edges()) {
    var edge = g.edge(e);
    edge.points.forEach(reverseYOne);
    if (_.has(edge, "y")) {
      reverseYOne(edge);
    }
  }
}

function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}

function swapXY(g: Graph<GraphNode, EdgeLabel>) {
  for (var v of g.nodes()) { swapXYOne(g.node(v)); }

  for (var e of g.edges()) {
    var edge = g.edge(e);
    edge.points.forEach(swapXYOne);
    if (_.has(edge, "x")) {
      swapXYOne(edge);
    }
  }
}

function swapXYOne(attrs) {
  var x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}
