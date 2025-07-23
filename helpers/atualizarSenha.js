const request = require('supertest')

const atualizarSenha = async (senhaAtual, novoNome, novaSenha, token) => {
    // const pegarToken = await loginUsuario(bodyLogin)
    // token = pegarToken.body.token

    const resposta = await request(process.env.BASE_URL)
        .patch('/api/users/update')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            'senhaAtual': senhaAtual,
            'novoNome': novoNome,
            'novaSenha': novaSenha
        })
        return resposta
}

module.exports = {
    atualizarSenha
}

