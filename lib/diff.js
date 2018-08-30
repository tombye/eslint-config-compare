const _ = require('underscore');

const assert = require('assert');


class OptionsDiff {
  constructor (rule1, rule2) {
    this.rule1 = rule1;
    this.rule2 = rule2;
    this._sharedPointers = this._getSharedPointers()
    if (this.bothHaveOptions) {
      this.areEqual = this._optionsAreEqual()
    }
  }

  _optionsAreEqual () {
    return _.isEqual(this.rule1.options, this.rule2.options)
  }

  _getSharedPointers () {
    const pointers = {};
    
    Object.keys(this.rule1.optionsHash).forEach(key => {
      pointers[key] = [true, false];
    });

    Object.keys(this.rule2.optionsHash).forEach(key => {
      if (key in pointers) {
        pointers[key][1] = true;
      }
      else {
        pointers[key] = [false, true];
      }
    });

    return pointers;
  }

  get eitherHasOptions () {
    return (this.rule1.hasOptions || this.rule2.hasOptions);
  }

  get bothHaveOptions () {
    return (this.rule1.hasOptions && this.rule2.hasOptions)
  }

  get onlyOneHasOptions () {
    return (this.rule1.hasOptions && !this.rule2.hasOptions) || (!this.rule1.hasOptions && this.rule2.hasOptions);
  }

  get optionsAreDifferent () {
    return (this.bothHaveOptions && !this._optionsAreEqual()) || this.onlyOneHasOptions;
  }

  get reportDict () {
    const report = {};
    let optionIncluded, option1, option2;

    for (let pointer in this._sharedPointers) {
      option1 = this.rule1.optionsHash[pointer];
      option2 = this.rule2.optionsHash[pointer];
      optionIncluded = this._sharedPointers[pointer];

      report[pointer] = {
        'inRule1': optionIncluded[0],
        'inRule2': optionIncluded[1],
        'isEqual': false
      };

      if ((optionIncluded[0] && optionIncluded[1]) && (!['object', 'array'].includes(option1.type))) {
        report[pointer].rule1OptionValue = option1.value;
        report[pointer].rule2OptionValue = option2.value;
        report[pointer].isEqual = (option1.value === option2.value);
      }
    }

    return report;
  }
}

module.exports = {
  'OptionsDiff': OptionsDiff
};
