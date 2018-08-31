function table (headers, results, heading) {
  const headingId = heading.toLowerCase().replace(/\s/g, '-');
  const DIFFERENCES = 'has-differences';
  const BOTH_SET = 'both-set';
  const SET = 'is-set';
  const UNSET = 'not-set';

  function _headers () {
    let html = '<tr>';
    
    headers[0].forEach((header, idx) => {
      if (idx < 2) {
        html += `
      <th class="table-${header.toLowerCase()}" rowspan="2">${header}</th>`;
      }
      else {
        html += `
      <th colspan="2">${header}</th>`;
      }
    });

    html += `
    </tr>`;
    html += `
    <tr>`;

    headers[1].forEach((header, idx) => {
      html += `<th>${header}</th>`;
    });

    return `${html}
    </tr>`;
  };

  const cellClasses = {
    rule1ErrorLevel: function (result) {
      if (result.bothHaveRule) {
        if (!result.errorLevelMatches) {
          return DIFFERENCES;
        }
        return BOTH_SET;
      }
      if (result.set1HasRule) {
        return SET;
      }
      if (!result.set1HasRule) {
        return UNSET;
      }
      return '';
    },
    rule2ErrorLevel: function (result) {
      if (result.bothHaveRule) {
        if (!result.errorLevelMatches) {
          return DIFFERENCES;
        }
        return BOTH_SET;
      }
      if (result.set2HasRule) {
        return SET;
      }
      if (!result.set2HasRule) {
        return UNSET;
      }
      return '';
    },
    rule1Options: function (result) {
      if (result.bothHaveOptions) {
        if (result.optionsAreDifferent) {
          return DIFFERENCES;
        }
        return BOTH_SET;
      }
      if (Boolean(result.rule1Options)) {
        return SET;
      }
      if (!Boolean(result.rule1Options)) {
        return UNSET;
      }
      return '';
    },
    rule2Options: function (result) {
      if (result.bothHaveOptions) {
        if (result.optionsAreDifferent) {
          return DIFFERENCES;
        }
        return BOTH_SET;
      }
      if (Boolean(result.rule2Options)) {
        return SET;
      }
      if (!Boolean(result.rule2Options)) {
        return UNSET;
      }
      return '';
    }
  };

  function _code (value) {
    return `<pre>${value}</pre>
    `;
  };

  function _cell (result, cellType) {
    const isOptions = cellType.match(/Options$/);

    if (cellType === 'rule') {
      return `<td><a href="${result.url}">${result.rule}</a></td>
    `;
    }
    if (cellType === 'description') {
      return `<td>${result[cellType] || ''}</td>
  `;
    }
    else { // data cells
      if (cellType in cellClasses) {
        return `<td class="${cellClasses[cellType](result)}">
        ${isOptions ? _code(result[cellType]) : result[cellType]}
        </td>
    `;
      }
    }
  };

  const _mergedCell = function () {
    let mergeFlag = false;

    return function (result, cellType) {
      if (!mergeFlag) {
        mergeFlag = true;
        return `<td class="${SET}" colspan="2">
        Both are set to:
        ${_code(result[cellType])}
        </td>`;
      }
      else {
        mergeFlag = false;
        return '';
      }
    };
  }();

  function _key () {
    return `<p>
    <span class="inline-heading">Key:<span> 
  </p>
  <dl>
    <dt><span class="swatch is-set"><span class="visuallyhidden">Green</span></span></dt>
    <dd>Set</dd>
    <dt><span class="swatch not-set"><span class="visuallyhidden">Red</span></span></dt>
    <dd>Not set</dd>
    <dt><span class="swatch has-differences"><span class="visuallyhidden">Orange</span></span></dt>
    <dd>Has differences</dd>
  </dl>`;
  };

  function _body () {
    const cells = [
      'rule',
      'description',
      'rule1ErrorLevel',
      'rule2ErrorLevel',
      'rule1Options',
      'rule2Options'
    ];
    let html = '';

    results.forEach(result => {
      html += `<tr>
    `;

      cells.forEach(cellType => {
        if (cellType.match(/Options$/) && result.optionsAreEqual) {
          html += _mergedCell(result, cellType);
        }
        else {
          html += _cell(result, cellType);
        }
      });

      html += `
    </tr>`;
    });

    return html;
  };

  return `<h2 id="${headingId}">${heading} (${results.length})</h2>
  ${_key()}
<table>
  <thead>
    ${_headers()}
  </thead>
  <tbody>
    ${_body()}
  </tbody>
</table>`;
};

module.exports = table;
