function drawChart(ctx, data, label, backgroundColor, borderColor) {
  let labels = []
  for (let i = 0; i < data.length; i++) {
    labels.push("P(X = " + i + ") = " + data[i])

  }
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
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

function createChart(name, data, mask, color1, color2) {

  // create Canvas
  var canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.display = "block";
  canvas.style.width = "400px";
  canvas.style.height = "400px";
  canvas.style.float = "left";

  let backgroundColor = []
  let borderColor = []

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] == true) {
      backgroundColor.push("rgba(" + color1.r + ", " + color1.g + ", " + color1.b + ", 0.2)")
      borderColor.push("rgba(" + color1.r + ", " + color1.g + ", " + color1.b + ", 1)")
    } else {
      backgroundColor.push("rgba(" + color2.r + ", " + color2.g + ", " + color2.b + ", 0.2)")
      borderColor.push("rgba(" + color2.r + ", " + color2.g + ", " + color2.b + ", 1)")
    }
  }

  drawChart(canvas.getContext("2d"), data, name, backgroundColor, borderColor);

  return canvas;
}
