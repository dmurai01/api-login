const request = require('supertest')

const redefinirSenha = async (email) => {

    const resposta = await request(process.env.BASE_URL)
        .post('/api/users/recover')
        .set('Content-type', 'application/json')
        .send(email)

    return resposta
}

module.exports = {
    redefinirSenha
}