import * as _ from 'lodash';
import { StateProvider, StateDeclaration } from '@uirouter/angularjs';

/**
 * This is main route for Users Module
 * Declare all the states for the Users module here
 * $stateProvider works similar to Angular's v1 router, but it focuses purely on state.
 *
 * @param {StateProvider} $stateProvider
 *
 * @return void
 */
export const usersRoutes = ($stateProvider: StateProvider): void => {
    'ngInject';
    const states: Array<object> = [{
        parent: 'app',
        name: 'users',
        url: 'users',
        params: {},
        component: 'users',
        redirectTo: 'users.spreadsheet'
    }, {
        name: 'users.spreadsheet',
        url: '/spreadsheet',
        views: {
            usersSpreadsheet: 'usersSpreadsheet'
        }
    }, {
        name: 'users.spreadsheet.**',
        url: '/spreadsheet'
    }, {
        name: 'users.spreadsheet.userDetails',
        url: '/:userId',
        views: {
            'userDetails@users': 'userDetails'
        }
    }];

    _.forEach(states, function(state: StateDeclaration) {
        $stateProvider.state(state);
    });
};