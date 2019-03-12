import * as angular from 'angular';
//import './users.scss';
import { usersRoutes } from './users.routes';
import UsersComponent from './users.component';
import UsersSpreadsheetComponent from './spreadsheet/users-spreadsheet.component';
import { UsersService } from './users.service';

/**
 * Users Module
 */
export const appUsers = angular
    .module('app.users', [])
    .component(UsersComponent.NAME, new UsersComponent())
    .component(UsersSpreadsheetComponent.NAME, new UsersSpreadsheetComponent())
    .service(UsersService.NAME, UsersService)
    .config(usersRoutes)
    .name;