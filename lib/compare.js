const Rule = require('./rule');
const Ruleset = require('./ruleset');
const OptionsDiff = require('./diff').OptionsDiff;


class Compare {
  constructor (eslintRules) {
    this._eslintRules = eslintRules;
  }

  rulesets (ruleset1, ruleset2) {
    const results = [];

    for (let ruleName in this._eslintRules) {
      const ruleMeta = this._eslintRules[ruleName];
      const ruleset1HasRule = ruleset1.hasRule(ruleName);
      const ruleset2HasRule = ruleset2.hasRule(ruleName);
      let rule1, rule2;

      const result = {
        'rule': ruleName,
        'description': ruleMeta.description,
        'url': ruleMeta.url,
        'set1HasRule': ruleset1HasRule,
        'set2HasRule': ruleset2HasRule,
        'bothHaveRule': ruleset1HasRule && ruleset2HasRule
      };

      if (ruleset1HasRule) {
        rule1 = ruleset1.getRule(ruleName);
        result.rule1ErrorLevel = rule1.errorLevel;
        result.rule1Options = rule1.hasOptions ? JSON.stringify(rule1.options, undefined, 2) : '';
      }

      if (ruleset2HasRule) {
        rule2 = ruleset2.getRule(ruleName);
        result.rule2ErrorLevel = rule2.errorLevel;
        result.rule2Options = rule2.hasOptions ? JSON.stringify(rule2.options, undefined, 2) : '';
      }

      if (result.bothHaveRule) {
        const optionsDiff = new OptionsDiff(rule1, rule2);

        result.errorLevelMatches = (rule1.errorLevel === rule2.errorLevel);
        result.optionsAreDifferent = optionsDiff.optionsAreDifferent;
        if (optionsDiff.bothHaveOptions) {
          result.bothHaveOptions = optionsDiff.bothHaveOptions;
          result.optionsAreEqual = optionsDiff.areEqual
        }
      }

      results.push(result);
    }

    return results;
  }
}

module.exports = Compare;
