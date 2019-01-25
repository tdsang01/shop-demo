'use strict';

import Mongoose from './init-mongoose';
import modelClass from './classes/product';
import plugin from './plugins/product-plugin';

const schema = new Mongoose.Schema(
    {
        category: {
            type: Mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true
        },
        name: {
            type: String,
            required: true,
            maxlength: 255
        },
        price: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            maxlength: 255
        },
        detail: {
            type: String,
            default: 1000
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
schema.plugin(plugin);
module.exports = Mongoose.model('Product', schema);
