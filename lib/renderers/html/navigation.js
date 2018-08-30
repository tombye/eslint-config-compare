function navigation (headings) {
  const ids = headings.map(heading => heading.toLowerCase().replace(/\s/g, '-'));

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
