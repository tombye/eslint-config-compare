const path = require('path');

const expect = require('chai').expect;
const is = require('is');

const Rule = require(path.resolve(__dirname, '../lib/rule.js'));


describe('rule', function () {
  describe('with no options', function () {
    let rule;

    beforeEach(function () {
      rule = new Rule('rule1', 'error');
    });

    it('should set the rule name', function () {
      expect(rule.name).to.equal('rule1');
    });

    it('should set the error level', function () {
      expect(rule.errorLevel).to.equal('error');
    });

    it('should set the options as an empty array', function () {
      expect(is.array(rule.options)).to.equal(true);
      expect(rule.options).to.be.empty;
    });

    it('should set the optionsHash as an empty object', function () {
      expect(is.object(rule.optionsHash)).to.equal(true);
      expect(rule.optionsHash).to.be.empty;
    });

    it('should set the hasOptions flag to false', function () {
      expect(rule.hasOptions).to.equal(false);
    });
  });

  describe('with a single string option', function () {
    let rule;

    beforeEach(function () {
      rule = new Rule('rule1', ['error', 'always']);
    });

    it('should set the error level', function () {
      expect(rule.errorLevel).to.equal('error');
    });

    it('should set the options as an array with a single string', function () {
      expect(is.array(rule.options)).to.equal(true);
      expect(rule.options).to.deep.equal(['always']);
    });

    it('should set the optionsHash as a hash with a JSON pointer : value and var type map', function () {
      expect(is.object(rule.optionsHash)).to.equal(true);
      expect(rule.optionsHash).to.deep.equal({'/0': { 'value': 'always', 'type': 'string' }});
    });

    it('should set the hasOptions flag to false', function () {
      expect(rule.hasOptions).to.equal(true);
    });
  });

  describe('with a single object option with a prop set to a boolean value', function () {
    let rule;

    beforeEach(function () {
      rule = new Rule('rule1', ['error', { allowElsif: false }]);
    });

    it('should set the error level', function () {
      expect(rule.errorLevel).to.equal('error');
    });

    it('should set the options as an array with the object as the first entry', function () {
      expect(is.array(rule.options)).to.equal(true);
      expect(rule.options).to.deep.equal([{ allowElsif: false }]);
    });

    it('should set the optionsHash as a hash mapping JSON pointers to each value in the option', function () {
      expect(is.object(rule.optionsHash)).to.equal(true);

      expect(rule.optionsHash).to.deep.equal({
        '/0': { 'value': { allowElsif: false }, type: 'object' },
        '/0/allowElsif': { 'value': false, type: 'boolean' }
      });
    });

    it('should set the hasOptions flag to false', function () {
      expect(rule.hasOptions).to.equal(true);
    });
  });
});
