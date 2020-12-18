const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'David Oren',
    email: 'david@plantshareadmindavid.com',
    password: bcrypt.hashSync('keepStatic94', 10),
    isAdmin: true,
  },
  {
    name: 'Sason Mucha',
    email: 'sason@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Dolev Binyamin',
    email: 'dolev@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

module.exports = users;
