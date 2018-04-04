angular.module('main')
    .controller('moveEmployeeController', moveEmployeeController);

    moveEmployeeController.$inject = ['$scope'];

function moveEmployeeController($scope) {
    $scope.employees = [
        { id: 0, name: 'Hubert Dumas', employees: [] },
        { id: 1, name: 'John Citizen', employees: [] },
        { id: 2, name: 'John Doe', employees: [] },
        { id: 3, name: 'Romero Juliet', employees: [] },
        { id: 4, name: 'William Wallace', employees: [] },
    ];

    $scope.onDropped = function(droppedItem, destItem) {
        var source = _.find($scope.employees, { id: droppedItem.id });
        $scope.employees.splice($scope.employees.indexOf(source), 1);
        var destination = _.find($scope.employees, { id: destItem.id });

        $scope.$apply(function() {
            destination.employees.push(source);
        });
        
    };
}