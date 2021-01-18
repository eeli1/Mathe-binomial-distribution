class MyMath {
  roundPrecision(x, precision) {
    if (precision == -1) return x;
    return parseFloat(x.toFixed(precision));
  }

  power(a, x) {
    let result = a;
    for (let i = 1; i < x; i++) result *= a;
    return result;
  }

  factorial(n) {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
    let result = 1;
    for (let i = 1; i < n; i++) result *= i;
    return result;
  }

  nCr(n, r) {
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
    n = n + 1;
    let result = 1;
    for (let i = r; i < n; i++) result *= i;
    // console.log(result,this.factorial(n) / (this.factorial(r)));

    return result / this.factorial(n - r);
  }
}

class Binomial {
  constructor(precision) {
    this.precision = precision;
    this.math = new MyMath();
  }

  PMF(n, k, p) {
    let nCr = this.math.nCr(n, k);
    if (nCr == 0) return 0;

    let result = nCr * this.math.power(p, k) * this.math.power(1 - p, n - k);
    if (isNaN(result)) return 0;
    return this.math.roundPrecision(result, this.precision);
  }

  CDF(n, k, p) {
    let result = this.PMF(n, 0, p);

    for (let i = 1; i < k; i++) result += this.PMF(n, i, p);
    return this.math.roundPrecision(result, this.precision);
  }

  aproxCDFN(p, k, CDF) {
    for (let n = k; n < this.maxN; n++) {
      if (CDF > this.binomial.CDF(n, k, p)) return n;
    }
    return -1;
  }

  getCDFN(p, k, CDF) {
    for (let n = k; n < this.maxN; n++) {
      if (CDF == this.binomial.CDF(n, k, p)) return n;
    }

    return aproxCDFP(p, k, CDF);
  }

  aproxCDFP(n, k, CDF) {
    let max = this.math.power(10, this.precision);

    for (let p = max; p > 0; p--) {
      if (CDF < this.binomial.CDF(n, k, p / max)) return p / max;
    }
    return -1;
  }

  getCDFP(n, k, CDF) {
    let max = this.math.power(10, this.precision);

    for (let p = 0; p < max; p++) {
      if (CDF == this.binomial.CDF(n, k, p / max)) return p / max;
    }
    return aproxCDFP(n, k, CDF);
  }

  aproxPMFN(p, k, PMF) {
    let n1 = 0;
    let n2 = 0;

    for (let n = this.maxN; n > k; n--) {
      if (PMF <= this.binomial.PMF(n, k, p)) {
        n1 = n;
        break;
      }
    }

    if (n1 == 0) return -1;

    for (let n = k; n < this.maxN; n++) {
      if (PMF >= this.binomial.PMF(n, k, p)) {
        n2 = n;
        break;
      }
    }
    if (n2 == 0) return -1;

    return (n1 + n2) / 2;
  }

  getPMFN(p, k, PMF) {
    for (let n = k; n < this.maxN; n++) {
      if (PMF == this.binomial.PMF(n, k, p)) return n;
    }

    return aproxPMFN(p, k, PMF);
  }

  aproxPMFP(n, k, PMF) {
    let p1 = 0;
    let p2 = 0;

    let max = this.math.power(10, this.precision);

    for (let p = max; p > 0; p--) {
      if (PMF < this.binomial.CDF(n, k, p / max)) {
        p1 = p / max;
        break;
      }
    }
    if (p1 == 0) return -1;

    for (let p = 0; p < max; p--) {
      if (PMF > this.binomial.CDF(n, k, p / max)) {
        p2 = p / max;
        break;
      }
    }
    if (p2 == 0) return -1;

    return (p1 + p2) / 2;
  }

  getPMFP(n, k, PMF) {
    let max = this.math.power(10, this.precision);

    for (let p = 0; p < max; p++) {
      if (PMF == this.binomial.CDF(n, k, p / max)) return p / max;
    }

    return aproxPMFP(n, k, PMF);
  }
}
