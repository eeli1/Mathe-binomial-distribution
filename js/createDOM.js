class CreateDOM {
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
  createTableBody(pmfValues, cdfValues, pmfMask, cdfMask) {
    var tBody = document.createElement("tbody");

    var newTr = (k, pmf, cdf, pmfMask, cdfMask) => {
      var tr = document.createElement("tr");
      var newTd = (text, flag) => {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(text));
        if (!flag) td.className = "table-active";
        return td;
      };
      tr.appendChild(newTd(k, true));
      tr.appendChild(newTd(pmf, pmfMask));
      tr.appendChild(newTd(cdf, cdfMask));
      return tr;
    };

    for (let i = 0; i < pmfValues.length; i++)
      tBody.appendChild(
        newTr(i, pmfValues[i], cdfValues[i], pmfMask[i], cdfMask[i])
      );

    return tBody;
  }

  createTableHead() {
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

  generateTable(pmfValues, cdfValues, pmfMask, cdfMask) {
    var table = document.createElement("table");
    table.id = "table";
    table.className = "table";

    table.appendChild(this.createTableHead());
    table.appendChild(
      this.createTableBody(pmfValues, cdfValues, pmfMask, cdfMask)
    );

    return table;
  }
}
