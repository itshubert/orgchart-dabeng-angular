Array.prototype.move = function(old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length + 1;
        while (k--) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
}

angular.module('main')
    .controller('dragDropController', mainController);

mainController.$inject = ['$scope'];

function mainController($scope) {
    $scope.employees = [
        { id: 0, name: 'Hubert Dumas' },
        { id: 1, name: 'John Citizen' },
        { id: 2, name: 'John Doe' },
        { id: 3, name: 'Romero Juliet' },
        { id: 4, name: 'William Wallace' },
    ];

    $scope.onDropped = function(droppedItem, destination) {
        console.log('dropped!');
        var employeeToMove = _.findIndex($scope.employees, { id: droppedItem.id });
        var destinationEmployee = _.findIndex($scope.employees, { id: destination.id });
        $scope.$apply(function() {
            //$scope.employees = array_move($scope.employees, employeeToMove, destinationEmployee + 1);
            $scope.employees.move(employeeToMove, destinationEmployee + 1);
        });
    };

    function array_move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    };
}