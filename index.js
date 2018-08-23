const fs = require('fs');
const path = require('path');

const Papa = require('papaparse');

const Comparator = require('./lib/comparator.js');

const coreRules = require('./lib/eslint-rules.js');
const standardConfig = require('eslint-config-standard');
const xoConfig = require('eslint-config-xo');


const comparator = new Comparator(coreRules.asHash, standardConfig.rules, xoConfig.rules);

console.log(comparator.compare());
