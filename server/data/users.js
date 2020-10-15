const crypto = require('crypto')

const salt = crypto.randomBytes(16).toString('hex')

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: crypto.pbkdf2Sync('123456', salt, 1000, 64, 'sha512').toString('hex'),
    isAdmin: true
  },
  {
    name: 'Nandu',
    email: 'nandu@example.com',
    password: crypto.pbkdf2Sync('123456', salt, 1000, 64, 'sha512').toString('hex'),
  },
  {
    name: 'Chan',
    email: 'chan@example.com',
    password: crypto.pbkdf2Sync('123456', salt, 1000, 64, 'sha512').toString('hex'),
  },
]

module.exports = users
