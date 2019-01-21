'use strict';

export default class BaseModelClass {

    static async getAll(params) {
        params = Object.assign(
            {
                where: null,
                limit: 1000,
                skip: 0,
                sort: {createdAt: -1},
                select: null,
                populate: '',
                isLean: true
            },
            params
        );
        return await this
            .find(params.where)
            .limit(params.limit)
            .skip(params.skip)
            .sort(params.sort)
            .select(params.select)
            .populate(params.populate)
            .lean(params.isLean);
    }

    static async getOne(params) {
        params = Object.assign(
            {
                where: null,
                select: null,
                populate: ''
            },
            params
        );
        return await this
            .findOne(params.where)
            .populate(params.populate)
            .select(params.select);
    }

    static async softDelete (data) {
        return await this.update(data.where, {$set: { deletedAt: new Date() }});
    }
}
