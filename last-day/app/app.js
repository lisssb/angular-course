var app = angular.module('app', ['ngMessages', 'ui.router', 'app.user', 'ngResource']);
app.constant('API_URL', 'http://localhost:8000/api');


app.factory('UserFactory', ['$resource', 'API_URL', function ($resource, API_URL) {
  return $resource(API_URL + '/users/:name', {name : '@name'}, {
    save: {
      method : 'POST', // por defecto es GET
      params: {
        name: '' //para decirle que este parametro en el save debe ser vacio
      }
    },
    update: {
      method : 'PUT',
      params : {
        name : '@name' // le digo que el name de mi url vienen de el name del objeto (@name)
      }
    }
  }) // @ que lo busque dentro del objeto que estamos enviando en la peticion.
}]);






app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){ //$urlRouterProvicer es el que maneja el provider en el ng-rputer
    $stateProvider.state('app', {
        url:'/app',
        controller:'AppCtrl as appCtrl',
        templateUrl: 'app/app.tpl.html'
    });

    $stateProvider.state('app.403', {
        url:'/403',
        template: '<h1>Not authorized</h1>'
    });

    $urlRouterProvider.when('', '/app/user/list').otherwise('/app/user');

}]);
app.controller('AppCtrl', ['AuthFactory', function(AuthFactory){
  this.login = AuthFactory.login;
}]);

app.factory('AuthFactory', function(){
  var loggedUser = { role : 'admin'};
  var login = function(role){
        loggedUser.role = role;

    };


  return {
    loggedUser : loggedUser,
    login : login
  }
});


app.run(['$rootScope', 'AuthFactory', '$state', function($rootScope, AuthFactory, $state){
    $rootScope.$on('$stateChangeStart', function(event, to, toParams, from, fromParams){
        if(!to.data || !to.data.roles || to.data.roles.indexOf(AuthFactory.loggedUser.role)>=0){
            console.log('User allowed');
        } else {
            event.preventDefault();
            $state.go('app.403');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams){

    });
}]);
