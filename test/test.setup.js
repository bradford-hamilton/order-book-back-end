import chai from 'chai';

function testHelpers() {
  global.chai = chai;
  global.expect = chai.expect;
}

export default testHelpers;
