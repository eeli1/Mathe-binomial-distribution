class Validate {
  validateN(n) {
    if (!(n > 0 && n < this.maxN)) {
      console.error("n := {x \u220A \u2115* | x < " + this.maxN + "}");
      return false;
    }
    return true;
  }

  validateP(p) {
    if (!(p > 0 && p < 1)) {
      console.error("p := {x \u220A \u211D | 0 < x < 1}");
      return false;
    }
    return true;
  }

  validateK(k, n) {
    if (k > n) {
      console.error("k < n");
      return false;
    }
    return true;
  }
}
