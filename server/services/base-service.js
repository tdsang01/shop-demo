'use strict';
import { APIHelper } from '../helpers';
import QueryString from 'querystring';

export default class BaseService {

    static async request (url, method, body) {
        const data = {
            path: url,
            json: body,
            headers: {},
            method
        };
        return await APIHelper.request(data.path, data.method, data.json, data.headers);
    }

}