'use strict';

export default class Response {

    static success(res, data) {
        const responseData = !!data
            ? { success: true, result: data }
            : { success: true };
        return res.json(responseData);
    }

    static error(res, e) {
        if (typeof e === 'string') {
            e = new Error(e);
        }
        console.error('Error: ', e);
        let errors = [];
        if (Array.isArray(e) && e.length > 0) {
            errors = e.map(error => {
                return {
                    code: error.message,
                    message: res.__(error.message) !== error.message ? res.__(error.message) : res.__('TECHNICAL_EXCEPTION')
                };
            });
        } else {
            errors = [
                {
                    code: e.message,
                    message: res.__(e.message) !== e.message ? res.__(e.message) : res.__('TECHNICAL_EXCEPTION')
                }
            ]
        }

        if (e.errors) {
            for (const errorKey in e.errors) {
                const errorMessage = res.__(e.errors[errorKey].message) !== e.errors[errorKey].message ? res.__(e.errors[errorKey].message) : res.__('TECHNICAL_EXCEPTION');
                errors.push({
                    code: e.errors[errorKey].message,
                    message: errorMessage
                });
            }
        }

        return res.json({
            success: false,
            errors
        });
    }
};
