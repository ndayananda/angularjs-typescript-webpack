import * as angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import * as ngMaterial from 'angular-material';
import * as ngAnimate from 'angular-animate';
import * as ngMessages from 'angular-messages';
import * as ngSanitize from 'angular-sanitize';
import * as ngAria from 'angular-aria';
import { ngTableModule } from 'ng-table';
import 'ng-table/bundles/ng-table';

import { appConstants } from './constants';
import { customEvents } from './custom-events.constants';
import { routeConfig } from './route.config';
import { customThemeConfig } from './angular-material.theme';
import { DataService } from './../shared/service/data-service.service';
import { UuidService } from './../shared/service/uuid/uuid.service';
import { CollapsiblePanelComponent } from './../shared/components/collapsible-panel/collapsible-panel.component';

/*
 * Core module acts as a heart of the application
 * here we inject all the important dependencies
 * which can be used across the modules, like services, resusable components etc.,
 */

export const appCore = angular
    .module('app.core', [
        /*
        * Angular modules
        */
        uiRouter,
        ngAnimate,
        ngSanitize,
        ngAria,
        ngMaterial,
        ngMessages,
        ngTableModule.name,

        /*
        * Our reusable cross app code modules
        */
        
    ])
    .constant('appConstants', appConstants)
    .constant('customEvents', customEvents)
    .constant('appConfig', {})
    .config(routeConfig)
    .config(customThemeConfig)
    .config(($animateProvider) => {
        'ngInject';
        $animateProvider.classNameFilter(/angular-animate/);
    })
    .service(DataService.NAME, DataService)
    .service(UuidService.NAME, UuidService)
    .component(CollapsiblePanelComponent.NAME, new CollapsiblePanelComponent())
    .name;

