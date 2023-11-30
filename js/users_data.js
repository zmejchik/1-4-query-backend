let sortOrder = 1;
let configurations = new Map();

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Ім’я', value: 'name'},
    {title: 'Прізвище', value: 'surname'},
    {title: 'Вік', value: 'age'},
  ],
  apiUrl: "https://mock-api.shpp.me/imalinovskiy/users"
};

DataTable(config1);

const config2 = {
  parent: '#productsTable',
  columns: [
    {title: 'Назва', value: 'title'},
    {title: 'Ціна', value: (product) => `${product.price} ${product.currency}`},
    {title: 'Колір', value: (product) => getColorLabel(product.color)}, // функцію getColorLabel вам потрібно створити
  ],
  apiUrl: "https://mock-api.shpp.me/imalinovskiy/products"
};

DataTable(config2);

const users2 = [
  { id: 30050, name: "Вася", surname: "Петров", age: 12, male: "Male" },
  { id: 30051, name: "Вася", surname: "Васечкін", age: 15, male: "Male" },
  { id: 30050, name: "Вася", surname: "Петров", age: 18, male: "Male" },
  { id: 30051, name: "Тарас", surname: "Шевченко", age: 35, male: "Male" },
  { id: 30050, name: "Толя", surname: "Васечкін", age: 47, male: "Male" },
  { id: 30051, name: "Ліна", surname: "Костенко", age: 31, male: "Female" },
  { id: 30051, name: "Лариса", surname: "Косач", age: 25, male: "Female" },
  { id: 30051, name: "Юля", surname: "Мойсик", age: 30, male: "Female" },
];




