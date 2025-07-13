module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Login - Estudo',
    version: '1.0.0',
    description: 'API REST para gestão de login de usuários (projeto de estudo)'
  },
  servers: [
    { url: 'http://localhost:3000' }
  ],
  paths: {
    '/api/users': {
      get: {
        summary: 'Listar todos os usuários cadastrados',
        description: 'Retorna a lista de todos os usuários cadastrados (sem o campo senha).',
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      nome: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      tentativasInvalidas: { type: 'integer' },
                      bloqueado: { type: 'boolean' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/users/register': {
      post: {
        summary: 'Cadastrar novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                  nome: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  senha: { type: 'string', format: 'password' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Usuário cadastrado com sucesso.' },
          400: { description: 'Dados obrigatórios faltando.' },
          409: { description: 'Email já cadastrado.' }
        }
      }
    },
    '/api/users/login': {
      post: {
        summary: 'Login do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  senha: { type: 'string', format: 'password' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login realizado com sucesso.' },
          400: { description: 'Dados obrigatórios faltando.' },
          401: { description: 'Credenciais inválidas.' },
          403: { description: 'Usuário bloqueado.' }
        }
      }
    },
    '/api/users/update': {
      put: {
        summary: 'Alterar cadastro do usuário (autenticado)',
        security: [{ bearerAuth: [] }],
        description: 'Requer autenticação JWT via header Authorization: Bearer <token>. Só é possível alterar nome e/ou senha.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['senhaAtual'],
                properties: {
                  senhaAtual: { type: 'string', format: 'password' },
                  novoNome: { type: 'string' },
                  novaSenha: { type: 'string', format: 'password' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Cadastro atualizado com sucesso.' },
          400: { description: 'Dados obrigatórios faltando.' },
          401: { description: 'Senha atual incorreta ou token inválido.' },
          404: { description: 'Usuário não encontrado.' }
        }
      }
    },
    '/api/users/recover': {
      post: {
        summary: 'Recuperar senha do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Senha redefinida com sucesso.' },
          400: { description: 'Email é obrigatório.' },
          404: { description: 'Usuário não encontrado.' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}; 