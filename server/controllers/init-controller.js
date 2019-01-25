'use strict';

import { Response } from '../helpers';
import { User, Product, Category } from '../models';

export default class InitControllerController {

    static async initAdmin (req, res, next) {
        try {
            await User.remove();
            const admin = {
                username: 'admin',
                password: 'Admin123!@#',
                role: User.ROLE.ADMIN,
                changePasswordAt: new Date()
            };
            await User.create(admin);
            return Response.success(res);
        } catch (e) {
            next(e);
        }
    }

    static async initCategory () {
        try {
            await Category.remove();
            const data = [
                {
                    name: 'Laptop'
                },
                {
                    name: 'Phone'
                }
            ];
            return await Category.insertMany(data);
        } catch (e) {
            console.error('e');
        }
    }

    static async initProducts (req, res, next) {
        try {
            await Product.remove();
            const categories = await InitControllerController.initCategory();
            const products = [
                {
                    category: categories[0]._id,
                    name: 'Macbook Pro Retina 2018',
                    price: 71000000,
                    quantity: 10,
                    description: 'Description Macbook Pro Retina 2018',
                    detail: 'Detail Macbook Pro Retina 2018'
                },
                {
                    category: categories[0]._id,
                    name: 'Dell XPS 15 9575',
                    price: 63000000,
                    quantity: 14,
                    description: 'Description Dell XPS 15 9575',
                    detail: 'Detail Dell XPS 15 9575'
                },
                {
                    category: categories[0]._id,
                    name: 'Macbook Pro Retina 2017',
                    price: 52000000,
                    quantity: 20,
                    description: 'Description Macbook Pro Retina 2017',
                    detail: 'Detail Macbook Pro Retina 2017'
                },
                {
                    category: categories[0]._id,
                    name: 'Dell XPS 15 9570',
                    price: 50000000,
                    quantity: 22,
                    description: 'Description Dell XPS 15 9570',
                    detail: 'Detail Dell XPS 15 9570'
                },
                {
                    category: categories[0]._id,
                    name: 'Macbook Air 2018',
                    price: 40000000,
                    quantity: 57,
                    description: 'Description Macbook Air Retina 2018',
                    detail: 'Detail Macbook Pro Retina 2018'
                },
                {
                    category: categories[0]._id,
                    name: 'Dell Precision 5510',
                    price: 40000000,
                    quantity: 32,
                    description: 'Description Dell Precision 5510',
                    detail: 'Detail Dell Precision 5510'
                },
            ];
            await Product.insertMany(products);
            return Response.success(res);
        } catch (e) {
            next(e);
        }
    }
}