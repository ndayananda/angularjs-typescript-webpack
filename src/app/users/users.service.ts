import * as angular from 'angular';
import { IPromise, IHttpResponse, IQService } from 'angular';
import * as _ from 'lodash';

import { DataService } from './../shared/service/data-service.service';
/**
 * UsersService responsible to make http request
 * and is a data provider for Users module
 *
 * @export UsersService
 * @class UsersService
 */
export class UsersService {
    static NAME: string = 'usersService';

    private users: Array<object> = [];

    constructor(
        private dataService: DataService,
        private $q: IQService,
        private appConstants
    ) {
        'ngInject';
    }

    getUsers(): IPromise<Object> {
        return this.$q((resolve, reject) => {
            if( !_.isEmpty(this.users) ) {
                resolve( angular.copy(this.users) );
            } else {
                let fetchUsers = this.dataService.callService(
                        this.appConstants.apiUrl.users.GET_USERS,
                        'GET',
                        {}
                    );

                fetchUsers.then((response) => {
                    resolve(response);
                },
                (err) => reject(err))
            }
        })
    }
}