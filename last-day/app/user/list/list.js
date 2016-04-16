var app = angular.module('app.user.list', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('app.user.list', {
        url:'/list',
        controller:'ListCtrl as listCtrl',
        templateUrl: 'app/user/list/list.tpl.html',
        data : {
          roles: ['user', 'admin'] // decimos que estos roles pueden entrar
        }
    });
}]);
app.controller('ListCtrl', ['$filter', 'UserFactory', '$rootScope', '$state', function($filter, UserFactory, $rootScope, $state){
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  //this.users = UserService.getUsers();
  this.users = UserFactory.getUsers();

  this.deleteUser = function(user){
    UserFactory.deleteUser(user.name);
  };
  this.editUser = function(user){
    $state.go('app.user.edit', {name: user.name});

  };

}]);

//un filtro siempre tiene que devolver una funcion. SIEMPRE. Lo que le llega es lo que esta en la parte izquierda del pipe
app.filter ('pagination', [function(){
  return function(items, numElem){
    var length = Math.ceil(items.length /numElem);
    var arr = []
    for (var i = 0; i < length; i++){
      arr.push(i);
    }
    return arr;
  };
}]);
