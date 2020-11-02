import {terser} from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'build/index.js',
  output: {
    file: 'dist/graphre.js',
    format: 'umd',
    name: 'graphre'
  },
  plugins: [nodeResolve(), commonjs(), process.env.MINIFY ? terser() : null]
};