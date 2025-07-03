const bcyrpt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcyrpt.genSalt(10);
    return await bcyrpt.hash(password, salt);
    }
const comparePassword = async (password, hash) => {
    return await bcyrpt.compare(password, hash);
}
module.exports = {
    hashPassword,
    comparePassword
};
// This module provides functions to hash passwords and compare them using bcrypt.