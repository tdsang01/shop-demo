'use strict';

import { ProductController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlwares';
import { User } from '../models';
const isAuth = AuthMiddleware.isAuth;
const isAdmin = RoleMiddleware.isValidRole(User.ROLE.ADMIN);

module.exports = (app, router) => {

    router.route('/products')
        .get(ProductController.getAll);

    router.route('/products/:id')
        .get(ProductController.getOne);

    router.route('/admin/products')
        .post([isAuth, isAdmin], ProductController.create);

    router.route('/admin/products/:Id')
        .put([isAuth, isAdmin], ProductController.update)
        .delete([isAuth, isAdmin], ProductController.delete);

    router.route('/categories/:id/products')
        .get(ProductController.getAllByCategory);
};
