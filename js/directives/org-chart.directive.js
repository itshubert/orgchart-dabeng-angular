angular.module('main')
    .directive('orgChart', orgChart);

function orgChart($compile) {
    return {
        restrict: 'E',
        scope: {
            chartData: '='
        },
        link: function($scope, element, attrs) {
            var chart = new google.visualization.OrgChart(element[0]);

            $scope.$watch('chartData', function(value, oldValue) {
                if (!value) {
                    return;
                }
        
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'id');
                data.addColumn('string', 'reportsTo');
                data.addColumn('string', 'name');
        
                angular.forEach(value, function(emp) {
                    var jsonEmp = JSON.stringify(emp);
                    var template = '<div drag-on-me="' + emp.id + '" on-drop="onDropped"><div drag-me="' + emp.id + '">' + emp.name + '</div></div>';
                    var formattedValue = $compile(template)($scope)[0].outerHTML;
                    data.addRow([
                        { v: emp.id, f: formattedValue },
                        emp.reportsTo,
                        emp.name
                    ]);
                });
        
                chart.draw(data, { allowHtml: true });
            });
        }
    }
}

