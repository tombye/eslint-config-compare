const path = require('path');

const Rule = require(path.resolve(__dirname, 'rule'));


class Comparison {
  constructor (rule1, rule2) {
  
  }
}


class Comparator {
  constructor (eslintRules, ruleset1, ruleset2) {
    this._eslintRules = eslintRules;
    this._ruleset1 = ruleset1;
    this._ruleset2 = ruleset2;
  }

  compare () {
    const coreRuleKeys = Object.keys(this._eslintRules);
    const results = [];
    
    coreRuleKeys.forEach(key => {
      const result = {
        'rule': key
      };
      let keyIn1 = 'set';
      let keyIn2 = 'set';

      if (!(key in this._ruleset1)) {
        keyIn1 = 'left as the default';
      }

      if (!(key in this._ruleset2)) {
        keyIn2 = 'left as the default';
      }

      result.isSet = `This rule is ${keyIn1} for Standard and ${keyIn2} for XO`;

      results.push(result);
    });

    return results;
  }
};

module.exports = Comparator;
