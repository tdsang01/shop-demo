'use strict';

import { InitController } from '../controllers';

module.exports = (app, router) => {

    router.route('/init/users')
        .get(InitController.initAdmin);

    router.route('/init/products')
        .get(InitController.initProducts);
};
