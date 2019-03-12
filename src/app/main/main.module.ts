import * as angular from 'angular';

import { MainLayoutComponent } from './layout/layout.component';
import { mainRoutes } from './main.routes';

/**
 * Layout module acts as a contaier for common components like Header, Footer, Left Navigation etc.
 * This is the base layout of the application
 * Based on the route different views will be rendered inside the layout
 */
export const appMain = angular
    .module('app.main', [])
    .component(MainLayoutComponent.NAME, new MainLayoutComponent())
    .config(mainRoutes)
    .name;