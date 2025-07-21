
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')
const { loginUsuario } = require('../helpers/login.js')
const { recuperarSenha } = require('../helpers/recuperarSenha.js')
const { atualizarSenha } = require('../helpers/atualizarSenha.js')

let bodyLogin

describe('Atualizar Senha', () => {
    beforeEach(() => {
        bodyLogin = { ...postLogin }
    });

    describe('PATCH /api/users/update', () => {

        it('Deve retornar sucesso 200 quando enviar credenciais válidas, token de acesso e nova senha', async () => {
            const email = '{"email":"teste@teste.com"}'
            const recSenha = await recuperarSenha(email)

            bodyLogin.email = 'teste@teste.com'
            bodyLogin.senha = recSenha.body.novaSenha

            const pegarToken = await loginUsuario(bodyLogin)
            token = pegarToken.body.token

            const resposta = await atualizarSenha(recSenha.body.novaSenha, '', '123456', token)
            expect(resposta.status).to.equal(200)
        })

        it('Deve retornar erro 400 quando for enviada a senha atual vazia', async () => {
            const pegarToken = await loginUsuario(bodyLogin)
            token = pegarToken.body.token

            const resposta = await atualizarSenha('', '', '123456', token)
            expect(resposta.status).to.equal(400)

        })

        it('Deve retornar erro 401 quando for enviada a senha atual incorreta', async () => {
            const pegarToken = await loginUsuario(bodyLogin)
            token = pegarToken.body.token

            const resposta = await atualizarSenha('000000', '', '123456', token)
            expect(resposta.status).to.equal(401)

        })

    })

});
