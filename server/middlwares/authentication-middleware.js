'use strict';

import { JWT } from '../helpers';
import { User } from '../models';

export default class AuthMiddleware {

    static isAuth = async (req, res, next) => {
        try {
            const token = JWT.getToken(req);
            if (!token) {
                return next(new Error('AUTHENTICATION_FAILED'));
            }
            const verifyUser = await AuthMiddleware.verifyUserFromToken(token);
            req.user = verifyUser.user;
            const user = await User.getOne({
                where: {
                    _id: req.user._id
                },
                select: '_id changePasswordAt'
            });
            if (!user) {
                return next(new Error('AUTHENTICATION_FAILED'));
            }
            if (user.changePasswordAt && new Date(user.changePasswordAt).toString() !== new Date(req.user.changePasswordAt).toString()) {
                return next(new Error('AUTHENTICATION_FAILED'));
            }
            if (next) {
                return next();
            }
        } catch (error) {
            return next(error);
        }
    };

    static verifyUserFromToken = async (token, option) => {
        const verifiedData = await JWT.verify(token, option);
        return {
            ...verifiedData
        };
    };
}