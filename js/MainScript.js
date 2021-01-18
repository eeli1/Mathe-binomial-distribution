// error and validating
function makeError(error) {
  console.error(error);
  //body.appendChild(document.createTextNode(error))
}

function validateN(n) {
  if (!(n > 0 && n < this.maxN)) {
    makeError("n := {x \u220A \u2115* | x < " + this.maxN + "}");
    return false;
  }
  return true;
}

function validateP(p) {
  if (!(p > 0 && p < 1)) {
    makeError("p := {x \u220A \u211D | 0 < x < 1}");
    return false;
  }
  return true;
}

function validateK(k, n) {
  if (k > n) {
    makeError("k < n");
    return false;
  }
  return true;
}

function setup() {
  this.precision = -1;
  this.binomial = new Binomial(this.precision);
  this.math = new MyMath();
  this.createDOM = new CreateDOM();
  this.body = document.body;
  this.color1 = { r: 255, g: 99, b: 132 };
  this.color2 = { r: 87, g: 99, b: 255 };
  this.maxN = 100;
  this.createdObjId = [];
  this.onlyPMF = false;
  this.showCDFValue = true;
}

function clear() {
  this.createdObjId.forEach((id) =>
    document.getElementById(id) == undefined
      ? makeError("id: " + id + " is undefined")
      : document.getElementById(id).remove()
  );
  this.createdObjId = [];
}

function makeChart(name, id, values, mask) {
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

function makeTable1(values) {
  var table = this.createDOM.generateTable1(values);
  table.id = "table";
  this.createdObjId.push(table.id);
  this.body.appendChild(table);
}

function makeTable2(pmfValues, cdfValues) {
  var table = this.createDOM.generateTable2(pmfValues, cdfValues);
  table.id = "table";
  this.createdObjId.push(table.id);
  this.body.appendChild(table);
}

function generatePMFVal(n, p) {
  var values = [];
  for (let i = 0; i < n; i++) values.push(this.binomial.PMF(n, i, p));
  return values;
}

function generateCDFVal(n, p) {
  var values = [];
  for (let i = 0; i < n; i++) values.push(this.binomial.CDF(n, i, p));
  return values;
}

function generateMask(n, k, lamda) {
  var mask = [];
  for (let i = 0; i < n; i++) {
    if (lamda(k, i)) mask.push(false);
    else mask.push(true);
  }
  return mask;
}

function generateMaskK2(n, k1, k2) {
  var mask = [];
  for (let i = 0; i < n; i++) {
    if (i >= k1 && i <= k2) mask.push(false);
    else mask.push(true);
  }
  return mask;
}

function showPMF(n, p, pmfMask) {
  let pmfValues = generatePMFVal(n, p);
  makeChart("P(X = k)", "PMF_chart", pmfValues, pmfMask);
  makeTable1(pmfValues);
}

function showPMF_CDF(n, p, pmfMask, cdfMask) {
  let pmfValues = generatePMFVal(n, p);
  let cdfValues = generateCDFVal(n, p);
  makeChart("P(X = k)", "PMF_chart", pmfValues, pmfMask);
  makeChart("P(X \u2264 k)", "CDF_chart", cdfValues, cdfMask);
  makeTable2(pmfValues, cdfValues);
}

function getCDFValue(n, p, pmfMask) {
  let result = 0;
  for (let k = 0; k < n; k++)
    if (pmfMask[k]) result += this.binomial.PMF(n, k, p);
  return result;
}

function noK(n, p) {
  let mask = generateMask(n, 0, (k, i) => {
    return false;
  });

  if (this.showCDFValue) getCDFValue(n, p, mask);
  if (this.onlyPMF) {
    showPMF(n, p, mask);
  } else {
    showPMF_CDF(n, p, mask, mask);
  }
}

function greater(n, p, k) {
  let pmfMask = generateMask(n, k, (k, i) => {
    return i > k;
  });

  if (this.showCDFValue) getCDFValue(n, p, pmfMask);

  if (this.onlyPMF) {
    showPMF(n, p, pmfMask);
  } else {
    showPMF_CDF(
      n,
      p,
      pmfMask,
      generateMask(n, k, (k, i) => {
        return false;
      })
    );
  }
}

function greaterEqual(n, p, k) {
  let pmfMask = generateMask(n, k, (k, i) => {
    return i >= k;
  });

  if (this.onlyPMF) {
    showPMF(n, p, pmfMask);
  } else {
    showPMF_CDF(
      n,
      p,
      pmfMask,
      generateMask(n, k, (k, i) => {
        return false;
      })
    );
  }
}

function less(n, p, k) {
  let pmfMask = generateMask(n, k, (k, i) => {
    return i < k;
  });

  if (this.onlyPMF) {
    showPMF(n, p, pmfMask);
  } else {
    showPMF_CDF(
      n,
      p,
      pmfMask,
      generateMask(n, k - 1, (k, i) => {
        return i == k;
      })
    );
  }
}

function lessEqual(n, p, k) {
  let pmfMask = generateMask(n, k, (k, i) => {
    return i <= k;
  });

  if (this.onlyPMF) {
    showPMF(n, p, pmfMask);
  } else {
    showPMF_CDF(
      n,
      p,
      pmfMask,
      generateMask(n, k, (k, i) => {
        return i == k;
      })
    );
  }
}

function k1Tok2(n, p, k1, k2) {
  let pmfMask = generateMaskK2(n, k1, k2);

  if (this.onlyPMF) {
    showPMF(n, p, pmfMask);
  } else {
    showPMF_CDF(
      n,
      p,
      pmfMask,
      generateMask(n, k1, (k, i) => {
        return false;
      })
    );
  }
}

function main() {
  setup();

  /*
  let slider = this.createDOM.createSlider(
    { min: 1, max: 100, default: 10 },
    { default: 0.5 }
  );
  body.appendChild(slider);
  */

  let n = 50;
  let p = 0.5;
  let k = 20;

  greaterEqual(n, p, k);
}
