import * as angular from 'angular';
import { IComponentController, IScope, IRootElementService, ITimeoutService } from 'angular';

import { UuidService } from './../../service/uuid/uuid.service';

export class CollapsiblePanelController implements IComponentController {

    private vertical: string;
    private panelWidth: string;
    private className: string;
    private uuid: string;
    private align: string;
    private collapsed: boolean = true;

    constructor(
        private uuidService: UuidService,
        private $element: IRootElementService,
        private $timeout: ITimeoutService,
        private customEvents
    ) {
        'ngInject';
    }

    $onInit() {
        this.vertical = this.vertical || 'false';
        this.panelWidth = this.panelWidth || '260';
        this.className = this.className || '';
        this.uuid = this.uuid || this.uuidService.generate();
        this.align = this.align || 'right';
        this.collapsed = this.collapsed || false;

        if( !this.isVerticalPanel() )
            angular.element(() => {
                this.$timeout(() => this.togglePanelHeight(), 2000);
            })
    }

    private isVerticalPanel(): boolean {
        return (this.vertical === 'true') ? true : false;
    }

    private toggle($event) {
        this.collapsed = !this.collapsed;

        if( !this.isVerticalPanel() )
            this.togglePanelHeight();
    }

    private isCollapsed(): boolean {
        return this.collapsed;
    }

    private isAlginLeft(): boolean {
        return (this.align === 'left') ? true : false;
    }

    private getPanelWidth(): string {
        let width = '';
        if( this.isVerticalPanel() )
            width = this.collapsed ? '43px' : this.panelWidth + 'px';

        return width;
    }

    private togglePanelHeight() {
        let element = this.$element[0].querySelector('.cp-content');
        angular.element(element).css('height', this.collapsed ? 0 : `${ element.scrollHeight + 1 }px`);
    }
}