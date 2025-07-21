const request = require('supertest')

const loginUsuario = async (dadosLogin) => {

    const resposta = await request(process.env.BASE_URL)
        .post('/api/users/login')
        .set('Content-type', 'application/json')
        .send(dadosLogin)

    return resposta
}

module.exports = {
    loginUsuario
}