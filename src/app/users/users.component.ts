import { IComponentOptions, Injectable, IControllerConstructor } from 'angular';
import { UsersController } from './users.controller';
const templateUrl = require('./users.template.html');

/**
 * This is a UsersComponent
 *
 * @export UsersComponent
 * @class UsersComponent
 * @implements {angular.IComponentOptions}
 */
export default class UsersComponent implements IComponentOptions {
    static NAME: string = 'users';

    templateUrl: Injectable<(...args: any[]) => string>;
    controller: Injectable<IControllerConstructor>;

    constructor() {
        this.templateUrl = templateUrl;
        this.controller = UsersController;
    }
}