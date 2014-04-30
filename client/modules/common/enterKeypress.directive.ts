export class EnterKeypressDirective implements ng.IDirective {
	public static $inject: string[] = ["$rootScope", "$compile"];
    constructor(private $scope: ng.IScope, private $compile: ng.ICompileService) {        
    }

    restrict: string = "A";
    link(scope: ng.IScope, element: JQuery, attrs: ng.IAttributes): void {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs['kxEnterKeypress'], { 'event': event });
                });
                event.preventDefault();
            }
        });
    }     
}
