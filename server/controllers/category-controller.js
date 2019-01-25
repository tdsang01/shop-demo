'use strict';

import { omit } from 'lodash';
import { Response } from '../helpers';
import { Category } from '../models';

export default class CategoryController {

    static async getAll (req, res, next) {
        try {
            const results = await Category.getAll();
            return Response.success(res, results);
        } catch (e) {
            return next(e);
        }
    }

    static async getOne (req, res, next) {
        try {
            const _id = req.params.id;
            const result = await Category.getOne({
                where: {
                    _id
                },
            });
            return Response.success(res, result);
        } catch (e) {
            return next(e);
        }
    }

    static async create (req, res, next) {
        try {
            const data = req.body;
            omit(data, ['deletedAt', 'updatedAt', 'createdAt']);
            const result = await Category.create(data);
            return Response.success(res, result);
        } catch (e) {
            return next(e);
        }
    }

    static async update (req, res, next) {
        try {
            const _id = req.params.id;
            const data = req.body;
            omit(data, ['deletedAt', 'updatedAt', 'createdAt']);
            const result = await Category.update({ _id }, { $set: data });
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
            const deleteUser = await Category.softDelete({
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