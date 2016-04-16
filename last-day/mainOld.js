var app = angular.module('app', []);
app.directive('customFieldset', [function(){
    return {
        restrict: 'E',
        controllerAs:'cf',
        bindToController:true,
        
        transclude: {
            header: 'customFieldsetHeader',
            body: 'customFieldsetBody'
        },
        controller: ['$scope', function($scope){
            $scope.name = 'Directiva';
        }],
        scope:{
            title:'='
        },
        template:'<fieldset><legend ng-transclude="header"></legend><div ng-transclude ="body"></div></fieldset>'
    }
}]);
app.directive('helloWorld', [function(){
    return {
        restrict:'AE',
        replace: true,

        link: function($scope, elem, attrs){

        },
         bindToController: true,
        controller: [function(){
            this.mivariable = 'Otravariable';
        }],
        controllerAs: 'helloWorldCtrl',
        templateUrl: 'helloWorld.html',
        scope:{
            name: '=',
            onClick: '&'
        }
    };
}]);


app.controller('ParentCtrl', ['$scope', function ($scope) {
    this.click = function(e, name){
        alert('click' + e);
    }
    $scope.name= 'Controlador';
}]);
