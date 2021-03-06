'use strict';

import { omit } from 'lodash';
import { Response } from '../helpers';
import { Product } from '../models';

export default class ProductController {

    static async getAll (req, res, next) {
        try {
            const results = await Product.getAll();
            return Response.success(res, results);
        } catch (e) {
            return next(e);
        }
    }

    static async getOne (req, res, next) {
        try {
            const _id = req.params.id;
            const result = await Product.getOne({
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
            const result = await Product.create(data);
            delete result._doc.createdAt;
            delete result._doc.updatedAt;
            return Response.success(res, result._doc);
        } catch (e) {
            return next(e);
        }
    }

    static async update (req, res, next) {
        try {
            const _id = req.params.id;
            const data = req.body;
            omit(data, ['deletedAt', 'updatedAt', 'createdAt']);
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

    static async getAllByCategory (req, res, next) {
        try {
            const id = req.params.id;
            const results = await Product.getAll({
                where: {
                    category: id
                }
            });
            return Response.success(res, results);
        } catch (e) {
            return next(e);
        }
    }
}