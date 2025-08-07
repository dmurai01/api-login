const userModel = require('../models/userMock');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'segredo-super-seguro'; // Para estudo

function gerarSenhaAleatoria(tamanho = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return senha;
}

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }
  if (userModel.findByEmail(email)) {
    return res.status(409).json({ message: 'Email já cadastrado.' });
  }
  const hash = await bcrypt.hash(senha, 10);
  const user = {
    nome,
    email,
    senha: hash,
    tentativasInvalidas: 0,
    bloqueado: false
  };
  userModel.addUser(user);
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', id: user.id });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }
  const user = userModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }
  if (user.bloqueado) {
    return res.status(403).json({ message: 'Usuário bloqueado por excesso de tentativas inválidas.' });
  }
  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) {
    user.tentativasInvalidas = (user.tentativasInvalidas || 0) + 1;
    if (user.tentativasInvalidas >= 3) {
      user.bloqueado = true;
    }
    userModel.saveUsers();
    return res.status(401).json({ message: user.bloqueado ? 'Usuário bloqueado por excesso de tentativas inválidas.' : 'Credenciais inválidas.' });
  }
  user.tentativasInvalidas = 0;
  user.bloqueado = false;
  userModel.saveUsers();
  // Gerar token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ message: 'Login realizado com sucesso.', id: user.id, token });
};

exports.update = async (req, res) => {
  const { senhaAtual, novoNome, novaSenha } = req.body;
  const { id, email } = req.user;
  if (!senhaAtual) {
    return res.status(400).json({ message: 'senhaAtual é obrigatória.' });
  }
  const user = userModel.users.find(u => u.id == id && u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  const senhaCorreta = await bcrypt.compare(senhaAtual, user.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ message: 'Senha atual incorreta.' });
  }
  if (novoNome) {
    user.nome = novoNome;
  }
  if (!novaSenha) {
    return res.status(400).json({ message: 'Nova senha é obrigatória.' });
  }
  if (novaSenha.length < 6) {
    return res.status(400).json({ message: 'A nova senha deve ter pelo menos 6 caracteres.' });
  }
  
  if (novaSenha) {
    user.senha = await bcrypt.hash(novaSenha, 10);
  }
  userModel.saveUsers();
  return res.status(200).json({ message: 'Cadastro atualizado com sucesso.' });
};

exports.recoverPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório.' });
  }
  const user = userModel.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }
  const novaSenha = gerarSenhaAleatoria(10);
  user.senha = await bcrypt.hash(novaSenha, 10);
  user.tentativasInvalidas = 0;
  user.bloqueado = false;
  userModel.saveUsers();
  // Em produção, a senha seria enviada por email. Aqui, retornamos na resposta para fins de estudo.
  return res.status(200).json({ message: 'Senha redefinida com sucesso.', novaSenha });
};

exports.getAllUsers = (req, res) => {
  // Retorna todos os usuários, omitindo a senha
  const users = userModel.users.map(({ senha, ...rest }) => rest);
  res.status(200).json(users);
}; 