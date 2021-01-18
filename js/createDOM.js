class CreateDOM {
  // Slider
  createSlider(nData, pData) {
    let sliderDiv = document.createElement("div");

    // for p
    let pDiv = document.createElement("div");

    let pHeder = document.createElement("h5");
    pHeder.textContent = "p";

    pDiv.appendChild(pHeder);

    // for n
    let nDiv = document.createElement("div");
    // nDiv.class = "float-right"

    let nHeder = document.createElement("h5");
    nHeder.textContent = "n";

    let nSlider = document.createElement("input");
    nSlider.type = "range";
    nSlider.min = nData.min;
    nSlider.max = nData.max;
    nSlider.value = nData.default;
    nSlider.class = "slider";
    nSlider.id = "n_slider";
    nSlider.oninput =
      '(this.value) => { document.getElementById("n_text").value = value; console.log(value); }';
    nSlider.onchange =
      '(this.value) => { document.getElementById("n_text").value = value; console.log(value); }';

    // type="range" min="1" max="100" value="10" class="slider" id="n_slider"

    let nText = document.createElement("p");
    nText.textContent = nData.default;
    nText.id = "n_text";

    nDiv.appendChild(nHeder);
    nDiv.appendChild(nSlider);
    nDiv.appendChild(nText);

    sliderDiv.appendChild(pDiv);
    sliderDiv.appendChild(nDiv);

    return sliderDiv;

    // <h5 class="card-title">Card title</h5>
  }

  // Chart
  drawChart(ctx, data, label, backgroundColor, borderColor) {
    let index = [];
    for (let i = 0; i < data.length; i++) {
      index.push(i);
    }
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: index,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: false,
        maintainAspectRatio: false,
        showTooltips: false,
      },
    });
  }

  createChart(name, data, mask, color1, color2) {
    // create Canvas
    var canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.display = "block";
    canvas.style.width = "400px";
    canvas.style.height = "400px";
    canvas.style.float = "left";

    let backgroundColor = [];
    let borderColor = [];

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] == true) {
        backgroundColor.push(
          "rgba(" + color1.r + ", " + color1.g + ", " + color1.b + ", 0.2)"
        );
        borderColor.push(
          "rgba(" + color1.r + ", " + color1.g + ", " + color1.b + ", 1)"
        );
      } else {
        backgroundColor.push(
          "rgba(" + color2.r + ", " + color2.g + ", " + color2.b + ", 0.2)"
        );
        borderColor.push(
          "rgba(" + color2.r + ", " + color2.g + ", " + color2.b + ", 1)"
        );
      }
    }

    this.drawChart(
      canvas.getContext("2d"),
      data,
      name,
      backgroundColor,
      borderColor
    );

    return canvas;
  }

  // Tabel
  createTableBody2(pmf_values, cdf_values) {
    var tBody = document.createElement("tbody");

    var newTr = (k, pmf, cdf) => {
      var tr = document.createElement("tr");
      var newTd = (text) => {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(text));
        return td;
      };
      tr.appendChild(newTd(k));
      tr.appendChild(newTd(pmf));
      tr.appendChild(newTd(cdf));
      return tr;
    };

    for (let i = 0; i < pmf_values.length; i++)
      tBody.appendChild(newTr(i, pmf_values[i], cdf_values[i]));

    return tBody;
  }

  createTableBody1(values) {
    var tBody = document.createElement("tbody");

    var newTr = (k, val) => {
      var tr = document.createElement("tr");
      var newTd = (text) => {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(text));
        return td;
      };
      tr.appendChild(newTd(k));
      tr.appendChild(newTd(val));
      return tr;
    };

    for (let i = 0; i < values.length; i++)
      tBody.appendChild(newTr(i, values[i]));

    return tBody;
  }

  createTableHead1() {
    var tHead = document.createElement("thead");
    var tr = document.createElement("tr");

    var newTh = (text) => {
      let th = document.createElement("th");
      th.scope = "col";
      th.appendChild(document.createTextNode(text));
      return th;
    };

    tr.appendChild(newTh("k"));
    tr.appendChild(newTh("P(X = k)"));
    tHead.appendChild(tr);

    return tHead;
  }

  createTableHead2() {
    var tHead = document.createElement("thead");
    var tr = document.createElement("tr");

    var newTh = (text) => {
      let th = document.createElement("th");
      th.scope = "col";
      th.appendChild(document.createTextNode(text));
      return th;
    };

    tr.appendChild(newTh("k"));
    tr.appendChild(newTh("P(X = k)"));
    tr.appendChild(newTh("P(X \u2264 k)"));
    tHead.appendChild(tr);

    return tHead;
  }

  generateTable2(pmf_values, cdf_values) {
    var table = document.createElement("table");
    table.id = "table";
    table.className = "table";

    table.appendChild(this.createTableHead2());
    table.appendChild(this.createTableBody2(pmf_values, cdf_values));

    return table;
  }

  generateTable1(values) {
    var table = document.createElement("table");
    table.id = "table";
    table.className = "table";

    table.appendChild(this.createTableHead1());
    table.appendChild(this.createTableBody1(values));

    return table;
  }
}
