function noK() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  this.validate.validateN(n);

  let p = parseFloat(document.getElementById("pInput").value);
  this.validate.validateP(p);

  document.getElementById("CDF").value = this.drawDOM.noK(n, p);
}

function kEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  this.validate.validateN(n);

  let p = parseFloat(document.getElementById("pInput").value);
  this.validate.validateP(p);

  let k = parseFloat(document.getElementById("kEq").value);
  this.validate.validateK(k, n);

  document.getElementById("CDF").value = this.drawDOM.kEqual(n, p, k);
}

function kGreaterEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  this.validate.validateN(n);

  let p = parseFloat(document.getElementById("pInput").value);
  this.validate.validateP(p);

  let k = parseFloat(document.getElementById("kGEq").value);
  this.validate.validateK(k, n);

  document.getElementById("CDF").value = this.drawDOM.kGreaterEqual(n, p, k);
}

function kLessEqual() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  this.validate.validateN(n);

  let p = parseFloat(document.getElementById("pInput").value);
  this.validate.validateP(p);

  let k = parseFloat(document.getElementById("kLEq").value);
  this.validate.validateK(k, n);

  document.getElementById("CDF").value = this.drawDOM.kLessEqual(n, p, k);
}

function k1Tok2() {
  this.drawDOM.clear();

  let n = parseInt(document.getElementById("nInput").value) + 1;
  this.validate.validateN(n);

  let p = parseFloat(document.getElementById("pInput").value);
  this.validate.validateP(p);

  let k1 = parseFloat(document.getElementById("k1").value);
  this.validate.validateK(k1, n);

  let k2 = parseFloat(document.getElementById("k2").value);
  this.validate.validateK(k2, n);

  document.getElementById("CDF").value = this.drawDOM.k1Tok2(n, p, k1, k2);
}

function main() {
  this.drawDOM = new DrawDOM();
  this.validate = new Validate();
  document.getElementById("nInput").value = 50;
  document.getElementById("pInput").value = 0.5;
  noK();
}
