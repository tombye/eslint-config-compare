function navigation (ids, headings) {
  let html = `<h2>Contents</h2>
<ul>
  `;
  
  ids.forEach((id, idx) => {
    html += `<li><a href="#${id}">${headings[idx]}</a></li>
  `;
  });

  html += `
</ul>`;

  return html;
};

module.exports = navigation;
