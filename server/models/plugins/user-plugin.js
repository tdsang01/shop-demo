'use strict';

import BCrypt from 'bcrypt';

async function hashPassword (next) {
    if (this.password) {
        this.password = await BCrypt.hash(this.password, 8);
    }
    return next();
}

export default function (schema, options) {

    schema.pre('save', hashPassword);
    schema.pre('update', hashPassword);

};