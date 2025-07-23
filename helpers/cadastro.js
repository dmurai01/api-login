
const request = require('supertest')
require('dotenv').config()

const cadastrarNovoUsuario = async (nome, email, senha) => {

    const resposta = await request(process.env.BASE_URL)
        .post('/api/users/register')
        .send({
            'nome': nome,
            'email': email,
            'senha': senha
        });
    
    return resposta
}

module.exports = {
    cadastrarNovoUsuario
}