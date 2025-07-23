
const { cadastrarNovoUsuario } = require('../helpers/cadastro.js')

// let nome = `Novo Usuário ${Math.floor(Math.random() * 1000)}`
// let email = `email${Math.floor(Math.random() * 1000000)}@teste.com`

const novoUsuarioValido = async () => {

    const nome = `Novo Usuário ${Math.floor(Math.random() * 1000)}`
    const email = `email${Math.floor(Math.random() * 1000000)}@teste.com`

    const status = await cadastrarNovoUsuario(nome, email, senha = '123456')

    if (status.status !== 201) throw new Error('Erro ao cadastrar usuário')
    return { email, senha }
}

module.exports = {
    novoUsuarioValido
}



