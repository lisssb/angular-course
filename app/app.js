
var app = angular.module('app', ['ngMessages', 'ui.router']);ç

//lo utilizamos para configurar las rutas
app.config (['$stateProvider', function($stateProvider){ //providers de la libreria uiroute. Provider encargado de gestionar los estado
  $stateProvider.state('app', {
    url  : '/app',
    controller: 'AppCtrl as appCtrl',
    templateUrl : 'app/app.tpl.html'
  })
}]);

app.controller('AppCtrl', [function(){

}]);
