
angular.module('main')
    .controller('chartController', chartController);

chartController.$inject = ['$scope'];

function chartController($scope) {
    $scope.employees = [
        { id: '1', name: 'Hubert Dumas' },
        { id: '2', name: 'John Citizen',  reportsTo: '1' },
        { id: '3', name: 'John Doe', reportsTo: '1' },
        { id: '4', name: 'Romero Juliet', reportsTo: '2' },
        { id: '5', name: 'William Wallace', reportsTo: '3' },
    ];

    $scope.onDropped = function(droppedItem, destination) {
        console.log('dropped!');
    };
}