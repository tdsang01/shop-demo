'use strict';

import dotEnv from 'dotenv';
dotEnv.config();

const db = {
    development: {
        URI: process.env.MONGODB_URL,
        USERNAME: process.env.MONGODB_USERNAME,
        PASSWORD: process.env.MONGODB_PASSWORD,
        IS_DEBUG: true,
        AUTH_DB: process.env.MONGODB_AUTH_DB
    },
    test: {},
    staging: {},
    production: {}
};

module.exports = db;