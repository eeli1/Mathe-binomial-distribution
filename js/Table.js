function createTableBody(pmf_values, cdf_values) {
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

function createTableHead() {
  var tHead = document.createElement("thead");
  var tr = document.createElement("tr");

  var newTh = (text) => {
    th = document.createElement("th");
    th.scope = "col";
    th.appendChild(document.createTextNode(text));
    return th;
  };

  tr.appendChild(newTh("k"));
  tr.appendChild(newTh("P(X = k)"));
  tr.appendChild(newTh("P(X ≤ k)"));
  tHead.appendChild(tr);

  return tHead;
}

function generateTable(pmf_values, cdf_values) {
  var table = document.createElement("table");
  table.id = "table";
  table.className = "table";

  table.appendChild(createTableHead());
  table.appendChild(createTableBody(pmf_values, cdf_values));

  return table;
}
