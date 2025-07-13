# API de Login (Estudo)

API REST para gestão de login de usuários, desenvolvida em Node.js com Express. **Projeto para fins de estudo de testes de software.**

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

## Documentação Swagger

Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

**Atenção:** Este projeto não utiliza banco de dados real. Os dados dos usuários são armazenados em um arquivo mock (`src/models/userMock.js`). O arquivo `src/models/users.json` será criado automaticamente na primeira vez que um usuário for cadastrado. Os dados persistem entre reinicializações do servidor, mas podem ser perdidos se o arquivo for removido ou editado manualmente. 