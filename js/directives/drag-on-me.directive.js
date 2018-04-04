angular.module('main')
    .directive('dragOnMe', dragOnMe);

function dragOnMe() {
    return {
        restrict: 'A',
        scope: {
            dragOnMe: '=',
            onDrop: '='
        },
        link: function(scope, element, attrs) {
            element.on('dragover', function(event) {
                event.preventDefault();
            });

            element.on('drop', function(event) {
                event.preventDefault();
                var dataTransfer = event.dataTransfer ||event.originalEvent.dataTransfer;
                var dragItem = JSON.parse(dataTransfer.getData("dragitem"));
                scope.onDrop(dragItem, scope.dragOnMe);
            });
        }
    };
}