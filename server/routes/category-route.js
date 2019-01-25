'use strict';

import { CategoryController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlwares';
import { User } from '../models';
const isAuth = AuthMiddleware.isAuth;
const isAdmin = RoleMiddleware.isValidRole(User.ROLE.ADMIN);

module.exports = (app, router) => {

    router.route('/categories')
        .get(CategoryController.getAll);

    router.route('/categories/:id')
        .get(CategoryController.getOne);

    router.route('/admin/categories')
        .post([isAuth, isAdmin], CategoryController.create);

    router.route('/admin/categories/:id')
        .put([isAuth, isAdmin], CategoryController.update)
        .delete([isAuth, isAdmin], CategoryController.delete);
};
