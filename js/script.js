function DataTable(config) {
  const parentElement = document.querySelector(config.parent);

  // Створюємо таблицю
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Створюємо рядок заголовків (thead)
  createTableHeader(config, thead, table);
  //Створюємо поля таблиці
  createTableBody(config, tbody, table);
  // Додаємо таблицю на сторінку
  parentElement.appendChild(table);
}

function createTableHeader(config, thead, table) {
  const headerRow = document.createElement("tr");
  config.columns.forEach((column) => {
    const th = document.createElement("th");
    th.innerHTML = column.title;
    headerRow.appendChild(th);
  });
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
        //console.log(data);
        data.forEach((item) => {
          const row = document.createElement("tr");
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
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
      })
      .catch((error) => {
        console.error("Помилка отримання даних з сервера:", error);
      });
  }
  else{
    //написати якщо урл немає
  }
}
function isImageURL(url) {
  const imageExtensions = /\.(png|jpg|jpeg|gif|bmp)$/i;
  return imageExtensions.test(url);
}
