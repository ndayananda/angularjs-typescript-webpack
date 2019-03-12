import * as angular from 'angular';
import { IHttpService, IPromise, IRequestConfig, IHttpResponse, IQService } from 'angular';
import * as _ from 'lodash';

/**
 * DataService is the main service to make http request
 * Every module specific service should use this DataService as dependency
 * and invoke callService method to make http request
 *
 * @export DataService
 * @class DataService
 */
export class DataService {

    static NAME = 'dataService';

    constructor(
        private $http: IHttpService,
        private $q: IQService
    ) {
        'ngInject';
    }
    /**
     * callService is a generic method used to HTTP request across the application
     *
     * @param {string} url
     * @param {string} method
     * @param {Object} options
     * @returns {IPromise<IHttpResponse<object>>}
     * @memberof DataService
     */
    public callService(url: string, method: string, options: Object): IPromise<IHttpResponse<object>> {
        var config: IRequestConfig = Object.assign({
                url: url,
                method: method || 'GET',
                timeout: 30000
            }, options || {});

        config.params = config.params || {};

        return this.$q((resolve, reject) => {
            this.$http(config)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}