'use strict';

import Category from '../category';

async function checkForeignKey (next) {
    const category = this.category || this.getQuery().category;
    if (category) {
        const countCategory = await Category.count({ _id: category });
        if (countCategory < 1) {
            throw new Error('INCORRECT_FOREIGN_KEY');
        }
    }
    return next();
}

export default function (schema, options) {

    schema.pre('save', checkForeignKey);
    schema.pre('update', checkForeignKey);

};