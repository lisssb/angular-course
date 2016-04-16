var app = angular.module('app.user.list', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('app.user.list', {
        url:'/list',
        controller:'ListCtrl as listCtrl',
        templateUrl: 'app/user/list/list.tpl.html',
        data : {
          roles: ['user', 'admin'] // decimos que estos roles pueden entrar
        },
        resolve : {//para navegar en la pagina cuando ya tengamos cargados los ususarios
          users : ['UserFactory', function(UserFactory){ // esto lo puedo tratar en el onerror
            console.log("entra aqqqqqqqqqqqq")
            return UserFactory.getUsers();
          }]
        }
    });
}]);
app.controller('ListCtrl', ['$filter', 'UserFactory', '$rootScope', '$state', 'users', function($filter, UserFactory, $rootScope, $state, users){
  var listCtrl = this;
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  //this.users = UserService.getUsers();
  // UserFactory.getUsers().then(function(res){
  //   this.users = res.data;
  // }.bind(this), function(error){
  //   alert("error");
  // });

  this.users = users.data;
  var updateList = function(users){
    UserFactory.getUsers().then(function(res){
      this.users = res.data;
    }.bind(this));
  }.bind(this);

  this.deleteUser = function(user){
    UserFactory.deleteUser(user.name).then(function(){
      alert ("Usuario eiminado corretamete");
      updateList();
    });
  }.bind(this);

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
