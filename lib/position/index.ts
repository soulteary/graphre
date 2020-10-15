import _ from '../lodash';
import { Graph } from 'graphlib';

import * as util from "../util";
import { positionX } from "./bk";

export * as bk from './bk';

export function position(g: Graph<GraphNode, EdgeLabel>) {
  g = util.asNonCompoundGraph(g);

  positionY(g);
  _.forEach(positionX(g), function(x, v) {
    g.node(v).x = x;
  });
}

function positionY(g: Graph<GraphNode, EdgeLabel>) {
  var layering = util.buildLayerMatrix(g);
  var rankSep = g.graph().ranksep;
  var prevY = 0;
  _.forEach(layering, function(layer) {
    var maxHeight = _.max(_.map(layer, function(v) { return g.node(v).height; }));
    _.forEach(layer, function(v) {
      g.node(v).y = prevY + maxHeight / 2;
    });
    prevY += maxHeight + rankSep;
  });
}

