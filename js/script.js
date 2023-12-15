function DataTable(config) {
  const parentElement = document.querySelector(config.parent);
  let divBeforeTable = createDivBeforeTable(config);
  // Create input search
  createInputForSearch(config, parentElement, divBeforeTable);
  //Create button add new row before table
  createButtonAddRow(config, parentElement, divBeforeTable);
  // Create table
  const table = document.createElement("table");
  // Create table headers row (thead)
  createTableHeader(config, table);
  // Create table body fields
  createTableBody(config, table);
  // Add search input and table to the page
  parentElement.appendChild(table);
}

function createInputForSearch(config, parentElement, divBeforeTable) {
  const inputSearch = document.createElement("input");
  inputSearch.type = "text";
  inputSearch.placeholder = "Enter text for search";
  inputSearch.id = `inputSearchIn${config.parent}`;
  inputSearch.onkeyup = function () {
    tableSearch(config.parent);
  };
  divBeforeTable.appendChild(inputSearch);
  parentElement.appendChild(divBeforeTable);
}

function createButtonAddRow(config, parentElement, divBeforeTable) {
  console.log(divBeforeTable);
  let button = document.createElement("button");
  button.innerText = "Додати";
  button.classList.add("add-button");
  button.onclick = function () {
    addRowInTable(config);
  };
  divBeforeTable.appendChild(button);
}

function addRowInTable(config) {
  alert('Add function add row');
  console.log(config.apiUrl);
}

function createDivBeforeTable(config) {
  let divBeforeTable = document.createElement("div");
  divBeforeTable.id = `divBeforeTable${config.parent}`;
  divBeforeTable.style.display = "flex";
  return divBeforeTable;
}

function createTableHeader(config, table) {
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const th = document.createElement("th");
  th.innerHTML = "№";
  headerRow.appendChild(th);
  config.columns.forEach((column) => {
    let th = document.createElement("th");
    th.innerHTML = column.title;
    headerRow.appendChild(th);
  });

  const actionsTh = document.createElement("th");
  actionsTh.innerHTML = "Дії";
  headerRow.appendChild(actionsTh);

  thead.appendChild(headerRow);
  table.appendChild(thead);
}

function createTableBody(config, table) {
  const tbody = document.createElement("tbody");
  if (config.apiUrl) {
    // Якщо є apiUrl, отримуємо дані з сервера

    fetch(config.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data = Object.entries(data.data);

        let count = 1;
        createRowWithInputs(config,table,tbody,data);
        data.forEach((item) => {
          //item - рядок з даними item[0] - id рядка
          //console.log(item[0]);
          let idRow = item[0];
          const row = document.createElement("tr");

          //first column with count
          const td = document.createElement("td");
          td.innerHTML = count++;
          row.appendChild(td);

          //content rows
          config.columns.forEach((column) => {
            const td = document.createElement("td");
            if (
              column.value === "avatar" &&
              isImageURL(item[1][column.value])
            ) {
              td.innerHTML = `<img src="${
                item[1][column.value]
              }" width="30" height="30">`;
            } else if (typeof column.value === "function") {
              td.innerHTML = column.value(item[1]);
            } else {
              td.innerHTML = item[1][column.value];
            }
            row.appendChild(td);
          });

          //cell with button delete
          const tdWithBtnDelete = document.createElement("td");
          tdWithBtnDelete.appendChild(createButtonDelete(config, idRow));
          row.appendChild(tdWithBtnDelete);

          tbody.appendChild(row);
        });
        table.appendChild(tbody);
      })
      .catch((error) => {
        console.error("Помилка отримання даних з сервера:", error);
      });
  } else {
    //написати якщо урл немає
  }
}

function createRowWithInputs(config,table,tbody,data){
  console.log(data[0][1]);//обьект де будемо брати ключі для інпутів
  const item = Object.keys(data[0][1]);
  let row = document.createElement("tr");
  const tdEmpty = document.createElement('td');
  row.appendChild(tdEmpty);
  item.forEach((key) => {
    const td = document.createElement("td");
    let input = document.createElement('input');
    input.type = 'text'; 
    input.id = `${key}`;
    input.placeholder = `Enter ${key}`; 
    input.style.width = "90%";
    input.style.margin = "auto";
    td.appendChild(input);
    row.appendChild(td);
  });
  tbody.appendChild(row);
  table.appendChild(tbody);
}

function createButtonDelete(config, id) {
  let button = document.createElement("button");
  button.innerText = "Видалити";
  button.classList.add("delete-button");
  button.onclick = function () {
    deleteUser(config.apiUrl, id)
      .then(() => {
        refreshTable(config);
      })
      .catch(() => {
        console.log("Error delete row.");
      });
  };

  return button;
}

function deleteUser(apiUrl, id) {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
}

function refreshTable(config) {
  const parentElement = document.querySelector(config.parent);
  parentElement.innerHTML = "";
  DataTable(config);
}

function isImageURL(url) {
  const imageExtensions = /\.(png|jpg|jpeg|gif|bmp)$/i;
  return imageExtensions.test(url);
}

function tableSearch(parentSelector) {
  console.log("Parent Selector:", parentSelector);
  let phrase = document.getElementById(`inputSearchIn${parentSelector}`);
  let searchText = phrase.value.toLowerCase(); // Convert entered text to lowercase for case-insensitive search
  console.log("Search Phrase:", searchText);
  let table = document.querySelector(`${parentSelector} table`);

  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    let rowDisplay = false;

    for (let j = 0; j < row.cells.length; j++) {
      let cellText = row.cells[j].textContent.toLowerCase(); // Get text content from the cell in lowercase

      if (cellText.includes(searchText)) {
        // Check if the text exists in the cell
        rowDisplay = true; // If text is found in the cell, display the row
        break;
      }
    }

    if (rowDisplay) {
      row.style.display = ""; // Display the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  }
}
