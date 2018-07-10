import chai from 'chai';

module.exports = function () {
  global.chai = chai;
  global.expect = chai.expect;
  global.assert = chai.assert;
  chai.should();
}
