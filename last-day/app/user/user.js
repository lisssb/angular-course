var app = angular.module('app.user', ['ui.router', 'app.user.list', 'app.user.create']); //cada padre carga a sus hijos

app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('app.user', {
        url:'/user',
        controller:'UserCtrl as userCtrl',
        templateUrl: 'app/user/user.tpl.html',
        abstract : true
    });
}]);
app.controller('UserCtrl', ['$state', function($state){
  $state.go('app.user.list');
}]);
