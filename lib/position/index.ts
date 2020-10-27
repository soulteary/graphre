import _ from '../lodash';

import * as util from "../util";
import { positionX } from "./bk";
import { DagreGraph } from '../types';

export * as bk from './bk';

export function position(g: DagreGraph) {
  g = util.asNonCompoundGraph(g);

  positionY(g);
  _.mapValues(positionX(g), function(x, v) {
    g.node(v).x = x;
  });
}

function positionY(g: DagreGraph) {
  var layering = util.buildLayerMatrix(g);
  var rankSep = g.graph().ranksep;
  var prevY = 0;
  for (var layer of layering) {
    var maxHeight = _.max(layer.map(function(v) { return g.node(v).height; }));
    for (var v of layer) {
      g.node(v).y = prevY + maxHeight / 2;
    }
    prevY += maxHeight + rankSep;
  }
}

