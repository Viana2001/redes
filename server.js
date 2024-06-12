const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar o banco de dados MySQL
const db = mysql.createConnection({
    host: '34.45.3.173',
    user: 'root',
    password: '1234',
    database: 'rede'
});

// Conectar ao banco de dados MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.use(bodyParser.json());

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(400).send('Nome de usuário já existe');
        } else {
            res.status(200).send('Cadastro realizado com sucesso! Por favor, faça login.');
        }
    });
});

// Rota para autenticar o usuário
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err || result.length === 0) {
            res.status(401).send('Nome de usuário ou senha inválidos');
        } else {
            res.status(200).json({ username: result[0].username });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
