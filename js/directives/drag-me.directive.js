angular.module('main')
    .directive('dragMe', dragMe);

function dragMe() {
    return {
        restrict: 'A',
        scope: {
            dragMe: '='
        },
        replace: true,
        link: function(scope, element, attrs) {
            element.prop('draggable', true);
            element.on('dragstart', function(event) {
                var dataTransfer = event.dataTransfer ||event.originalEvent.dataTransfer;
                dataTransfer.setData('dragitem', JSON.stringify(scope.dragMe));
            });
        }
    };
}