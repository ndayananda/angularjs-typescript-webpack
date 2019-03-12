import * as _ from 'lodash';
import * as angular from 'angular';
import { StateProvider, StateDeclaration } from '@uirouter/angularjs';

/**
 * This is main route for SMP Module
 * Declare all the states for the SMP module here
 * $stateProvider works similar to Angular's v1 router, but it focuses purely on state.
 *
 * @param {StateProvider} $stateProvider
 *
 * @return void
 */
export const mainRoutes = ($stateProvider: StateProvider): void => {
    'ngInject';

    const states: Array<object> = [{
        name: 'app',
        redirectTo: 'users',
        url: '/',
        component: 'mainLayout',
        // The component's controller waits for every one of the below items in the 'resolve' to be
        // completely resolved before instantiation.
        resolve:{}
    }, {
        parent: 'app',
        name: 'users.**',
        url: 'users'
    }];

    _.forEach(states, (state: StateDeclaration) => {
        $stateProvider.state(state);
    });
};