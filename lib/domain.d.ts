declare interface GraphNode {
  x: number;
  y: number;
  width: number;
  height: number;
  order?: number;
  rank?: number;
  minRank?: number;
  maxRank?: number;
  edgeObj?: unknown; // TODO: specify this
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  dummy?: unknown;
  selfEdges?: unknown[]
  e?: unknown;
}

declare interface EdgeLabel {
  weight?: number;
  minlen?: number;
  forwardName?: string;
  reversed?: boolean;
  width?: number
  height?: number
  labelpos?: string
  labeloffset?: number
  labelRank?: number;
  nestingEdge?: boolean;
  points?: {x:number, y:number}[]
}