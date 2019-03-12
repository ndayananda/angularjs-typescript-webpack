import * as angular from 'angular';
import * as oclazyload from "oclazyload";
import "oclazyload";
import { appCore } from './core/core.module';
import { appMain } from './main/main.module';
import { appUsers } from './users/users.module';

/*
* This acts as a wrapper of the application
* application is divided into modules
* all the modules will be injected as dependencies
* winds acts as a superset
*/

const app = angular
    .module('app', [
        /*
        * Order is not important. Angular makes a
        * pass to register all of the modules listed
        */

        /*
        * Everybody has access to these.
        * We could place these under every feature area,
        * but this is easier to maintain.
        */
        appCore,
        'oc.lazyLoad',

        /*
        * Feature areas
        */
        appMain,
        appUsers
    ]);

bootstrapWindsApp();

function bootstrapWindsApp() {
    angular.element(document).ready(() => {
        // Bootstrap angular application
        angular.bootstrap(document, ['app']);
    });
}