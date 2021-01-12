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
  this.precision = 4
  this.binomial = new Binomial(this.precision)
  this.math = new MyMath()
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
  makeChart("Bn: P(X = k)", "PMF_chart", pmfValues, mask)
  makeChart("Bn: P(X \u2264 k)", "CDF_chart", cdfValues, mask)

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

function getCDFP(n, k, CDF) {
  for (let p = 0; p < this.math.power(10, this.precision); p++) {
    if (CDF < this.binomial.CDF(n, k, p / this.math.power(10, this.precision)))
      return p / this.math.power(10, this.precision)
  }
  return -1
}

function showCDFK(n, p, k) {
  if (!validateP(p) || !validateN(n))
    return

}

function makeChart(name, id, values, mask) {
  var chart = createChart(name, values, mask, this.color1, this.color2)
  chart.id = id
  this.body.appendChild(relodeElement(chart))
}

function showPMFK(n, p, k) {

  if (k > n)
    return
  if (!validateP(p) || !validateN(n))
    return

  var pmfValues = []
  var mask = []
  for (let i = 0; i < n; i++) {
    pmfValues.push(this.binomial.PMF(n, k, p))
    if (i == k)
      mask.push(false)
    else
      mask.push(true)
  }
}

function main() {
  setup()

  // let slider = createSlider({ min: 1, max: 100, default: 10, }, { default: 0.5 })
  // body.appendChild(slider)

  let k = 30
  let CDF = 0.8987
  let n = 50
  let p = getCDFP(n, k, CDF)
  console.log("p:", p, "CDF:", this.binomial.CDF(n, k, p))

  showTable(50, 0.5)


}