const results = [['Rule', 'Description', 'StandardJS error level', 'StandardJS options']];

coreRules.asArray.forEach(rule => {
  const [ key, description ] = rule;
  let line = rule.slice(0, 2);

  if (key in standardRules) {
    let standardValue = standardRules[key];

    if (typeof standardValue === 'string') {
      errorLevel = standardValue;

      line.push(errorLevel);
    }
    else {
      errorLevel = standardValue.shift();

      line.push(errorLevel);
      line.push(argsToString(...standardValue));
    }
  }
  else { // not set by standard
    line = line.concat(["", ""]); 
  }

  results.push(line);
});

process.stdout.write(Papa.unparse(results, { 'quotes': true }));
