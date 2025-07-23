const { expect } = require('chai')
require('dotenv').config()
const { recuperarSenha } = require('../helpers/recuperarSenha.js');
const { novoUsuarioValido } = require('../helpers/cadastroNovoValido.js');

let usuario
let email

describe('Esqueci Minha Senha', () => {

    beforeEach(async () => {
        usuario = await novoUsuarioValido()
        email = `{"email":"${usuario.email}"}`
    });

    describe('POST /api/users/recover', () => {

        it('Deve retornar 200 quando enviar email existente para recuperar a senha e receber uma nova senha', async () => {
            const resposta = await recuperarSenha(email)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.novaSenha).to.be.exist
        })

        it('Deve retornar 400 quando enviar email vazio', async () => {
            email = ''

            const resposta = await recuperarSenha(email)
            expect(resposta.status).to.equal(400)
        })

        it('Deve retornar 404 quando enviar email não cadastrado', async () => {
            email = '{"email":"naoexiste@agora.com"}'

            const resposta = await recuperarSenha(email)
            expect(resposta.status).to.equal(404)
        })
    })

});
