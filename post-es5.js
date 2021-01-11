"use strict";

const { readFileSync, writeFileSync } = require("fs");

const distFile = "./dist/graphre.es5.js";

const raw = readFileSync(distFile, "utf-8");

let content =
  "var graphre=" +
  raw.replace("/******/ })()", "return graphre;\n/******/ })()");

content = content.replace('"@babel/helpers - typeof";', '');

writeFileSync(distFile, content);
