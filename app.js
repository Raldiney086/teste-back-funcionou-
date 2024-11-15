//Chmando as bibliotecas como requisição
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

// Conexão com o BD
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'back',
    password: 'raldiney13',
    port: 5432,
});

//Definir a porta para rodar o servidor
const port = 3000

//Middleware => pega as informações do html 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//Para puxar a requsicão do html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forms.html'));
});

// Para puxar arquivos do html
app.use(express.static(path.join(__dirname, 'public')));

// Rota para cadastrar usuarios
app.post('/register', async (req, res) => {
    const { name, email, password, cpf, endereco } = req.body;

    try {
        const query = 'INSERT INTO users (name, email, password, cpf, endereco) VALUES ($1, $2, $3, $4, $5)';
        const values = [name, email, password, cpf, endereco];

        await pool.query(query, values);

        res.send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error(err); //Se o cadastro já foi feito
        res.send('Erro ao cadastrar o usuário!');
    }
});



// Rota para exibir a página de lista de usuários
/*
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

// Rota para obter os dados dos usuários em formato JSON
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, email, password, cpf, endereco FROM users');
        res.json(result.rows); // Enviar os dados dos usuários como JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});*/


// Iniciar o servidor
app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
