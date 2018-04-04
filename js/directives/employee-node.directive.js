angular.module('main')
    .directive('employeeNode', employeeNode);

function employeeNode() {
    return {
        restrict: 'E',
        scope: {
            employee: '=',
            onDrop: '='
        },
        templateUrl: '/js/templates/employee-node.html'
    }
}