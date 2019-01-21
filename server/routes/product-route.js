'use strict';

import { ProductController } from '../controllers';
// import { AuthMiddleware, RoleMiddleware } from '../middlwares';
// import { User } from '../models';
// const isAdmin = RoleMiddleware.isValidRole(User.ROLE.ADMIN);

module.exports = (app, router) => {

    router.route('/products')
        .get(ProductController.getAll)
        .post(ProductController.create);

    router.route('/products/:id')
        .get(ProductController.getOne)
        .put(ProductController.update)
        .delete(ProductController.delete);
};
