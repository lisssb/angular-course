var app = angular.module('app', ['ngMessages', 'ui.router', 'app.user']);
app.constant('API_URL', 'http://localhost:8000/api');


app.factory('UserFactory', ['$http', 'API_URL', function ($http, API_URL) {
    //var users = $http.get(API_URL);
    //var userEdit = null;

    var getUsers = function () {
        return $http.get(API_URL + '/users');
    };
    var createUser = function (user) {
        return $http.post(API_URL + '/users/', user);
    };

    var deleteUser = function (name) {
      return $http.delete(API_URL + '/users/' + name);
    };

    var editUser = function (name, user) {
      return $http.put(API_URL + '/users/' + name, user);
    };

    var setUserEdit = function (user) {
        userEdit = angular.copy(user);
    };

    var getUserEdit = function () {
        return userEdit;
    };

    var getUserByName = function(name){
      return $http.get(API_URL + '/users/' + name);
    }

    return {
        getUsers: getUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        editUser: editUser,
        setUserEdit: setUserEdit,
        getUserEdit: getUserEdit,
        getUserByName : getUserByName
    };

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
