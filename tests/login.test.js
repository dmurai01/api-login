const { expect } = require('chai')
require('dotenv').config()
const { loginUsuario } = require('../helpers/login.js')
const { novoUsuarioValido } = require('../helpers/cadastroNovoValido.js')

let usuario

describe('Login', () => {
    beforeEach(async () => {
        usuario = await novoUsuarioValido()
    });

    describe('POST /api/users/login', () => {
        it('Deve retornar sucesso 200 com token quando usar credenciais válidas de usuário não bloqueado', async () => {
            const resposta = await loginUsuario(usuario)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        })

        it('Deve retornar 400 e mensagem de erro quando não usar email ou senha', async () => {
            usuario.senha = ''
            const resposta = await loginUsuario(usuario)

            expect(resposta.status).to.equal(400)
            expect(resposta.body.message).to.equal('Email e senha são obrigatórios.')
        })

        it('Deve retornar 401 e mensagem de erro quando enviar credenciais com senha inválida', async () => {
            usuario.senha = '654321'
            const resposta = await loginUsuario(usuario)

            expect(resposta.status).to.equal(401)
            expect(resposta.body.message).to.equal('Credenciais inválidas.')
        })

        it('Deve retornar 403 e mensagem de erro quando enviar credenciais incorretas 3 e bloquear usuário', async () => {

            for (let i = 0; i < 3; i++) {
                usuario.email = usuario.email
                usuario.senha = '000000'

                await loginUsuario(usuario)
            }

            usuario.senha = '123456'

            const resposta = await loginUsuario(usuario)

            expect(resposta.status).to.equal(403);
            expect(resposta.body.message).to.equal('Usuário bloqueado por excesso de tentativas inválidas.');
        })


    })



})

