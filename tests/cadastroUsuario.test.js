const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { cadastrarNovoUsuario } = require('../helpers/cadastro.js')
const { faker } = require('@faker-js/faker')

describe('POST /register', () => {
    let emailReutilizado

    before(async () => {
        // Gerado uma vez para o teste de duplicidade
        emailReutilizado = faker.internet.email({ provider: 'teste.com' })
    })

    it('Deve retornar sucesso 201 quando cadastrar um novo usuário com dados válidos', async () => {
        const nome = faker.person.fullName()
        const email = emailReutilizado

        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(201)
    })

    it('Deve retornar erro 400 quando cadastrar com dados faltando', async () => {
        const nome = '' // nome ausente
        const email = faker.internet.email({ provider: 'teste.com' }) // novo email

        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(400)
    })

    it('Deve retornar erro 409 quando cadastrar com email já cadastrado', async () => {
        const nome = faker.person.firstName()
        const email = emailReutilizado // mesmo email do teste de sucesso

        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(409)
    })
})
