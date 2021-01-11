'use strict';

const { readFileSync, writeFileSync } = require("fs");

const distFile = "./dist/graphre.js";

const raw = readFileSync(distFile, "utf-8");

const reduceList = [
  `Object.defineProperty(exports, '__esModule', { value: true });`,
];

let content = raw;

content = content.replace("exports.Graph", "return {\nexports.Graph");
content = content.replace(
  "exports.version = version;",
  "exports.version = version;\n};"
);

content.match(/exports\.(.+)\s=\s(.+);/gi).forEach((api) => {
  const define = api.replace(/exports\.(.+)\s=\s(.+);/gi,($1, key, val) => `\t${key}: ${val},`);
  content = content.replace(api, define);
});

reduceList.forEach((line) => (content = content.replace(line, "")));

content = content.replace(`'use strict';`,`var graphre = (function(){\n'use strict';\n`);
content = content + '\n})();'

writeFileSync(distFile, content);
