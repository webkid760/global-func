var assert = require('assert');

var Z = require('../../src');


module.exports = function(actual, expected) {
  assert.strictEqual(arguments.length, 2);
  assert.strictEqual(actual.toString(), expected.toString());
};
