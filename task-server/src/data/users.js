const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: '123456', // Will be hashed by pre-save hook
        role: 'admin',
    },
    {
        name: 'Regular User',
        email: 'user@gmail.com',
        password: '123456',
        role: 'user',
    },
];

module.exports = users;
