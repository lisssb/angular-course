
var app = angular.module('app', ['ngMessages']);

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
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Marcial',
    age : 27,
    job : "Backend",
    date :new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Elba",
    age : 45,
    job : "System administrator",
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }, {
    name : 'Kate',
    age : 25,
    job : "Frontend",
    date :  new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  },
  {
    name : "Anthony",
    age : 21,
    job : "CTO",
    date : new Date(),
    addresses : [{city : "Madrid", cp: 28400}, {city: "rivas", cp: 28521}]
  }];

  var getUsers = function(){
    return users;
  };

  var createUser = function(user){
    users.push(user);
  };

  var deleteUser = function(name){
    for(var i = 0, length = users.length; i < length - 1; i++){
      if(users[i].name === name){
        users.splice(i,1);
      }
    }
  };

  var editUser = function(name, user){

  };



  var userEdit = null;
  var setUserEdit = function(user){
    userEdit = user
  }

  var getUserEdit = function(){
    return userEdit;
  }

  return {
    getUsers : getUsers,
    createUser : createUser,
    deleteUser: deleteUser,
    editUser: editUser,
    setUserEdit : setUserEdit,
    getUserEdit : getUserEdit
  };

}]);

app.controller('ManageCtrl', ['UserFactory', '$rootScope', function(UserFactory, $rootScope){
  this.jobs = ["FullStack","Backend","Frontend","System administrator","CTO"]
  //this.user = UserFactory.userEdit;

  $rootScope.$on('edituser', function(event, user){
    this.user = UserFactory.getUserEdit();
  }.bind(this));

  this.onSubmit = function(){
    if(this.form.$valid){ // esto es necesario si no agrego ng-submit="manageCtrl.form.$valid && manageCtrl.onSubmit()"
    //debugger;
      UserFactory.createUser(angular.copy(this.user));
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




app.controller('ParentCtrl', ['$filter', 'UserFactory', '$rootScope', function($filter, UserFactory, $rootScope){
  this.title="Mi agenda";
  this.formats = [{name : 'español', format: 'dd/MM/yyyy'},{name : 'ingles', format:  'MM/dd/yyyy'}];
  //this.users = UserService.getUsers();
  this.users = UserFactory.getUsers();

  this.deleteUser = function(user){
    UserFactory.deleteUser(user.name);
  };
  this.editUser = function(user){
    UserFactory.setUserEdit(user);
    $rootScope.$emit('edituser', user); // edito el evento edit user
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
