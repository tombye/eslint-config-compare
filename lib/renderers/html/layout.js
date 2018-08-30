const path = require('path');

const styles = require(path.resolve(__dirname, 'styles'));

function layout (main) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
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
