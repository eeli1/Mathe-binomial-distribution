



function relodeElement(element) {
  if (document.getElementById(element.id) != undefined)
    document.getElementById(element.id).remove()
  return element
}

function validateN(n) {
  if (!(n > 0 && n < 100)) {
    var err = "error n := {x \u220A \u2115* | x < 100}"
    console.log(err)
    //body.appendChild(document.createTextNode(err))
    return false
  }

  return true
}

function validateP(p) {
  if (!(p > 0 && p < 1)) {
    var err = "error p := {x \u220A \u211D | 0 < x < 1}"
    console.log(err)
    //body.appendChild(document.createTextNode(err))
    return false
  }

  return true
}

function setup() {
  this.binomial = new Binomial(4)
  this.body = document.body
  this.color1 = { r: 255, g: 99, b: 132 }
  this.color2 = { r: 87, g: 99, b: 255 }
}

function update() {

}

function showTable(n, p) {

  if (!validateP(p) || !validateN(n))
    return

  // calculate values
  var pmfValues = []
  var cdfValues = []
  var mask = []
  for (let k = 0; k < n; k++) {
    pmfValues.push(this.binomial.PMF(n, k, p))
    cdfValues.push(this.binomial.CDF(n, k, p))
    mask.push(true)
  }

  // draw charts
  var chartPMF = createChart("Bn: P(X = k)", pmfValues, mask, this.color1, this.color2)
  chartPMF.id = "PMF_chart"
  this.body.appendChild(relodeElement(chartPMF))
  var chartCDF = createChart("Bn: P(X \u2264 k)", cdfValues, mask, this.color1, this.color2)
  chartCDF.id = "CDF_chart"
  this.body.appendChild(relodeElement(chartCDF))

  // generate table
  var table = generateTable(pmfValues, cdfValues)
  table.id = "table"
  this.body.appendChild(relodeElement(table))
}



function main() {
  setup()

  // let slider = createSlider({ min: 1, max: 100, default: 10, }, { default: 0.5 })
  // body.appendChild(slider)


  showTable(30, 0.5)

}