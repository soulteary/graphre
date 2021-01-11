const { readFileSync, writeFileSync } = require("fs");

const distFile = "./dist/graphre.js";

const raw = readFileSync(distFile, "utf-8");

const reduceList = [
  `Object.defineProperty(exports, '__esModule', { value: true });`,
];

let content = raw.replace(/exports\./g, "module.exports.");

reduceList.forEach((line) => (content = content.replace(line, "")));

writeFileSync(distFile, content);
