import { IComponentOptions, Injectable, IControllerConstructor } from 'angular';

import { CollapsiblePanelController } from './collapsible-panel.controller';
import './collapsible-panel.scss';

const templateUrl = require('./collapsible-panel.template.html');
/**
 * This is a CollapsiblePanelComponent
 *
 * @export CollapsiblePanelComponent
 * @class CollapsiblePanelComponent
 * @implements {IComponentOptions}
 */
export class CollapsiblePanelComponent implements IComponentOptions {
    static NAME: string = 'collapsiblePanel';

    templateUrl: Injectable<(...args: any[]) => string>;
    controller: Injectable<IControllerConstructor>;
    bindings: {[boundProperty: string]: string};
    transclude: {[slot: string]: string};

    constructor() {
        this.templateUrl = templateUrl;
        this.transclude = {
            toolbarContent: '?cpToolbarContent',
            content: '?cpContent',
            title: '?cpTitle'
        };
        this.bindings = {
            vertical: '@',
            panelWidth: '@',
            className: '@',
            uuid: '@',
            collapsed: '<',
            align: '@'
        };
        this.controller = CollapsiblePanelController;
    }
}