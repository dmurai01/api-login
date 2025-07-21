const { expect } = require('chai')
require('dotenv').config()
const { redefinirSenha } = require('../helpers/redefinirSenha.js')
const { criarUsuarioValido } = require('../helpers/criarUsuarioValido.js')

describe('Redefinir senha', () => {
    describe('POST /recover', () => {
        let emailValido

        before(async () => {
            const usuario = await criarUsuarioValido()
            emailValido = { email: usuario.email }
        })

        it('Deve retornar 200 quando enviar email existente para recuperar a senha e receber uma nova senha', async () => {
            const response = await redefinirSenha(emailValido)

            expect(response.status).to.equal(200)
            expect(response.body.message).to.contains('Senha redefinida com sucesso')
            expect(response.body.novaSenha).to.be.a('string')
        })

        it('Deve retornar 400 quando enviar email vazio', async () => {
            const response = await redefinirSenha({ email: '' })
            expect(response.status).to.equal(400)
            expect(response.body.message).to.contains('Email é obrigatório')
        })

        it('Deve retornar 404 quando enviar email não cadastrado', async () => {
            const response = await redefinirSenha({ email: 'naoexiste@agora.com' })
            expect(response.status).to.equal(404)
            expect(response.body.message).to.contains('Usuário não encontrado')
        })
    })
})
