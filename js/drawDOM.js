class DrawDOM {
  constructor(maxN, precision, binomial) {
    this.precision = precision;
    this.binomial = binomial;
    this.math = new MyMath();
    this.createDOM = new CreateDOM();
    this.body = document.body;
    this.color1 = { r: 255, g: 99, b: 132 };
    this.color2 = { r: 87, g: 99, b: 255 };
    this.maxN = maxN;
    this.createdObjId = [];
  }

  showError(error) {
    console.error(error);
    alert(error);
  }

  clear() {
    this.createdObjId.forEach((id) =>
      document.getElementById(id) == undefined
        ? this.showError("id: " + id + " ist undefined")
        : document.getElementById(id).remove()
    );
    this.createdObjId = [];
  }

  makeChart(name, id, values, mask) {
    var chart = this.createDOM.createChart(
      name,
      values,
      mask,
      this.color1,
      this.color2
    );
    chart.id = id;
    this.createdObjId.push(id);
    this.body.appendChild(chart);
  }

  makeTable(pmfValues, cdfValues, pmfMask, cdfMask) {
    var table = this.createDOM.generateTable(
      pmfValues,
      cdfValues,
      pmfMask,
      cdfMask
    );
    table.id = "table";
    this.createdObjId.push(table.id);
    this.body.appendChild(table);
  }

  generatePMFVal(n, p) {
    var values = [];
    for (let i = 0; i < n; i++)
      values.push(
        this.math.roundPrecision(this.binomial.PMF(n, i, p), this.precision)
      );
    return values;
  }

  generateCDFVal(n, p) {
    var values = [];
    for (let i = 0; i < n; i++)
      values.push(
        this.math.roundPrecision(this.binomial.CDF(n, i, p), this.precision)
      );
    return values;
  }

  generateMask(n, k, lamda) {
    var mask = [];
    for (let i = 0; i < n; i++)
      if (lamda(k, i)) mask.push(false);
      else mask.push(true);
    return mask;
  }

  generateMaskK2(n, k1, k2) {
    var mask = [];
    for (let i = 0; i < n; i++) {
      if (i >= k1 && i <= k2) mask.push(false);
      else mask.push(true);
    }
    return mask;
  }

  showPMF_CDF(n, p, pmfMask, cdfMask) {
    let pmfValues = this.generatePMFVal(n, p);
    let cdfValues = this.generateCDFVal(n, p);
    this.makeChart("P(X = k)", "PMF_chart", pmfValues, pmfMask);
    this.makeChart("P(X \u2264 k)", "CDF_chart", cdfValues, cdfMask);
    this.makeTable(pmfValues, cdfValues, pmfMask, cdfMask);
  }

  getCDFValue(n, p, pmfMask) {
    let result = 0;
    for (let k = 0; k < n; k++)
      if (!pmfMask[k]) result += this.binomial.PMF(n, k, p);
    return result;
  }

  noK(n, p) {
    let mask = this.generateMask(n, 0, (k, i) => {
      return false;
    });
    this.showPMF_CDF(n, p, mask, mask);
    return 1;
  }

  kEqual(n, p, k) {
    let pmfMask = this.generateMask(n, k, (k, i) => {
      return i == k;
    });
    this.showPMF_CDF(
      n,
      p,
      pmfMask,
      this.generateMask(n, k, (k, i) => {
        return false;
      })
    );
    return this.getCDFValue(n, p, pmfMask);
  }

  kGreaterEqual(n, p, k) {
    let pmfMask = this.generateMask(n, k, (k, i) => {
      return i >= k;
    });
    this.showPMF_CDF(
      n,
      p,
      pmfMask,
      this.generateMask(n, k, (k, i) => {
        return false;
      })
    );
    return this.getCDFValue(n, p, pmfMask);
  }

  kLessEqual(n, p, k) {
    let pmfMask = this.generateMask(n, k, (k, i) => {
      return i <= k;
    });
    this.showPMF_CDF(
      n,
      p,
      pmfMask,
      this.generateMask(n, k, (k, i) => {
        return i == k;
      })
    );
    return this.getCDFValue(n, p, pmfMask);
  }

  k1Tok2(n, p, k1, k2) {
    let pmfMask = this.generateMaskK2(n, k1, k2);
    this.showPMF_CDF(
      n,
      p,
      pmfMask,
      this.generateMask(n, k1, (k, i) => {
        return false;
      })
    );
    return this.getCDFValue(n, p, pmfMask);
  }
}
