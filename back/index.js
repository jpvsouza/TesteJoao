const express = require('express');
const api = require('./fetchData');
const cors = require('cors');

const app = express();

const PORT = 3001;

app.use(cors());

app.get('/covid', async (_req, res) => {
    const dados = await api();

    // retorna uma mensagem de erro caso tenha algum problema com a URL
    if(dados.message) return res.status(500).json(dados)

    res.status(200).json(dados);
})

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
