import dotEnv from 'dotenv';
dotEnv.config();

module.exports = {
    admin: process.env.ADMIN_ROLE,
    user: process.env.NORMAL_ROLE,
};