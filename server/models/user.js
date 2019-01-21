'use strict';

import Mongoose from './init-mongoose';
import modelClass from './classes/user';
import plugin from './plugins/user-plugin';

const ROLE = {
    ADMIN: 'admin',
    NORMAL: 'normal'
};

const schema = new Mongoose.Schema(
    {
        username: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true
        },
        password: {
            type: String,
            maxlength: 255,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(ROLE)
        },
        changePasswordAt: {
            type: Date
        },
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

schema.statics = {
    ROLE
};
schema.loadClass(modelClass);
schema.plugin(plugin);
module.exports = Mongoose.model('User', schema);
