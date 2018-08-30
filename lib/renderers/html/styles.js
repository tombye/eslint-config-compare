function styles () {
  return `<style>
  body {
    font-family: Helvetica, Arial, sans-serif;
  }

  .visuallyhidden {
    position: absolute;
    left: -9999em;
  }

  li {
    margin-bottom: 5px;
  }

  table {
    border-collapse: collapse;
  }

  table td, table th {
    border: solid 2px #333;
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

  .has-differences {
    background: #fdcf7a;
  }

  .is-set,
  .both-set {
    background: #8df98d;
  }

  .not-set {
    background: #f58f8f;
  }

  .inline-heading {
    font-weight: bold;
    float: left;
    margin-right: 10px;
  }

  dt, dd {
    display: inline;
    margin: 0;
  }

  dd {
    margin-right: 15px;
  }

  .swatch {
    display: inline-block;
    border: 1px solid #333;
    width: 0.75em;
    height: 0.75em;
  }

  .set1Cell.is-set,
  .set1Cell.not-set,
  .set1Cell.has-differences,
  .set1Cell.has-differences {
    border-right: none;
  }

  .set2Cell.is-set,
  .set2Cell.not-set,
  .set2Cell.has-differences,
  .set2Cell.has-differences {
    border-left-style: dotted;
  }
</style>`;
};

module.exports = styles;
