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
    //template : '<div></div><div></div><h1>Hello {{helloCtrl.name}} <button ng-click=helloCtrl.onClick()>Click!</button><input type="text" ng-model="name"></input></h1>',
    restric : 'AE',
    //replace : true,
    link : function($scope, elem, attrs){ // para acceder a un elemento en el dom

    },
    templateUrl : 'helloWorld.html',
    controller : ['$scope', function($scope){
      this.variable = '000000';
    }],
    controllerAs : 'helloCtrl',
    scope : {
      name : '=nombre', //izquierda nombre directiva, dercha nombre del atributo paso por referencias
      onClick : '&'  //se cambia el camelcase por -
    },
    bindToController : true, // para que todo lo tenga el alias del contorlador
  };
}]);

app.controller('ParentCtrl', [function () {
  this.name = "pepe";
  this.click = function(){
    alert(888);
  };

}]);
