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

class Approximater {
  constructor() {
    this.math = new MyMath();
  }

  binSearch(lamda, y, minimal, maximal, precision) {
    var x = (minimal + maximal) / 2;

    if (this.math.roundPrecision(lamda(x), precision) == y) return x;
    if (this.math.roundPrecision(lamda(x), precision) < y)
      return binSearch(lamda, y, x, maximal);
    if (this.math.roundPrecision(lamda(x), precision) > y)
      return this.binSearch(lamda, y, minimal, x);
  }

  findeMax(lamda, y, x) {
    if (lamda(x) > y) return x;
    return this.findeMax(lamda, y, x * 2);
  }

  findeMax(lamda, y, x) {
    if (lamda(x) > y) return x;
    return this.findeMax(lamda, y, x * 2);
  }

  approximate(lamda, y, precision) {
    var minimal = 0;
    var maximal = this.findeMax(lamda, y, 2);

    return this.binSearch(lamda, y, minimal, maximal, precision);
  }

  approximateMinStart(lamda, y, minStart, precision) {
    var minimal = minStart;
    var maximal = this.findeMax(lamda, y, minStart);

    return this.binSearch(lamda, y, minimal, maximal, precision);
  }

  approximateMaxStart(lamda, y, maxStart, precision) {
    var minimal = 0;
    var maximal = maxStart;

    return this.binSearch(lamda, y, minimal, maximal, precision);
  }

  approximateProcent(lamda, y, precision) {
    var minimal = 0;
    var maximal = 1;

    return this.binSearch(lamda, y, minimal, maximal, precision);
  }
}
class Binomial {
  constructor(precision) {
    this.precision = precision;
    this.approx = new Approximater();
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

  CDF_Get_n(P, k, p) {
    return this.math.approximateMinStart(
      (n) => {
        this.CDF(n, k, p);
      },
      P,
      k,
      this.precision
    );
  }

  CDF_Get_k(P, n, p) {
    return this.math.approximateMaxStart(
      (k) => {
        this.CDF(n, k, p);
      },
      P,
      n,
      this.precision
    );
  }

  CDF_Get_p(P, n, k) {
    return this.math.approximateProcent(
      (p) => {
        this.CDF(n, k, p);
      },
      P,
      this.precision
    );
  }

  PMF_Get_n(P, k, p) {
    return this.math.approximateMinStart(
      (n) => {
        this.PMF(n, k, p);
      },
      P,
      this.precision
    );
  }

  PMF_Get_k(P, n, p) {
    return this.math.approximateMaxStart(
      (k) => {
        this.PMF(n, k, p);
      },
      P,
      n,
      this.precision
    );
  }

  PMF_Get_p(P, n, k) {
    return this.math.approximateProcent(
      (p) => {
        this.PMF(n, k, p);
      },
      P,
      this.precision
    );
  }
}
