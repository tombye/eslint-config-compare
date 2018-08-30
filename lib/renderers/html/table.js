function table (headers, results, heading, headingId) {
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

  function _body () {
    let html = '';

    results.forEach(result => {
      html += `<tr>
    <td><a href="${result.url}">${result.rule}</a></td>
    <td>${result.description}</td>
    <td>${result.rule1ErrorLevel || ''}</td>
    <td>${result.rule2ErrorLevel || ''}</td>
    <td><pre>${result.rule1Options || ''}</pre></td>
    <td><pre>${result.rule2Options || ''}</pre></td>
  </tr>`;
    });

    return html;
  };

  return `<h2 id="${headingId}">${heading} (${results.length})</h2>
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
