'use strict';

import { Response } from '../helpers';
import { Product } from '../models';

export default class UserController {

    static async getAll (req, res, next) {
        try {
            const users = await Product.getAll();
            return Response.success(res, users);
        } catch (e) {
            return next(e);
        }
    }

    static async getOne (req, res, next) {
        try {
            const _id = req.params.id;
            const user = await Product.getOne({
                where: {
                    _id
                },
            });
            return Response.success(res, user);
        } catch (e) {
            return next(e);
        }
    }

    static async create (req, res, next) {
        try {
            const data = req.body;
            const result = await Product.create(data);
            return Response.success(res, result);
        } catch (e) {
            return next(e);
        }
    }

    static async update (req, res, next) {
        try {
            const _id = req.params.id;
            const data = req.body;
            delete data.createdAt;
            delete data.updatedAt;
            delete data.deletedAt;
            const result = await Product.update({ _id }, { $set: data });
            if (result.nModified === 0) {
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
            const deleteUser = await Product.softDelete({
                where: {
                    _id: id
                }
            });
            if (deleteUser.nModified === 0) {
                return next(new Error('ACTION_FAILED'));
            }
            return Response.success(res);
        } catch (e) {
            return next(e);
        }
    }
}