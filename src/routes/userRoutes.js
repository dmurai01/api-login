const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'segredo-super-seguro'; // Deve ser igual ao do controller

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido.' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/update', authMiddleware, userController.update);
router.post('/recover', userController.recoverPassword);
router.get('/', userController.getAllUsers);

module.exports = router; 