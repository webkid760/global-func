var Z = require('../src');
var eq = require('./lib/eq');
var jsv = require('jsverify');


describe('validate', function() {
  it('validate posiNum', function() {
    eq(Z.validate('posiNum', 6), true);
  });

  it('coerces its arguments to numbers', function() {
    eq(Z.validate('mobile', '13839876543'), true);
  });

});


describe('add properties', function() {

  jsv.property('identity', jsv.number, function(a) {
    return Z.validate('mobile', a)===Z.validate('mobile')(a);
  });
});