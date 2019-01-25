'use strict';

import Mongoose from './init-mongoose';
import modelClass from './classes/category';
// import plugin from './plugins/category-plugin';

const schema = new Mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255
        },
        deletedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

schema.loadClass(modelClass);
// schema.plugin(plugin);
module.exports = Mongoose.model('Category', schema);
