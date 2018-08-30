const fs = require('fs');
const path = require('path');

const Papa = require('papaparse');

const Compare = require('./lib/compare');
const Ruleset = require('./lib/ruleset');
const index = require('./lib/renderers/html/index');

const coreRules = require('./lib/eslint-rules');
const standardConfig = require('eslint-config-standard');
const xoConfig = require('eslint-config-xo');

const standardRuleset = new Ruleset(standardConfig, 'StandardJS');
const xoRuleset = new Ruleset(xoConfig, 'XO');
const compare = new Compare(coreRules.asHash);

const results = compare.rulesets(standardRuleset, xoRuleset);

const outputFile = path.resolve(__dirname, 'index.html');
const headers = [
  ['Rule', 'Description', 'Error level', 'Options'],
  ['StandardJS', 'XO', 'StandardJS', 'XO']
];

const bothAgreeResults = results.filter(result => result.bothHaveRule && result.errorLevelMatches && result.optionsAreEqual);
const diffErrorLevelResults = results.filter(result => result.bothHaveRule && !result.errorLevelMatches);
const diffOptionsResults = results.filter(result => result.bothHaveRule && result.optionsAreDifferent);

const context = {
  heading: `Comparison of ${standardRuleset.name} and ${xoRuleset.name} ESLint rules`,
  tableIds: [
    'rules-both-agree-on',
    'rules-both-set-but-with-different-error-levels',
    'rules-both-set-but-with-different-options',
    'all-eslint-rules'
  ],
  tableHeadings: [
    'Rules both agree on',
    'Rules both set but with different error levels',
    'Rules both set but with different options',
    'All ESlint rules'
  ],
  table: {
    headers: headers
  },
  masterResults: results,
  bothAgreeResults: bothAgreeResults,
  diffErrorLevelResults: diffErrorLevelResults,
  diffOptionsResults: diffOptionsResults
};

console.log(results);
console.log('');
fs.writeFileSync(outputFile, index(context), { encoding: 'utf8' });
console.log(`Output written to ${outputFile}`);
