const mysql = require('mysql');

// Configurações de conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: '34.45.3.173',
    user: 'root',
    password: '1234',
    database: 'rede'
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão: ' + err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

// Exemplo de consulta ao banco de dados
connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) throw error;
    if (results && results.length > 0) {
        console.log('Resultado da consulta: ', results[0].solution);
    } else {
        console.log('Nenhum resultado encontrado.');
    }
});

// Encerrar a conexão
connection.end();
