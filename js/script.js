function DataTable(config) {
  const parentElement = document.querySelector(config.parent);
  // Create input search
  const inputSearch = document.createElement("input");
  inputSearch.type = "text";
  inputSearch.placeholder = "Enter text for search";
  inputSearch.id = `inputSearchIn${config.parent}`;
  inputSearch.onkeyup = function () {
    tableSearch(config.parent);
  };
  let divBeforeTable = document.createElement("div");
  divBeforeTable.appendChild(inputSearch);

  // Create table
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Create table headers row (thead)
  createTableHeader(config, thead, table);
  // Create table body fields
  createTableBody(config, tbody, table);
  // Add search input and table to the page
  parentElement.appendChild(divBeforeTable);
  parentElement.appendChild(table);
}


function createTableHeader(config, thead, table) {
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

function createTableBody(config, tbody, table) {
  if (config.apiUrl) {
    // Якщо є apiUrl, отримуємо дані з сервера

    fetch(config.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        data = Object.entries(data.data);

        let count = 1;
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
          tdWithBtnDelete.appendChild(newButtonDelete(config, idRow));
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

function newButtonDelete(config, id) {
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
  console.log('Parent Selector:', parentSelector);
  let phrase = document.getElementById(`inputSearchIn${parentSelector}`);
  let searchText = phrase.value.toLowerCase(); // Convert entered text to lowercase for case-insensitive search
  console.log('Search Phrase:', searchText);
  let table = document.querySelector(`${parentSelector} table`);

  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    let rowDisplay = false;

    for (let j = 0; j < row.cells.length; j++) {
      let cellText = row.cells[j].textContent.toLowerCase(); // Get text content from the cell in lowercase

      if (cellText.includes(searchText)) { // Check if the text exists in the cell
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


