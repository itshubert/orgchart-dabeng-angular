angular.module('main')
    .directive('dabengChart', dabengChart);

function dabengChart() {
    return {
        restrict: 'A',
        scope: {
            chartData: '=',
            onDrop: '='
        },
        link: function($scope, element, attrs) {
            var chart = element.orgchart({
                'data': $scope.chartData,
                'nodeTitle': 'alias',
                'nodeContent': 'title',
                'draggable': true,
                'dropCriteria': function($draggedNode, $dragZone, $dropZone) {
                    if($draggedNode.find('.content').text().indexOf('manager') > -1 && $dropZone.find('.content').text().indexOf('engineer') > -1) {
                      return false;
                    }
                    return true;
                },
                'createNode': function($node, data) {
                    
                    $node.data('employee', data);
                }
            });

            chart.$chart.on('nodedrop.orgchart', function(event, params) {
                var sourceId = params.draggedNode.attr('id');
                var sourceParentId = params.draggedNode.attr('data-parent');
                var targetId = params.dropZone.attr('id');
                var source = getObject($scope.chartData.children, 'id', sourceId);
                var sourceParent = getObject($scope.chartData.children, 'id', sourceParentId);
                if (!sourceParent) {
                    sourceParent = $scope.chartData;
                }

                var removeIdx = _.findIndex(sourceParent.children, { id: sourceId });
                if (removeIdx > -1) {
                    sourceParent.children.splice(removeIdx, 1);
                }

                var target = getObject($scope.chartData.children, 'id', targetId);
                if (!target) {
                    target = $scope.chartData;
                }

                target.children.push(source);
                source.parentId = targetId;
                params.draggedNode.attr('data-parent', targetId);

                //console.log($scope.chartData);
                $scope.onDrop(sourceId, targetId);
            });

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
    };
}