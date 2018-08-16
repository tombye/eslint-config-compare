const path = require('path');
const fs = require('fs');

const Papa = require('papaparse');
const rulesLoader = require(
  path.resolve(__dirname, '..', 'node_modules', 'eslint', 'lib', 'load-rules.js'));


const rulesFiles = rulesLoader();
const rulesHash = {};
const headers = [['Rule', 'Description']];
let rulesArray = [];

function processOptions (options) {
  return JSON.stringify(options, undefined, 2);
};

for (let key in rulesFiles) {
  const pathToFile = rulesFiles[key];
  const rule = require(pathToFile);
  const description = rule.meta.docs.description;

  rulesHash[key] = {
    'description': description
  };
  rulesArray.push([key, description]);
};

// Sort all ordered types
rulesArray = rulesArray.sort();
rulesCSV = Papa.unparse(headers.concat(rulesArray), { 'quotes': true });

module.exports = {
  asHash: rulesHash,
  asArray: rulesArray,
  asCSV: rulesCSV
};
