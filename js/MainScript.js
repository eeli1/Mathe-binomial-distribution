function relodeElement(element) {
  if (document.getElementById(element.id) != undefined)
    document.getElementById(element.id).remove();
  return element;
}

function setup() {

}

function update() {

}

function main() {
  var binomial = new Binomial(4);
  var body = document.body;


  // let slider = createSlider({ min: 1, max: 100, default: 10, }, { default: 0.5 });
  // body.appendChild(slider)

  //  create canvas
  let data = [1, 2, 3, 4, 5];

  let color1 = { r: 255, g: 99, b: 132 }
  let color2 = { r: 87, g: 99, b: 255 }
  let mask = [false, true, true, false, false]
  body.appendChild(createChart("Bn (X = k)", data, mask, color1, color2))

  /*
  // get input
  var n = 10 // document.getElementById("n_field").value;
  if (!(n > 0 && n < 100)) {
    var err = "error n := {x \u220A \u2115* | x < 100}";
    console.log(err);
    //body.appendChild(document.createTextNode(err));
    return;
  }
  var p = 0.5 // document.getElementById("p_field").value;
  if (!(p > 0 && p < 1)) {
    var err = "error p := {x \u220A \u211D | 0 < x < 1}";
    console.log(err);
    //body.appendChild(document.createTextNode(err));
    return;
  }

  // calculate values
  var pmfValues = [];
  var cdfValues = [];
  for (let k = 0; k < n; k++) {
    pmfValues.push(binomial.PMF(n, k, p));
    cdfValues.push(binomial.CDF(n, k, p));
  }

  // draw charts
  var chartPMF = createChart("Bn: P(X = k)", pmfValues);
  chartPMF.id = "PMF_chart";
  body.appendChild(relodeElement(chartPMF));
  var chartCDF = createChart("Bn: P(X \u2264 k)", cdfValues);
  chartCDF.id = "CDF_chart";
  body.appendChild(relodeElement(chartCDF));

  // generate table
  var table = generateTable(pmfValues, cdfValues);
  table.id = "table";
  body.appendChild(relodeElement(table));
  */
}