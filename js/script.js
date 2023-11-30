async function DataTable(config) {
  let divWithTable = document.querySelector(config.parent);
  let data;
  try {
    if (config.hasOwnProperty("apiUrl")) {
      data = await getDataForTable(config.apiUrl);
      let headerTable = await getTableHeader(data.data, divWithTable);
      let bodyTable = await getTableBody(data.data, config);
    } else {
      let numberConfig = parseInt(config.split("config")[1]);
      data = "users" + numberConfig;
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getDataForTable(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTableHeader(data, divWithTable) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let fragment = document.createDocumentFragment();
  let keys = Object.keys(data["1"]);

  //create first column head for table
  let th = document.createElement("th");
  th.innerText = "№";
  fragment.appendChild(th);
  //create all column head for table
  keys.forEach((key) => {
    let th = document.createElement("th");
    th.innerText = key;
    fragment.appendChild(th);
  });

  tr.appendChild(fragment);
  thead.appendChild(tr);
  table.appendChild(thead);
  divWithTable.appendChild(table);
}

async function getTableBody(data, config) {
  data = Object.entries(data);
  let tbody = document.createElement("tbody");
  let tr = document.createElement("tr");
  let table = document.querySelector(`${config.parent} table`);
  let counter = 1; // Initialize a counter variable

  for (let [key, value] of data) {
    value = Object.entries(value);
    let fragment = document.createDocumentFragment();
    let tr = document.createElement("tr");

    // Create a new cell for numbering
    let tdNumber = document.createElement("td");
    tdNumber.innerText = counter++; // Display and increment the counter
    tr.appendChild(tdNumber);

    for (let [keyRow, valueRow] of value) {
      let td = document.createElement("td");

      if (keyRow === "avatar") {
        td.innerHTML = "<img src=" + valueRow + "></img>";
        fragment.appendChild(td);
      } else {
        td.innerText = valueRow;
        fragment.appendChild(td);
      }
    }
    tr.appendChild(fragment);
    tbody.appendChild(tr);
    table.appendChild(tbody);
  }

  
}
