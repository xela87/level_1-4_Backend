// Configuration of table for local data
const configLocal = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім`я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ],
};

// Configuration of table for remote request
const configForAPI = {
    parent: '#usersTable',
    columns: [
        {title: '№', value: 'id'},
        {title: 'Ім`я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'День народження', value: 'birthday'},
        {title: 'Аватар', value: 'avatar'},
    ],
    apiUrl:'https://mock-api.shpp.me/okhokhlov/users',
}

// Data
const users = [
    {id: 30050, name: 'Василь', surname: 'Петров', age: 12},
    {id: 30051, name: 'Петро', surname: 'Васильєв', age: 15},
    {id: 30052, name: 'Микола', surname: 'Іванов', age: 25},
    {id: 30053, name: 'Іван', surname: 'Миколаєв', age: 27},
    {id: 30054, name: 'Ольга', surname: 'Пасічна', age: 5},
    {id: 30055, name: 'Катерина', surname: 'Сковорода', age: 29},
];

function DataTable(config, data) {
    let tableArea = document.querySelector(config.parent)
    let table = document.createElement('table')

    // Create head of table
    let tableHeadBlock = document.createElement('thead')
    let headRow = document.createElement('tr')
    for (let i = 0; i < config.columns.length; i++) {
        let th = document.createElement('th');
        th.innerText = config.columns[i].title;
        headRow.appendChild(th);
    }
    tableHeadBlock.appendChild(headRow)
    table.appendChild(tableHeadBlock)

    // Create body of table
    let tableBodyBlock = document.createElement('tbody')
    for (let i = 0; i < data.length; i++) {
        let tableRow = document.createElement('tr')
        for (let j = 0; j < config.columns.length; j++) {
            tableRow.insertCell().innerText = `${data[i][config.columns[j].value]}`
        }
        if (i % 2 !== 0) {
            tableRow.classList.add('dark-row');
        }
        tableBodyBlock.appendChild(tableRow)
    }
    table.appendChild(tableBodyBlock)
    tableArea.appendChild(table)
}

// Create my table
DataTable(configForAPI, users);