function styles () {
  return `<style>
  body {
    font-family: Helvetica, Arial, sans-serif;
  }

  table {
    border-collapse: collapse;
  }

  table td, table th {
    border: solid 1px #333;
    padding: 0.5em;
  }

  table td {
    vertical-align: top;
  }

  .table-rule {
    width: 15%;
  }

  .table-description {
    width: 30%;
  }
</style>`;
};

module.exports = styles;
