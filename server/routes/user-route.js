'use strict';

import { UserController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlwares';
import { User } from '../models';
const isAdmin = RoleMiddleware.isValidRole(User.ROLE.ADMIN);

module.exports = (app, router) => {

    router.route('/login')
        .post(UserController.login);

    router.route('/change-password')
        .put([AuthMiddleware.isAuth], UserController.changePassword);

    router.route('/users')
        .get([AuthMiddleware.isAuth, isAdmin], UserController.getAll)
        .post([AuthMiddleware.isAuth, isAdmin], UserController.create);

    router.route('/users/:id')
        .get([AuthMiddleware.isAuth, isAdmin], UserController.getOne)
        .put([AuthMiddleware.isAuth, isAdmin], UserController.update)
        .delete([AuthMiddleware.isAuth, isAdmin], UserController.delete);
};
