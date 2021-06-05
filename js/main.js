
    /** Configuration of table for local data */
const configLocal = {
    parent: '#usersTable',
    columns: [
        {title: '№', value: 'num'},
        {title: 'Ім`я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ],
};

    /** Configuration of table for remote request */
const configForAPI = {
    parent: '#usersTable',
    columns: [
        {title: '№', value: 'id'},
        {title: 'Ім`я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'День народження', value: 'birthday'},
        {title: 'Аватар', value: 'avatar'},
    ],
    apiUrl: 'https://mock-api.shpp.me/okhokhlov/users',
}

    /** Local data */
const users = [
    {id: 30050, name: 'Василь', surname: 'Петров', age: 12},
    {id: 30051, name: 'Петро', surname: 'Васильєв', age: 15},
    {id: 30052, name: 'Микола', surname: 'Іванов', age: 25},
    {id: 30053, name: 'Іван', surname: 'Миколаєв', age: 27},
    {id: 30054, name: 'Ольга', surname: 'Пасічна', age: 5},
    {id: 30055, name: 'Катерина', surname: 'Сковорода', age: 29},
];

    /** Getting data from server */

let getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error in ${url}, with status ${response}`)
    }
    return await response.json()
}

function DataTable(config, data) {
    let tableArea = document.querySelector(config.parent)
    let table = document.createElement('table')

    /** Create head of table */
    table.appendChild(createTableHead(config))

    /** Create body of table */
    if (!data) {
        table.appendChild(fillTableBodyRemoteData(config))
    } else {
        table.appendChild(fillTableBodyLocalData(config, data))
    }
    tableArea.appendChild(table)
}

function createTableHead(config) {
    let thead = document.createElement('thead')
    let hr = document.createElement('tr')
    for (let i = 0; i < config.columns.length; i++) {
        let th = document.createElement('th');
        th.innerText = config.columns[i].title;
        hr.appendChild(th);
    }
    thead.appendChild(hr)
    return thead
}

function fillTableBodyRemoteData(config) {
    let tbody = document.createElement('tbody')
    for (let i = 1; i <= 50; i++) {
        getData(config.apiUrl).then((data) => {
            let tr = document.createElement('tr')
            for (let j = 0; j < config.columns.length; j++) {
                tr.insertCell().innerText = `${data.data[i][config.columns[j].value]}`
            }
            if (i % 2 !== 0) {
                tr.classList.add('dark-row');
            }
            tbody.appendChild(tr)
        })
    }
    return tbody
}

function fillTableBodyLocalData(config, data) {
    let tbody = document.createElement('tbody')
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr')
        tr.insertCell().innerText = `${i + 1}`
        for (let j = 1; j < config.columns.length; j++) {
            tr.insertCell().innerText = `${data[i][config.columns[j].value]}`
        }
        if (i % 2 !== 0) {
            tr.classList.add('dark-row');
        }
        tbody.appendChild(tr)
    }
    return tbody
}

    /** getting data from server */

DataTable(configForAPI);

    /** getting data from local array */

//DataTable(configLocal, users);
