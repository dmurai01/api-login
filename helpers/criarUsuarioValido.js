const { faker } = require('@faker-js/faker')
const { cadastrarNovoUsuario } = require('./cadastro')

async function criarUsuarioValido(senha = '123456') {
    const nome = faker.person.fullName()
    const email = faker.internet.email({ provider: 'teste.com' })

    const status = await cadastrarNovoUsuario(nome, email, senha)
    if (status !== 201) throw new Error('Erro ao cadastrar usuário')
    return { nome, email, senha }
}

module.exports = { criarUsuarioValido }
