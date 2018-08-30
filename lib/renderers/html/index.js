const path = require('path');

const layout = require(path.resolve(__dirname, 'layout'));
const table = require(path.resolve(__dirname, 'table'));
const heading = require(path.resolve(__dirname, 'heading'));


function index (context) {
  const content = [
    heading(context.heading),
    table(context.table.headers, context.bothAgreeResults, 'Rules both agree on'),
    table(context.table.headers, context.diffErrorLevelResults, 'Rules both set but with different error levels'),
    table(context.table.headers, context.diffOptionsResults, 'Rules both set but with different options'),
    table(context.table.headers, context.masterResults, 'All ESlint rules')
  ].join("\n\n");
  return layout(
    content
  );
};

module.exports = index;
