//import {terser} from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'build/index.js',
  output: {
    file: 'dist/dagre.js',
    format: 'umd',
    name: 'dagre'
  },
  plugins: [nodeResolve(), commonjs()]
};