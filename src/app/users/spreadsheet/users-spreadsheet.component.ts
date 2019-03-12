import { IComponentOptions, Injectable, IControllerConstructor } from 'angular';
import './../../shared/sass/data-grid.scss';
import { UsersSpreadsheetController } from './users-spreadsheet.controller';

const templateUrl = require('./users-spreadsheet.template.html');
/**
 * This is a LmlSpreadsheetComponent
 *
 * @export UsersSpreadsheetComponent
 * @class UsersSpreadsheetComponent
 * @implements {IComponentOptions}
 */
export default class UsersSpreadsheetComponent implements IComponentOptions {
    static NAME: string = 'usersSpreadsheet';

    templateUrl: Injectable<(...args: any[]) => string>;
    controller: Injectable<IControllerConstructor>;

    constructor() {
        this.templateUrl = templateUrl;
        this.controller = UsersSpreadsheetController;
    }
}