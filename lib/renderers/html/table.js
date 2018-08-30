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

  function errorLevel1Class (result) {
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
  };

  function errorLevel2Class (result) {
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
  };

  function options1Class (result) {
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
  };

  function options2Class (result) {
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
  };

  function _body () {
    let html = '';

    results.forEach(result => {
      html += `<tr>
    <td><a href="${result.url}">${result.rule}</a></td>
    <td>${result.description}</td>
    <td class="set1Cell ${errorLevel1Class(result)}">${result.rule1ErrorLevel || ''}</td>
    <td class="set2Cell ${errorLevel2Class(result)}">${result.rule2ErrorLevel || ''}</td>
    <td class="set1Cell ${options1Class(result)}"><pre>${result.rule1Options || ''}</pre></td>
    <td class="set2Cell ${options2Class(result)}"><pre>${result.rule2Options || ''}</pre></td>
  </tr>`;
    });

    return html;
  };

  return `<h2 id="${headingId}">${heading} (${results.length})</h2>
<p>
  <span class="inline-heading">Key:<span> 
  <dl>
    <dt><span class="swatch is-set"><span class="visuallyhidden">Green</span></span></dt>
    <dd>Set</dd>
    <dt><span class="swatch not-set"><span class="visuallyhidden">Red</span></span></dt>
    <dd>Not set</dd>
    <dt><span class="swatch has-differences"><span class="visuallyhidden">Orange</span></span></dt>
    <dd>Has differences</dd>
  </dl>
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
