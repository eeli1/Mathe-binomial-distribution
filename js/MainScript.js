function noK() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  if (isNaN(n) || isNaN(p)) {
    this.drawDOM.showError("n und p müssen definirt sein");
    return;
  } else {
    if (!this.validate.validateN(n) || !this.validate.validateP(p)) return;
    document.getElementById("CDF").value = this.drawDOM.noK(n, p);
  }
}

/*
function nIsNaN(p, k, CDF, lamdaN, lamdaCDFDraw) {
  if (!this.validate.validateP(p) || !this.validate.validateCDF(CDF)) return;
  let n = lamdaN(p, k, CDF);
  document.getElementById("nInput").value = n;
  document.getElementById("CDF").value = lamdaCDFDraw(n, p, k);
}

function pIsNaN(n, k, CDF, lamdaP, lamdaCDFDraw) {
  if (
    !this.validate.validateN(n) ||
    !this.validate.validateCDF(CDF) ||
    !this.validate.validateK(k, n)
  )
    return;
  p = lamdaP(n, k, CDF);
  document.getElementById("pInput").value = p;
  document.getElementById("CDF").value = lamdaCDFDraw(n, p, k);
}

function kIsNaN(n, p, CDF, lamdaK, lamdaCDFDraw) {
  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateCDF(CDF)
  )
    return;
  k = lamdaK(n, p, CDF);
  document.getElementById(kId).value = k;
  document.getElementById("CDF").value = lamdaCDFDraw(n, p, k);
}

function CDFIsNaN(n, p, k, lamdaCDFDraw) {
  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateK(k, n)
  )
    return;
  document.getElementById("CDF").value = lamdaCDFDraw(n, p, k);
}

function showForK(kId, lamdaCDFDraw, lamdaN, lamdaP, lamdaK) {
  // clear DOM
  this.drawDOM.clear();

  // get input
  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  let k = parseInt(document.getElementById(kId).value);
  let CDF = parseFloat(document.getElementById("CDF").value);

  // draw and validate
  if (isNaN(n) && !isNaN(p) && !isNaN(k) && !isNaN(CDF)) {
    nIsNaN(p, k, CDF, lamdaN, lamdaCDFDraw);
  } else if (!isNaN(n) && isNaN(p) && !isNaN(k) && !isNaN(CDF)) {
    pIsNaN(n, k, CDF, lamdaP, lamdaCDFDraw);
  } else if (!isNaN(n) && !isNaN(p) && isNaN(k) && !isNaN(CDF)) {
    kIsNaN(n, p, CDF, lamdaK, lamdaCDFDraw);
  } else if (!isNaN(n) && !isNaN(p) && !isNaN(k) && isNaN(CDF)) {
    CDFIsNaN(n, p, k, lamdaCDFDraw);
  } else if (!isNaN(n) && !isNaN(p) && !isNaN(k) && !isNaN(CDF)) {
    CDFIsNaN(n, p, k, lamdaCDFDraw);
  } else {
    this.drawDOM.showError("3 der werte (n, p, k, CDF) müssen definirt sein");
  }
}

function kEqual() {
  showForK(
    "kEq",
    (n, p, k) => this.drawDOM.kEqual(n, p, k),
    (p, k, PMF) => this.binomial.getPMFN(p, k, PMF),
    (n, k, PMF) => this.binomial.getPMFP(n, k, PMF),
    (n, p, PMF) => this.binomial.getPMFK(n, p, PMF)
  );
}
*/

function kEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  let k = parseFloat(document.getElementById("kEq").value);

  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateK(k, n)
  )
    return;
  document.getElementById("CDF").value = this.drawDOM.kEqual(n, p, k);
}

function kGreaterEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  let k = parseFloat(document.getElementById("kGEq").value);

  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateK(k, n)
  )
    return;
  document.getElementById("CDF").value = this.drawDOM.kGreaterEqual(n, p, k);
}

function kLessEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  let k = parseFloat(document.getElementById("kLEq").value);

  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateK(k, n)
  )
    return;

  document.getElementById("CDF").value = this.drawDOM.kLessEqual(n, p, k);
}

function k1Tok2() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  let p = parseFloat(document.getElementById("pInput").value);
  let k1 = parseInt(document.getElementById("k1").value);
  let k2 = parseInt(document.getElementById("k2").value);

  if (
    !this.validate.validateN(n) ||
    !this.validate.validateP(p) ||
    !this.validate.validateK(k1, n) ||
    !this.validate.validateK(k2, n)
  )
    return;
  if (k1 > k2) this.drawDOM.showError("k1 < k2");
  document.getElementById("CDF").value = this.drawDOM.k1Tok2(n, p, k1, k2);
}

function main(maxN, precision, defaltN, defaltP) {
  this.binomial = new Binomial();
  this.drawDOM = new DrawDOM(maxN, precision, binomial);
  this.validate = new Validate(this.drawDOM);
  document.getElementById("nInput").value = defaltN;
  document.getElementById("pInput").value = defaltP;
  noK();
}
