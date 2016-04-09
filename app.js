
var app = angular.module('app', []);

app.constant('API_URL', 'http://localhost:8000/api'); //no se puede modificar
app.value('authToken', 'ssss');//esto si se puede modificar

// app.run(['UserProvider', function(UserProvider){
//   debugger;
// }]);
// app.config(['UserProviderProvider', function(UserProvider){
//   debugger;
// }]);
// app.provider('UserProvider', [function(){ //etapa config
//   this.init = function(url){
//     urlApi = url;
//   };
//   this.$get = [function(){//etapa run
//     return {
//       user : function(){
//         alert(urlApi);
//       }
//     };
//   }];
// }]);


app.factory('UserFactory', [function(){
  var users = [{
    name : 'Liss',
    age : 28,
    job : "FullStack",
    date : Date.now(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Marcial',
    age : 27,
    job : "Backend",
    date :Date.now(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Elba",
    age : 45,
    job : "System administrator",
    date : Date.now(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Kate',
    age : 25,
    job : "Frontend",
    date :  Date.now(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Anthony",
    age : 21,
    job : "CTO",
    date : Date.now(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }];
  var createUser = function(user){
    users.push(user);
  };

  var deleteUser = function(name){

  };

  var editUser = function(name, user){

  };

  var getUsers = function(){
    return users;
  };

  return {
    getUsers : getUsers,
    createUser : createUser,
    deleteUser: deleteUser,
    editUser: editUser
  };

}]);

app.controller('ManageCtrl', ['UserFactory', function(userFactory){
  this.jobs = ["FullStack","Backend","Frontend","System administrator","CTO"]
  this.onSubmit = function(){
    if(this.form.$valid){ // esto es necesario si no agrego ng-submit="manageCtrl.form.$valid && manageCtrl.onSubmit()"
    debugger;
      userFactory.createUser(angular.copy(this.user));
      this.user = null;
      this.form.$setPristine(); // esto nos sirve para limpiar el formulario (reset de un formulario)
    }
  };
  this.addAddress = function(){
    if(!this.user){
      this.user = {
        addresses : []
      };
    }
    if(this.user && !this.user.addresses){
      this.user.addresses = [];
    }
    this.user.addresses.push({});
  };
  //this.user = {addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]}
}]);
app.controller('ParentCtrl', ['$filter', 'UserFactory', function($filter, UserFactory){
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  //this.users = UserService.getUsers();
  this.users = UserFactory.getUsers();


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
