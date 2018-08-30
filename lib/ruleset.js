const Rule = require('./rule');


class Ruleset {
  constructor (data, name) {
    this._name = name;
    this._rules = this._processRules(data.rules);
  }

  _processRules (rules) {
    const _rules = {};

    for (let key in rules) {
      _rules[key] = new Rule(key, rules[key]);
    }

    return _rules;
  }

  get name () {
    return this._name;
  }

  get keys () {
    return Object.keys(this._rules);
  }

  get name () {
    return this._name;
  }

  getRule (rule) {
    if (this.hasRule(rule)) {
      return this._rules[rule];
    }
    return false;
  }

  hasRule (rule) {
    return this.keys.includes(rule);
  }

  getOptionsForRule (rule) {
    if (this.hasRule(rule)) {
      return this._rules[rule].optionsHash;
    }
    else {
      return undefined;
    }
  }
}

module.exports = Ruleset;
