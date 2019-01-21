'use strict';

import BaseService from './base-service';
import {FBMarketingApiConfig} from '../config';

const { graphUrl, url} = FBMarketingApiConfig;

export default class FacebookMarketingApiService extends BaseService {
    static async createAdSet (body) {
        return await FacebookMarketingApiService.callRequest(`${graphUrl}/adsets`, 'POST', body);
    }

    static async createAdCreative (body) {
        return await FacebookMarketingApiService.callRequest(`${graphUrl}/adcreatives`, 'POST', body);
    }

    static async setAdsFromAdCreative (body) {
        return await FacebookMarketingApiService.callRequest(`${graphUrl}/ads`, 'POST', body);
    }
    
    static async createCampaign (body) {
        return await FacebookMarketingApiService.callRequest(`${graphUrl}/campaigns`,'POST', body);
    }

    static async getDataFromApi (apiUrl) {
        const url = `${graphUrl}${apiUrl}&access_token=${FBMarketingApiConfig.token}`;
        return await FacebookMarketingApiService.request(url, 'GET');
    }

    static async getDataFromDirectApi (apiUrl) {
        const api = `${url}${apiUrl}&access_token=${FBMarketingApiConfig.token}`;
        return await FacebookMarketingApiService.request(api, 'GET');
    }

    static async redirect (url, method, data) {
        if (!url.includes('access_token=')) {
            const access_token = `access_token=${FBMarketingApiConfig.token}`;
            const arrUrl = url.split('?');
            let query = arrUrl[1];
            if (query) {
                query = `?${arrUrl[1]}&${access_token}`;
            } else {
                query = `?${access_token}`;
            }
            url = arrUrl[0] + query;
        }
        return await FacebookMarketingApiService.request(url, method, data);

    }

    static async getAllFanPages () {
        const access_token = `access_token=${FBMarketingApiConfig.token}`;
        return await FacebookMarketingApiService.request(`${url}/me/accounts?${access_token}&fields=access_token,name,picture&limit=200`, 'GET', {});
    }

    static async callRequest (url, method, body) {
        body.access_token = FBMarketingApiConfig.token;
        return await FacebookMarketingApiService.request(url, method, body);
    }
}