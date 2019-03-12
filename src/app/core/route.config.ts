import { UrlRouterProvider } from '@uirouter/angularjs'
import { ILocationProvider } from 'angular';

/**
 * Basic route config @ core module which will handle the unmatched route
 * $urlRouterProvider has the responsibility of watching $location
 * $locationProvider is used to configure how the application deep linking paths are stored
 *
 * @param {UrlRouterProvider} $urlRouterProvider
 * @param {angular.ILocationProvider} $locationProvider
 *
 * @return void
 */

export const routeConfig = (
        $urlRouterProvider: UrlRouterProvider,
        $locationProvider: ILocationProvider
    ): void => {
    'ngInject';
    $locationProvider.html5Mode({
        enabled: true // If true, will rely on history.pushState to change urls where supported
    });

    $urlRouterProvider.otherwise('/');
};