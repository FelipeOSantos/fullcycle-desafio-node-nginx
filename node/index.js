const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db-node',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
var listOfNamesHtml = "<ul>"

connection.connect()
const sql = `INSERT INTO people (name) values ('felipeosantos')`
connection.query(sql)
connection.commit()

connection.query('SELECT name AS name FROM people', function (error, results, fields) {
    if (error) throw error;

    results.forEach(element => {

        var li = "<li>" + element.name + "</li>";
        listOfNamesHtml += li;

        console.log('The name is: ', element.name);
    });

    listOfNamesHtml += "</ul>"

  });

connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1><h2>- Lista de nomes cadastrada no banco de dados.</h2>' + listOfNamesHtml)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})