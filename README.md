# Step-by-Step Guide to Using DataTable Library

## Step 1: Include the Script on Your Webpage

Before using this library, ensure that the script containing the described 
functions is connected to your HTML page:

```html
<script src="path_to_your_script.js"></script>
```

## Step 2: Create Table Configuration and Call DataTable Function

Before creating a table, you need to create a configuration object. For example:

```javascript
const tableConfig = {
  parent: '#tableContainer', // ID of the element where the table will be inserted
  columns: [
    { title: 'ID', value: 'id' }, // Column title and corresponding field in the data
    { title: 'Name', value: 'name' },
    // Other columns
  ]
  apiUrl:'url with data for table'
};

// Creating the table
DataTable(tableConfig);
```

## Functional
The table is built with the following functionality. 
### Button Delete 
There is a delete button for each row; upon clicking it, the respective row is removed from both the server's data and the table itself. 
### Search data in table
Additionally, there is a search field that allows data filtering as characters are entered into the search field. 
### Add data on server
There is also an "Add" button. Upon clicking it, a row of input fields for data entry is created. If all fields are filled, pressing the ENTER key submits the data to the server.