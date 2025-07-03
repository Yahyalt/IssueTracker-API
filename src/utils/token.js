const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
        };

    module.exports = { generateToken };
// This module provides a function to generate a JWT token for a user, including their ID,
    