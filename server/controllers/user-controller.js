'use strict';

import { Response, JWT } from '../helpers';
import { User } from '../models';

export default class UserController {
    static async login (req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.getOne({
                where: {
                    username
                },
                select: '_id role changePasswordAt password'
            });
            if (!user) {
                return next(new Error('USER_NOT_FOUND'));
            }
            const checkPassword = await User.comparePassword(password, user.password);
            if (!checkPassword) {
                return next(new Error('USER_INCORRECT'));
            }
            delete user.password;
            const token = await JWT.sign({
                user
            });
            return Response.success(res, {
                access_token: token
            });
        } catch (e) {
            return next(e);
        }
    }

    static async changePassword (req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                return next(new Error('INVALID_PARAMS'));
            }
            const user = await User.getOne({
                where: {
                    _id: req.user._id
                },
                select: 'password',
                isLean: false
            });
            if (!user) {
                return next(new Error('USER_NOT_FOUND'));
            }
            const checkPassword = await User.comparePassword(oldPassword, user.password);
            if (!checkPassword) {
                return next(new Error('PASSWORD_INCORRECT'));
            }
            user.password = newPassword;
            await user.save();
            return Response.success(res);
        } catch (e) {
            return next(e);
        }
    }

    static async getAll (req, res, next) {
        try {
            const results = await User.getAll();
            return Response.success(res, results);
        } catch (e) {
            return next(e);
        }
    }

    static async getOne (req, res, next) {
        try {
            const _id = req.params.id;
            const result = await User.getOne({
                where: {
                    _id
                },
                select: '-password -role',
            });
            return Response.success(res, result);
        } catch (e) {
            return next(e);
        }
    }

    static async create (req, res, next) {
        try {
            const data = req.body;
            data.role = User.ROLE.NORMAL;
            data.changePasswordAt = new Date();
            const result = await User.create(data);
            delete result._doc.password;
            return Response.success(res, result);
        } catch (e) {
            return next(e);
        }
    }

    static async update (req, res, next) {
        try {
            const _id = req.params.id;
            const data = req.body;
            delete data.username;
            delete data.createdAt;
            delete data.updatedAt;
            delete data.deletedAt;
            const user = await User.update({ _id }, { $set: data });
            if (user.nModified === 0) {
                return next(new Error('ACTION_FAILED'));
            }
            return Response.success(res);
        } catch (e) {
            return next(e);
        }
    }

    static async delete (req, res, next) {
        try {
            const { id } = req.params;
            const result = await User.softDelete({
                where: {
                    _id: id
                }
            });
            if (result.nModified === 0) {
                return next(new Error('ACTION_FAILED'));
            }
            return Response.success(res);
        } catch (e) {
            return next(e);
        }
    }
}