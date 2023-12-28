const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Аватар", value: "avatar" },
    { title: "Вік, років", value: (date) => getCurrentAge(`${date.birthday}`) },
  ],
  apiUrl: "https://mock-api.shpp.me/imalinovskiy/users",
};

function getCurrentAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const milisecInYear = 31557600000;
  let fullYear = currentDate - birthDate;
  return Math.round(fullYear / milisecInYear);
}
DataTable(config1);

const config2 = {
  parent: "#productsTable",
  columns: [
    { title: "Назва", value: "title" },
    {
      title: "Ціна",
      value: (product) => `${product.price} ${product.currency}`,
    },
    { title: "Колір", value: (product) => getColorLabel(`${product.color}`) },
  ],
  apiUrl: "https://mock-api.shpp.me/imalinovskiy/products",
};

function getColorLabel(rgb) {
  let content = `<div style="background-color:${rgb};width:20px;height:20px;"></div>`;
  return content;
}
/* function getColorLabel(rgb) {
  let content = `<div style="background-color:${rgb};"></div>`;
  console.log(content);
  return content;
} */
DataTable(config2);


const config3 = {
  parent: "#usersTable3",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Вік", value: "age" },
    { title: "Примітки", value: "male" },
  ],
};

const users3 = [
  { id: 30050, name: "Вася", surname: "Петров", age: 12, male: "Male" },
  { id: 30051, name: "Вася", surname: "Васечкін", age: 15, male: "Male" },
  { id: 30050, name: "Вася", surname: "Петров", age: 18, male: "Male" },
  { id: 30051, name: "Тарас", surname: "Шевченко", age: 35, male: "Male" },
  { id: 30050, name: "Толя", surname: "Васечкін", age: 47, male: "Male" },
  { id: 30051, name: "Ліна", surname: "Костенко", age: 31, male: "Female" },
  { id: 30051, name: "Лариса", surname: "Косач", age: 25, male: "Female" },
  { id: 30051, name: "Юля", surname: "Мойсик", age: 30, male: "Female" },
];

createTableFromLocalData(config3, users3);

