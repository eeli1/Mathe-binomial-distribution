function drawChart(ctx, data, label) {
  var index = [];
  for (let i = 0; i < data.length; i++) index.push(i);
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: index,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
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

function createChart(name, data) {
  var canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.display = "block";
  canvas.style.width = "400px";
  canvas.style.height = "400px";
  canvas.style.float = "left";

  drawChart(canvas.getContext("2d"), data, name);

  return canvas;
}
