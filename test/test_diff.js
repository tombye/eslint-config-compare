const path = require('path');

const expect = require('chai').expect;
const Diff = require(path.resolve(__dirname, '../lib/diff.js'))


describe('diff', function () {
  it('should mark when value 1 is undefined', function () {
    const diff = new Diff('foo', undefined);

    expect(diff.hasVal1).to.equal(true);
  });

  it('should mark when value 2 is undefined', function () {
    const diff = new Diff(undefined, 'foo');

    expect(diff.hasVal2).to.equal(true);
  });

  it('should mark when both values are set and are equal', function () {
    const diff = new Diff('foo', 'foo');

    expect(diff.hasEqualValues).to.equal(true);
  });

  it('should mark when both values are set and are not equal', function () {
    const diff = new Diff('foo', 'bar');

    expect(diff.hasEqualValues).to.equal(false);
  });
});
