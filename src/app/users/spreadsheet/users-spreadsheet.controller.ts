import _ from  'lodash';
import { NgTableParams } from 'ng-table';
import { IScope } from 'angular';
import { UsersService } from './../users.service';
import { IStateService } from 'angular-ui-router';

/**
 * @export
 * @class UsersSpreadsheetController
 */
export class UsersSpreadsheetController {

    private tableParams: NgTableParams<Object>;
    private users: Array<object> = [];
    private usersColumns: Array<any> = [];
    private enableFilters: boolean = false;
    private selectAll: boolean = false;

    /**
     * Creates an instance of UsersController.
     * @param {IScope} $scope
     * @memberof UsersController
     */

    constructor(
        private $scope: IScope,
        private usersService: UsersService,
        private $state: IStateService,
        private NgTableParams,
    ) {
        'ngInject';
    }

    $onInit() {
        this.getUsers();

        this.tableParams = new this.NgTableParams({
                count: 10 // initial page size
            }, {
                // page size buttons (right set of buttons to select no. of rows to display)
                counts: [],
                // determines the pager buttons (left set of buttons to navigate to pages)
                paginationMaxBlocks: 10,
                paginationMinBlocks: 2
            });
    }

    private getUsers() {
        let fetchUsers = this.usersService.getUsers();

        fetchUsers.then((data: Array<Object>) => {
            this.users = data;
        },
        (err: object) => {            
            console.error(err);
        });
    }

    private addClickHandler($event) {
        this.$state.go('users.spreadsheet.userDetails', { userId: '' });
    }

    private editClickHandler($event) {
        
    }

    private filterClickHandler($event) {
        this.tableParams.filter({});
        //this.enableFilters = !this.enableFilters;
    }

    private refreshClickHandler($event) {
        
    }

    private deleteClickHandler($event) {

    }

    private resetClickHandler($event) {
        _.each(this.usersColumns, (column) => column.show(true));
    }

    protected toggleSelectAll($event): void {
        // this.selectAll = !this.selectAll;
        // let element = $event.currentTarget;
        // let grid = ( _.isElement(element) ) ? element.parentElement : '';
        // if( !_.isElement(grid) ) return;
        // let checkboxList = '';
        // if(grid.querySelectorAll('td md-checkbox:not([disabled="disabled"])').length === grid.querySelectorAll('td md-checkbox.md-checked').length) {
        //     checkboxList = grid.querySelectorAll('td md-checkbox:not([disabled="disabled"])');
        // }
        // else {
        //     checkboxList = grid.querySelectorAll('td md-checkbox:not([disabled="disabled"]):not(.md-checked)');
        // }
        // _.each(checkboxList, (checkbox) => {
        //     this.$timeout(() => {
        //         angular.element(checkbox).triggerHandler('click');
        //     }, 0);
        // });
    }

    private toggleUserSelection($event, user): void {
        // let userExist = _.filter(this.selectedWarehouseList, (id) => id === warehouse['id']);
        // // calculating the table page row count to check or uncheck the 'selectall' checkbox of each page of the table
        // let currentPageRowsCount = 0;
        // let totalCount = this.tableParams.total();
        // let currentPage = this.tableParams.page();
        // let pageSize = this.tableParams.count();
        // currentPageRowsCount = (currentPage * pageSize < totalCount) ? pageSize : totalCount - ((currentPage - 1) * pageSize);

        // if (_.isEmpty(warehouseExist)) {
        //     this.selectedWarehouseList.push(warehouse.id);
        //     if(currentPageRowsCount === this.selectedWarehouseList.length) {
        //         this.selectAll = true;
        //     }
        // } else {
        //     this.selectedWarehouseList = _.filter(this.selectedWarehouseList, (id) => id !== warehouse['id']);
        //     this.selectAll = false;
        // }
    }
}