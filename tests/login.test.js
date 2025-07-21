const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /api/users/login', () => {
        it('Deve retornar sucesso 200 com token quando usar credenciais válidas de usuário não bloqueado', () => {
            
        });
        
    });
    
});

