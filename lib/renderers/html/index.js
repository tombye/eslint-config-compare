const path = require('path');

const layout = require(path.resolve(__dirname, 'layout'));
const table = require(path.resolve(__dirname, 'table'));
const heading = require(path.resolve(__dirname, 'heading'));
const navigation = require(path.resolve(__dirname, 'navigation'));


function index (context) {
  const content = [
    heading(context.heading),
    navigation(context.tableIds, context.tableHeadings),
    table(context.table.headers, context.bothAgreeResults, context.tableHeadings[0], context.tableIds[0]),
    table(context.table.headers, context.diffErrorLevelResults, context.tableHeadings[1], context.tableIds[1]),
    table(context.table.headers, context.diffOptionsResults, context.tableHeadings[2], context.tableIds[2]),
    table(context.table.headers, context.masterResults, context.tableHeadings[3], context.tableIds[3])
  ].join("\n\n");
  return layout(
    content
  );
};

module.exports = index;
