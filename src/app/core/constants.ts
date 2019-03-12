/**
 * 	constants are read only pieces of data.
 * 	constants can be injected anywhere including configuration calls.
 *
 */

export const appConstants: Object = {
    appName: 'Angularjs Typescript Webpack single page application',
    version: '[AIV]{version}[/AIV]',
    defaultPaginationProperties: {
        start: '0',
        limit: '100',
    },
    apiUrl: {
        users: {
            GET_USERS: 'http://localhost:3000/users'
        }
    }
};