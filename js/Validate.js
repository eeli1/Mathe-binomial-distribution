class Validate {
  constructor(drawDOM, maxN) {
    this.maxN = maxN;
    this.drawDOM = drawDOM;
  }
  validateN(n) {
    if (!(n > 0 && n < this.maxN)) {
      this.drawDOM.showError("n := {x \u220A \u2115* | x < " + this.maxN + "}");
      return false;
    }
    return true;
  }

  validateP(p) {
    if (!(p > 0 && p < 1)) {
      this.drawDOM.showError("p := {x \u220A \u211D | 0 < x < 1}");
      return false;
    }
    return true;
  }

  validateK(k, n) {
    if (k > n) {
      this.drawDOM.showError("k < n");
      return false;
    }
    return true;
  }

  validateCDF(CDF) {
    if (!(CDF > 0 && CDF < 1)) {
      this.drawDOM.showError("CDF := {x \u220A \u211D | 0 < x < 1}");
      return false;
    }
    return true;
  }
}
