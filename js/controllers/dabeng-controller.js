angular
    .module('main')
    .controller('dabengController', dabengController);

dabengController.$inject = ['$scope'];

function dabengController($scope) {
    $scope.employees = {
        id: 'employee-0',
        name: 'Hubert Dumas',
        alias: 'Thor',
        title: 'Grandfather',
        children: [{
                id: 'employee-1',
                reportsTo: '0',
                name: 'Jesi Dumas',
                alias: 'Wonder Woman',
                title: 'Daughter',
                children: [
                    {
                        id: 'employee-3',
                        reportsTo: '1',
                        name: 'Lincoln North',
                        alias: 'Spider Man',
                        title: 'Grandchild',
                        children: []
                    }
                ]
            }, {
                id: 'employee-2',
                reportsTo: '0',
                name: 'Jules Dumas',
                alias: 'Black Panther',
                title: 'Son',
                children: []
            }]
    };

    $scope.onDrop = function(sourceId, targetId) {
        console.log($scope.employees);
    };

    function getObject(array, key, value) {
        var o;
        array.some(function iter(a) {
            if (a[key] === value) {
                o = a;
                return true;
            }
            return Array.isArray(a.children) && a.children.some(iter);
        });
        return o;
    }
}
