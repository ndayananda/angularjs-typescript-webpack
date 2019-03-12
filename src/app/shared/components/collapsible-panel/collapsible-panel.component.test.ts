import * as angular from 'angular';
import * as ngMock from 'angular-mocks';
import { appCore } from './../../../core/core.module';
import { CollapsiblePanelComponent } from './collapsible-panel.component';


beforeEach ( angular.mock.module(appCore) );

let $ctrl, element, broadcastService, template, $rootScope, $compile, $scope;

beforeEach (
	angular.mock.inject( (_$rootScope_, _$compile_, _$componentController_, _broadcastService_) => {
        $rootScope = _$rootScope_;
        $compile = _$compile_;

        $scope = $rootScope.$new();
		broadcastService = _broadcastService_;
		$ctrl = _$componentController_("collapsiblePanel", {
			$scope,
			broadcastService
        });

        element = angular.element('<collapsible-panel></collapsible-panel>');
		element = $compile(element)($scope);
        $scope.$apply();
	})
)

describe("Test component", () => {
	it("view model should be defined", () => {
		expect($ctrl).toBeDefined()
	});

	it("should default align to left", () => {
		expect($ctrl.align).toBe("left")
	});

	it("should render default dom", () => {
		expect(element).toBeDefined();
		expect(element[0]).toMatchSnapshot();
	});
})