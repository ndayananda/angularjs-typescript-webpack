import * as _ from  'lodash';
import { IScope } from 'angular';
import { StateService } from '@uirouter/core';

/**
 * @export
 * @class UsersController
 */
export class UsersController {

    private currentNavItem: string;
    private navSref: object = {
        spreadsheet: 'users.spreadsheet',
        graphic: '',
        geomap: ''
    };

    /**
     * Creates an instance of UsersController.
     * @param {IScope} $scope
     * @memberof UsersController
     */

    constructor(
        private $scope: IScope,
        private $state: StateService,
    ) {
        'ngInject';
        this.navSref = this.navSref['spreadsheet'];
        this.currentNavItem = this.navSref['spreadsheet'];
    }

    $onInit() {}
}