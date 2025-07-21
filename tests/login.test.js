const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')
const { loginUsuario } = require('../helpers/login.js')
const { cadastrarNovoUsuario } = require('../helpers/cadastro.js')
const { redefinirSenha } = require('../helpers/redefinirSenha.js')

let bodyLogin = { ...postLogin }

describe('Login', () => {
    describe('POST /api/users/login', () => {
        it('Deve retornar sucesso 200 com token quando usar credenciais válidas de usuário não bloqueado', async () => {
            const resposta = await loginUsuario(bodyLogin)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.token).to.be.a('string')
        });

        it('Deve retornar 400 e mensagem de erro quando não usar email ou senha', async () => {
            bodyLogin.senha = ''

            const resposta = await loginUsuario(bodyLogin)
            expect(resposta.status).to.equal(400)
            expect(resposta.body.message).to.equal('Email e senha são obrigatórios.')
        });

        it('Deve retornar 401 e mensagem de erro quando enviar credenciais com senha inválida', async () => {
            bodyLogin.senha = '654321'

            const resposta = await loginUsuario(bodyLogin)
            expect(resposta.status).to.equal(401)
            expect(resposta.body.message).to.equal('Credenciais inválidas.')
        })

        it('Deve retornar 403 e mensagem de erro quando enviar credenciais incorretas 3 e bloquear usuário', async () => {
            const nome = `Usuário Bloqueado ${Math.floor(Math.random() * 1000)}`
            const email = `bloq${Math.floor(Math.random() * 1000000)}@teste.com`

            await cadastrarNovoUsuario(nome, email, '123456')

            for (let i = 0; i < 3; i++) {
                bodyLogin.email = email
                bodyLogin.senha = '000000'
                await request(process.env.BASE_URL)
                    .post('/api/users/login')
                    .send(bodyLogin);
            }

            bodyLogin.senha = '123456'

            const resposta = await loginUsuario(bodyLogin)

            expect(resposta.status).to.equal(403);
            expect(resposta.body.message).to.equal('Usuário bloqueado por excesso de tentativas inválidas.');
        })

        
    });

    describe('POST /api/users/recover', () => {
        let email = '{"email":"teste@teste.com"}'

        it('Deve retornar 200 quando enviar email existente para recuperar a senha e receber uma nova senha', async () => {
            const resposta = await redefinirSenha(email)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.novaSenha).to.be.exist
        });

        it('Deve retornar 400 quando enviar email vazio', async () => {
            email = ''

            const resposta = await redefinirSenha(email)
            expect(resposta.status).to.equal(400)
        });

        it.only('Deve retornar 404 quando enviar email não cadastrado', async () => {
            email = '{"email":"nãoexiste@agora.com"}'

            const resposta = await redefinirSenha(email)
            expect(resposta.status).to.equal(404)
        });
    });

});

