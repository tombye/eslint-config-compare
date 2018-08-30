const is = require('is');
const pointer = require('json-pointer');


class Rule {
  constructor (key, data) {
    this._name = key;
    this._errorLevel = this._getErrorLevel(data);
    this._options = this._getOptions(data);
    if (this.hasOptions) {
      this._optionsHash = this._getOptionsHash();
    }
  }

  _getErrorLevel (data) {
    return (is.string(data)) ? data : data[0];
  }

  _getOptions (data) {
    // only rules with options have their value in an array
    if (Array.isArray(data)) {
      return data.slice(1);
    }
    return [];
  }

  _getOptionsHash () {
    const base = pointer(this._options).dict();
    const collections = {};
    const self = this;


    function getType (value) {
      const valueType = typeof value;

      if (valueType === 'object') {
          return is.array(value) ? 'array' : 'object';
      }
      else {
        return valueType;
      }
    };

    function getCollectionsFromPath (path) {
      const parts = pointer.parse(path);
      let parentPath;

      if (parts.length > 1) {
        parts.pop();

        parentPath = pointer.compile(parts);

        if (!(parentPath in collections)) {
          let value = pointer.get(self._options, parentPath);

          collections[parentPath] = {
            'value': value,
            'type': getType(value)
          };
        }

        getCollectionsFromPath(parentPath);
      }
    };

    for (let path in base) {
      base[path] = {
        'value': base[path],
        'type': getType(base[path])
      };
      getCollectionsFromPath(path);
    };

    return Object.assign(base, collections);
  }

  get name () {
    return this._name;
  }

  get errorLevel () {
    return this._errorLevel;
  }

  get hasOptions () {
    return !!this._options.length;
  }

  get options () {
    return this._options;
  }

  get optionsHash () {
    return this.hasOptions ? this._optionsHash : {};
  }
};

module.exports = Rule;
