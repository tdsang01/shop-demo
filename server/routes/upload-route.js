'use strict';

import { UploadController } from '../controllers';

module.exports = (app, router) => {

    router.route('/tracks/:id')
        .get(UploadController.getAudio);

    router.route('/tracks')
        .post(UploadController.uploadAudio)
};
