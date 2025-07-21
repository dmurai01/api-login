const request = require('supertest')
const { expect } = require('chai')
const { criarUsuarioValido } = require('../helpers/criarUsuarioValido')
const postLogin = require('../fixtures/usuariosInvalidos.json') // <- Incluído aqui
require('dotenv').config()

describe('Login', () => {
    let usuario

    before(async () => {
        usuario = await criarUsuarioValido()
    })

    describe('POST /api/users/login', () => {
        it('Deve retornar sucesso 200 com token quando usar credenciais válidas', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: usuario.email, senha: usuario.senha })

            expect(response.status).to.equal(200)
            expect(response.body.token).to.be.a('string')
        })

        it('Deve retornar erro 401 ao informar um login inválido', async () => {
            const bodyLogin = postLogin.emailNaoRegistrado

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(401)
            expect(response.body.message).to.contains('Credenciais inválidas')

        })

        it('Deve retornar erro 401 ao informar senha incorreta', async () => {
            const bodyLogin = {
                email: usuario.email,
                senha: 'senhaErrada123'
            }

            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(401)
            expect(response.body.message).to.contains('Credenciais inválidas.')

        })
        it('Deve bloquear o usuário após 3 tentativas inválidas seguidas', async () => {
            const senhaErrada = 'senhaErrada123'

            for (let i = 1; i <= 3; i++) {
                const response = await request(process.env.BASE_URL)
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send({ email: usuario.email, senha: senhaErrada })
            }

            // Quarta tentativa: usuário agora está bloqueado
            const responseBloqueado = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ email: usuario.email, senha: usuario.senha })

            expect(responseBloqueado.status).to.equal(403)
            expect(responseBloqueado.body.message).to.contains('Usuário bloqueado por excesso de tentativas inválidas.')
            console.log('Tentativa 4 (bloqueado):', responseBloqueado.body.message)
        })

    })
})
