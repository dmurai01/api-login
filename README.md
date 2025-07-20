# API de Login (Estudo)

API REST para gestão de login de usuários, desenvolvida em Node.js com Express. **Projeto para fins de estudo de testes de software.**

## Estrutura de Pastas

```
api-login/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   │   ├── userMock.js
│   │   └── users.json
│   ├── routes/
│   ├── services/
│   └── app.js
├── tests/
│   ├── integration/
│   └── unit/
├── .env
├── package.json
└── README.md
```

## Funcionalidades
- Cadastro de usuário
- Login (com bloqueio após 3 tentativas inválidas)
- Alteração de cadastro (requer autenticação via token JWT; só é possível alterar nome e senha)
- Recuperação de senha

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   node src/app.js
   ```

A API estará disponível em `http://localhost:3000`.

## Autenticação

Após o login, será retornado um token JWT. Para alterar o cadastro, envie esse token no header:

```
Authorization: Bearer <token>
```

## Testes Automatizados

O projeto utiliza as seguintes dependências para testes:
- **Mocha**: Framework de testes.
- **Chai**: Biblioteca de asserções.
- **Supertest**: Testes de integração para rotas HTTP.
- **Mochawesome**: Geração de relatórios em HTML para os testes Mocha.

Para instalar as dependências de teste, execute:
```bash
npm install --save-dev mocha chai supertest mochawesome
```

Para rodar os testes:
```bash
npm test
```

Os testes estão organizados na pasta `tests/`, separados em testes unitários e de integração.

## Configuração do arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
BASE_URL="http://localhost:3000"
```

- `BASE_URL`: URL base onde o servidor da API-LOGIN estará rodando.

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

**Atenção:** Este projeto não utiliza banco de dados real. Os dados dos usuários são armazenados em um arquivo mock (`src/models/userMock.js`). O arquivo `src/models/users.json` será criado automaticamente na primeira vez que um usuário for cadastrado. Os dados persistem entre reinicializações do servidor, mas podem ser perdidos se o arquivo for removido ou editado manualmente.