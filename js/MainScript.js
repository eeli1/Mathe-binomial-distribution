function setup() {
  
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

  let drawDOM = new DrawDOM();
  let n = 50;
  let p = 0.5;
  let k = 20;
  let CDF = 0.059460226279717254;

  //console.log(this.binomial.getCDFP(n, k, CDF));

  drawDOM.k1Tok2(n, p, k,30);
}
