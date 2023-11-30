# Step-by-Step Guide to Using DataTable Library

## Step 1: Include the Script on Your Webpage

Before using this library, ensure that the script containing the described functions is connected to your HTML page:

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
};

const tableData = [
  { id: 1, name: 'John', /* other data */ },
  { id: 2, name: 'Alice', /* other data */ },
  // Other records
];

// Creating the table
DataTable(tableConfig, tableData);
```

## Step 3: Interactive Sorting

After creating the table, you can click on the column header to sort the data. This action automatically triggers the `sortingTable` function, which resorts the data and updates the table with the sorted data.

### Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Example using DataTable library</title>
    <!-- Include the script with the library -->
    <script src="path_to_your_script.js"></script>
  </head>
  <body>
    <!-- Container for the table -->
    <div id="tableContainer"></div>

    <script>
      // Table configuration and data
      const tableConfig = {
        parent: "#tableContainer",
        columns: [
          { title: "ID", value: "id" },
          { title: "Name", value: "name" },
          // Other columns
        ],
      };

      const tableData = [
        { id: 1, name: "John" /* other data */ },
        { id: 2, name: "Alice" /* other data */ },
        // Other records
      ];

      // Creating the table
      DataTable(tableConfig, tableData);
    </script>
  </body>
</html>
```

- Clicking on the table column header will automatically sort the data in ascending or descending order. This is a basic guide on how to use the DataTable library, assuming your data matches the format and expectations outlined in the code.
