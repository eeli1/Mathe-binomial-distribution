class MyMath {
  roundPrecision(x, precision) {
    return parseFloat(x.toFixed(precision));
  }

  power(a, x) {
    var result = a;
    for (var i = 1; i < x; i++) result *= a;
    return result;
  }

  factorial(n) {
    if (isNaN(n)) return 1;
    if (n <= 1) return 1;
    else return n * this.factorial(n - 1);
  }

  nCr(n, r) {
    if (r == 0) return 0;
    if (n > 10000) return "error";
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }
}

class Binomial {
  constructor(precision) {
    this.precision = precision;
    this.math = new MyMath();
  }

  PMF(n, k, p) {
    var nCr = this.math.nCr(n, k);
    if (nCr == "error") return Infinity;
    else if (nCr == 0) return 0;

    var result = nCr * this.math.power(p, k) * this.math.power(1 - p, n - k);
    if (isNaN(result)) return 0;
    return this.math.roundPrecision(result, this.precision);
  }

  CDF(n, k, p) {
    // console.log(result)
    var result = this.PMF(n, 0, p);

    for (var i = 1; i < k; i++) result += this.PMF(n, i, p);
    return this.math.roundPrecision(result, this.precision);
  }
}
