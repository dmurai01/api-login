const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { cadastrarNovoUsuario } = require('../helpers/cadastro.js')

describe('GET /api/users/register', () => {
    let nome = `Novo Usuário ${Math.floor(Math.random() * 1000)}`
    let email = `bloq${Math.floor(Math.random() * 1000000)}@teste.com`
     
    it('Deve retornar sucesso 201 quando cadastrar um novo usuário com dados válidos', async () => {
        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(201)
    });

    it('Deve retornar erro 400 quando cadastrar com dados faltando', async () => {
        nome = ''

        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(400)
    });

    it('Deve retornar erro 409 quando cadastar com email já cadastrado', async () => {
        nome = 'Teste Email'
        
        const statusCadastro = await cadastrarNovoUsuario(nome, email, '123456')
        expect(statusCadastro).to.equal(409)
    });



});