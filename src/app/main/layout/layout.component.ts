import { Injectable, IControllerConstructor } from 'angular';
import './global.scss';
import './angular-material-custom.scss';
import './../../shared/sass/data-grid.scss';
import { MainLayoutController } from './layout.controller';

const templateUrl = require('./layout.template.html');
/**
 * This is a MainLayoutComponent
 *
 * @export MainLayoutComponent
 * @class MainLayoutComponent
 * @implements {angular.IComponentOptions}
 */

export class MainLayoutComponent implements angular.IComponentOptions {
    static NAME: string = 'mainLayout';

    templateUrl: Injectable<(...args: any[]) => string>;
    controller: Injectable<IControllerConstructor>;

    constructor() {
        this.templateUrl = templateUrl;
        this.controller = MainLayoutController;
    }
}