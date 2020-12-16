function relodeElement(element) {
  if (document.getElementById(element.id) != undefined)
    document.getElementById(element.id).remove();
  return element;
}

function main() {
  var binomial = new Binomial(4);
  var body = document.body;

  // get input
  var n = document.getElementById("n_field").value;
  if (!(n > 0 && n < 100)) {
    var err = "error n := {x \u220A \u2115* | x < 100}";
    console.log(err);
    //body.appendChild(document.createTextNode(err));
    return;
  }
  var p = document.getElementById("p_field").value;
  if (!(p > 0 && p < 1)) {
    var err = "error p := {x \u220A \u211D | 0 < x < 1}";
    console.log(err);
    //body.appendChild(document.createTextNode(err));
    return;
  }

  // calculate values
  var pmf_values = [];
  var cdf_values = [];
  for (let k = 0; k < n; k++) {
    pmf_values.push(binomial.PMF(n, k, p));
    cdf_values.push(binomial.CDF(n, k, p));
  }

  // draw charts
  var chartPMF = createChart("Bn: P(X = k)", pmf_values);
  chartPMF.id = "PMF_chart";
  body.appendChild(relodeElement(chartPMF));
  var chartCDF = createChart("Bn: P(X \u2264 k)", cdf_values);
  chartCDF.id = "CDF_chart";
  body.appendChild(relodeElement(chartCDF));

  // generate table
  var table = generateTable(pmf_values, cdf_values);
  table.id = "table";
  body.appendChild(relodeElement(table));
}