const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, 'users.json');

let users = [];
let lastId = 0;

// Carregar usuários do arquivo, se existir
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  if (users.length > 0) {
    lastId = Math.max(...users.map(u => Number(u.id) || 0));
  }
}

function saveUsers() {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

function getNextId() {
  lastId += 1;
  return lastId;
}

function addUser(user) {
  user.id = getNextId();
  users.push(user);
  saveUsers();
}

module.exports = {
  users,
  findByEmail,
  addUser,
  saveUsers,
  getNextId
}; 