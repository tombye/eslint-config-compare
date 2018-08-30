const path = require('path');

const styles = require(path.resolve(__dirname, 'styles'));

function layout (main, title) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>${title}</title>
    ${styles()}
  </head>
  <body>
    <main>
    ${main}
    </main>
  </body>
</html>`;
};

module.exports = layout;
