/**
 * The main function to create a table and its control elements.
 * Finds the parent element in the document and creates markup for the table.
 * Creates control elements such as a search field and a button to add a new row to the table.
 * Adds the table and control elements to the page.
 * @param {Object} config*
 */
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

/**
 * Function to create a search input field.
 * Creates an input element with specific attributes and an onkeyup event handler for table search.
 * Places the input field before the table.
 * @param {Object} config
 * @param {HTMLElement} parentElement
 * @param {HTMLElement} divBeforeTable
 */
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

/**
 * Function to create the "Add" button.
 * Creates a button to add a new row to the table.
 * Sets an onclick event handler to add a row to the table.
 * @param {Object} config
 * @param {HTMLElement} parentElement
 * @param {HTMLElement} divBeforeTable
 */
function createButtonAddRow(config, parentElement, divBeforeTable) {
  //console.log(divBeforeTable);
  let button = document.createElement("button");
  button.innerText = "Додати";
  button.classList.add("add-button");
  button.onclick = function () {
    addRowInTable(config);
  };
  divBeforeTable.appendChild(button);
}

/**
 * Adds a new row to the table and toggles its visibility (hidden or shown).
 * Sets an event listener for the "Enter" key to check if all fields in the row are filled.
 * @param {Object} config
 * @returns row
 */
function addRowInTable(config) {
  const row = document.getElementById(`rowWithInputs${config.parent}`);
  row.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      auditAllFieldOnEmpty(row, config);
    }
  });
  row.classList.toggle("hidden");
  return row;
}

/**
 * Checks whether all fields in a row are filled.
 * If any field is empty, adds a red border around the empty fields.
 * @param {HTMLElement} row
 * @param {Object} config
 */
function auditAllFieldOnEmpty(row, config) {
  const inputs = row.querySelectorAll("input");
  const allFieldsFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  if (allFieldsFilled) {
    sendDataToServer(inputs, config);
  } else {
    addRedBorderForEmptyInput(inputs);
  }
}

/**
 * Adds a red border around empty input fields based on their fill status.
 * @param {HTMLElement} inputs
 */
function addRedBorderForEmptyInput(inputs) {
  inputs.forEach((input) => {
    if (input.value === "") {
      input.style.border = "4px solid red";
    } else {
      input.style.border = "none";
    }
  });
}

/**
 * Sends data to the server in JSON format.
 * Uses the fetch API to send data using the POST method.
 * Updates the table after successfully sending data to the server.
 * @param {HTMLElement} inputs
 * @param {Object} config
 */
function sendDataToServer(inputs, config) {
  let dataForSend = buildDataForServer(inputs);
  //console.log(dataForSend);
  fetch(config.apiUrl, {
    method: "POST",
    body: JSON.stringify(dataForSend),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(() => {
      refreshTable(config);
    })
    .catch(() => {
      console.log("Error delete row.");
    });
  refreshTable(config);
  //console.log(dataForSend);
}

/**
 * Creates an object with data to send to the server.
 * Converts input field values into a format suitable for sending to the server.
 * @param {Array} inputs
 * @returns Object
 */
function buildDataForServer(inputs) {
  let dataForSend = {};
  //create object for send on server
  Array.from(inputs).forEach((data) => {
    if (data.type === "number") {
      dataForSend[data.id] = Number(data.value);
    } else {
      dataForSend[data.id] = data.value;
    }
  });
  return dataForSend;
}

/**
 * Creates a div element before the table to place control elements.
 * @param {Object} config
 * @returns HTMLElement
 */
function createDivBeforeTable(config) {
  let divBeforeTable = document.createElement("div");
  divBeforeTable.id = `divBeforeTable${config.parent}`;
  divBeforeTable.style.display = "flex";
  return divBeforeTable;
}

/**
 * Creates the table header (thead) based on the specified columns in the configuration.
 * Generates column headers for the table based on the provided data.
 * @param {Object} config
 * @param {HTMLElement} table
 */
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

/**
 * Creates the table body (tbody) using data fetched from the server (if apiUrl is provided).
 * Generates table rows with data and delete buttons for each item.
 * @param {Object} config
 * @param {HTMLTableElement} table
 */
function createTableBody(config, table) {
  const tbody = document.createElement("tbody");
  if (config.apiUrl) {
    // Якщо є apiUrl, отримуємо дані з сервера
    fetch(config.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data = Object.entries(data.data);
        let count = 1;
        createRowWithInputs(config, table, tbody, data);
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
  }
}

/**
 * Creates a row with input fields for entering new data into the table.
 * Generates empty cells and input fields based on the provided data.
 * @param {Object} config
 * @param {HTMLTableElement} table
 * @param {HTMLTableSectionElement} tbody
 * @param {Array} data
 */
function createRowWithInputs(config, table, tbody, data) {
  //console.log(data[0][1]); //обьект де будемо брати ключі для інпутів
  const item = Object.keys(data[0][1]);
  let rowWithInputs = document.createElement("tr");
  rowWithInputs.id = `rowWithInputs${config.parent}`;
  const tdEmpty = document.createElement("td");
  rowWithInputs.appendChild(tdEmpty);
  item.forEach((key) => {
    const td = document.createElement("td");
    let input = document.createElement("input");
    input.type = typeof data[0][1][key];
    input.id = `${key}`;
    //console.log(typeof data[0][1][key]);
    input.placeholder = `Enter ${key}`;
    input.style.width = "90%";
    input.style.margin = "auto";
    td.appendChild(input);
    rowWithInputs.appendChild(td);
  });
  tbody.appendChild(rowWithInputs);
  rowWithInputs.classList.add("hidden");
  table.appendChild(tbody);
}

/**
 * Creates the "Delete" button for a table row.
 * Sets an event handler to remove a row from the table
 * and sends a request to delete data from the server.
 * @param {Object} config
 * @param {number} id
 * @returns HTMLButtonElement
 */
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

/**
 * Sends a request to the server to delete data
 * based on the provided id.
 * @param {string} apiUrl
 * @param {number} id - The ID of the data to be deleted.
 * @returns {Promise<Response>} - A Promise that resolves to the response from the server.
 */
function deleteUser(apiUrl, id) {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });
}

/**
 * Refreshes the table by clearing the parent element
 * and calling the DataTable function again to recreate
 * the table with new data.
 * @param {Object} config
 */
function refreshTable(config) {
  const parentElement = document.querySelector(config.parent);
  parentElement.innerHTML = "";
  DataTable(config);
}

/**
 * Checks whether a URL is an image by comparing the
 * file extension with known image extensions.
 * @param {string} url - The URL to be checked.
 * @returns {boolean} - Returns true if the URL points to
 * an image file, otherwise returns false.
 */
function isImageURL(url) {
  const imageExtensions = /\.(png|jpg|jpeg|gif|bmp)$/i;
  return imageExtensions.test(url);
}

/**
 * Function to search for text in the table.
 * Retrieves the entered search text and hides/shows
 * table rows based on the presence of the search text in the cells.
 * @param {string} parentSelector - Selector for the parent element containing the table.
 */
function tableSearch(parentSelector) {
  console.log("Parent Selector:", parentSelector);
  let phrase = document.getElementById(`inputSearchIn${parentSelector}`);
  let searchText = phrase.value.toLowerCase();
  console.log("Search Phrase:", searchText);
  let table = document.querySelector(`${parentSelector} table`);
  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    let rowDisplay = false;
    for (let j = 0; j < row.cells.length; j++) {
      let cellText = row.cells[j].textContent.toLowerCase();

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
