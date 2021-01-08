function relodeElement(element) {
  if (document.getElementById(element.id) != undefined)
    document.getElementById(element.id).remove()
  return element
}

function validateN(n) {
  if (!(n > 0 && n < this.maxN)) {
    var err = "error n := {x \u220A \u2115* | x < " + this.maxN + "}"
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
  this.maxN = 100
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

function getCDFN(p, k, CDF) {
  for (let n = k; n < this.maxN; n++) {
    if (CDF >= this.binomial.CDF(n, k, p))
      return n
  }
  return -1
}

function getCDFP(n, k) {

}

function showCDFK(n, p, k) {

}

function showPMFK(n, p, k) {

}

function main() {
  setup()

  // let slider = createSlider({ min: 1, max: 100, default: 10, }, { default: 0.5 })
  // body.appendChild(slider)

  let k = 34
  let CDF = 0.9923
  let p = 0.5
  let n = getCDFN(p, k, CDF)
  console.log("n:", n, "CDF:", this.binomial.CDF(n, k, p))

  showTable(50, 0.5)


}