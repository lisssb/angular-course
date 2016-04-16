var app = angular.module('app', ['ngMessages', 'ui.router', 'app.user']);


app.factory('UserFactory', [function () {
    var users = [{
        name: 'Ra',
        age: 28,
        job: 'FullStack',
        birthDate: new Date()
    }, {
        name: 'Pepe',
        age: 18,
        job: 'Frontend',
        birthDate: new Date()
    }, {
        name: 'Jose',
        age: 40,
        job: 'Backend',
        birthDate: new Date()
    }, {
        name: 'Pepito',
        age: 35,
        job: 'FullStack',
        birthDate: new Date()
    }];

    var userEdit = null;

    var getUsers = function () {
        return users;
    };
    var createUser = function (user) {
        users.push(user);
    };

    var deleteUser = function (name) {
        for(var i = 0, length = users.length; i < length; i++) {
            if(users[i].name === name) {
                users.splice(i, 1);
                break;
            }
        }
    };

    var editUser = function (name, user) {
        for(var i = 0, length = users.length; i < length; i++) {
            if(users[i].name === name) {
                users[i] = user;
                break;
            }
        }
    };

    var setUserEdit = function (user) {
        userEdit = angular.copy(user);
    };

    var getUserEdit = function () {
        return userEdit;
    };

    var getUserByName = function(name){
      for(var i = 0, length = users.length; i < length; i++) {
          if(users[i].name === name) {
              return users[i];
          }
      }
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
  var loggedUser = {};
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
