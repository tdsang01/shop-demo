'use strict';

import BaseModelClass from './Base'
import BCrypt from 'bcrypt';

export default class ModelClass extends BaseModelClass {

    static async comparePassword (password, passwordHash) {
        return await BCrypt.compare(password, passwordHash);
    }
}
