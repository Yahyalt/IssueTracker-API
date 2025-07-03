const db = require('../config/db');

const createUser = async (user) => {
    return db('users').insert(user).returning(['id', 'name', 'email', 'role']);
};
const findUserByEmail = async (email) => {
    return db('users').where({email}).first();

};
module.exports = {createUser, findUserByEmail};

