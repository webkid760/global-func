'use strict';

var babel = require('rollup-plugin-babel');
// uglify handles only es5 code, so this also acts as smoke test against shipping es2015+ syntax
var uglify = require('rollup-plugin-uglify').uglify;
var pkg = require('./package.json');

var banner = '//  Zoo v' + pkg.version + '\n';  

var input = 'src/index.js';

var config = {
  input: input,
  output: {
    format: 'umd',
    name: 'Z',
    exports: 'named',
    banner: banner
  },
  plugins: [
    babel({ presets: [['@babel/preset-env', { targets: { ie: '11' } }]]})
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      },
      warnings: false
    })
  );
}

module.exports = config;
